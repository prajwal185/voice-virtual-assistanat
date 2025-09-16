
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChatMessage, Role, AppStatus } from './types';
import { useSpeechRecognition } from './hooks/useSpeechRecognition';
import { getGeminiResponse } from './services/geminiService';
import { textToSpeech } from './services/elevenLabsService';
import ChatBubble from './components/ChatBubble';
import MicrophoneButton from './components/MicrophoneButton';
import SettingsModal from './components/SettingsModal';
import { GearIcon, LogoIcon, PLACEHOLDER_API_KEY } from './constants';

const App: React.FC = () => {
    const [elevenLabsApiKey, setElevenLabsApiKey] = useState<string>('');
    const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
    const [conversation, setConversation] = useState<ChatMessage[]>([]);
    const [status, setStatus] = useState<AppStatus>(AppStatus.IDLE);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const chatContainerRef = useRef<HTMLDivElement | null>(null);

    const {
        isListening,
        startListening,
        stopListening,
        error: speechError,
    } = useSpeechRecognition();

    const handleSpeechResult = useCallback(async (transcript: string) => {
        if (!transcript) return;

        setStatus(AppStatus.PROCESSING);
        const userMessage: ChatMessage = { role: Role.USER, text: transcript };
        setConversation(prev => [...prev, userMessage]);

        try {
            const assistantResponseText = await getGeminiResponse(transcript);
            const assistantMessage: ChatMessage = { role: Role.ASSISTANT, text: assistantResponseText };
            setConversation(prev => [...prev, assistantMessage]);

            if (elevenLabsApiKey) {
                setStatus(AppStatus.SPEAKING);
                const audioBlob = await textToSpeech(assistantResponseText, elevenLabsApiKey);
                if (audioBlob.size > 0) {
                    const audioUrl = URL.createObjectURL(audioBlob);
                    if (audioRef.current) {
                        audioRef.current.src = audioUrl;
                        audioRef.current.play();
                        audioRef.current.onended = () => {
                            setStatus(AppStatus.IDLE);
                            URL.revokeObjectURL(audioUrl);
                        };
                        return;
                    }
                }
            }
            // If no API key or if the audio blob is empty (placeholder key was used)
            setStatus(AppStatus.IDLE);
        } catch (error) {
            console.error("Error processing response:", error);
            const errorMessage: ChatMessage = { role: Role.ASSISTANT, text: "Sorry, I encountered an error. Please try again." };
            setConversation(prev => [...prev, errorMessage]);
            setStatus(AppStatus.IDLE);
        }
    }, [elevenLabsApiKey]);

    const { finalTranscript } = useSpeechRecognition(handleSpeechResult);
    
    useEffect(() => {
        let key = localStorage.getItem('elevenLabsApiKey');
        if (!key) {
            key = PLACEHOLDER_API_KEY; // Use a fake key by default
            localStorage.setItem('elevenLabsApiKey', key);
        }
        setElevenLabsApiKey(key);
    }, []);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [conversation]);

    useEffect(() => {
        if (isListening) {
            setStatus(AppStatus.LISTENING);
        } else if (status === AppStatus.LISTENING) {
            setStatus(AppStatus.IDLE);
        }
    }, [isListening, status]);

    const handleToggleListening = () => {
        if (isListening) {
            stopListening();
        } else {
            startListening();
        }
    };

    const handleSaveSettings = (apiKey: string) => {
        const keyToSave = apiKey.trim() === '' ? PLACEHOLDER_API_KEY : apiKey;
        setElevenLabsApiKey(keyToSave);
        localStorage.setItem('elevenLabsApiKey', keyToSave);
        setIsSettingsOpen(false);
    };

    const getStatusMessage = () => {
        switch (status) {
            case AppStatus.LISTENING:
                return "Listening...";
            case AppStatus.PROCESSING:
                return "Thinking...";
            case AppStatus.SPEAKING:
                return "Speaking...";
            default:
                if (speechError) return speechError;
                if (elevenLabsApiKey === PLACEHOLDER_API_KEY) return "Demo mode: Add an ElevenLabs API key for voice.";
                return "Click the mic to start.";
        }
    };
    
    return (
        <div className="flex flex-col h-screen bg-gray-900 text-gray-100 font-sans">
            <header className="flex items-center justify-between p-4 border-b border-gray-700 shadow-lg">
                <div className="flex items-center space-x-3">
                    <LogoIcon />
                    <h1 className="text-xl font-bold text-white">Voice Virtual Assistant</h1>
                </div>
                <button
                    onClick={() => setIsSettingsOpen(true)}
                    className="p-2 rounded-full hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500"
                    aria-label="Settings"
                >
                    <GearIcon />
                </button>
            </header>
            <main ref={chatContainerRef} className="flex-1 overflow-y-auto p-6 space-y-6">
                 {conversation.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center text-gray-400">
                        <LogoIcon className="w-24 h-24 mb-4" />
                        <p className="text-lg">Your conversation will appear here.</p>
                        <p>Click the microphone button below to begin.</p>
                    </div>
                ) : (
                    conversation.map((msg, index) => <ChatBubble key={index} message={msg} />)
                )}
            </main>
            <footer className="p-4 flex flex-col items-center justify-center border-t border-gray-700">
                <MicrophoneButton status={status} onClick={handleToggleListening} />
                <p className="mt-4 text-sm text-gray-400 h-5">{getStatusMessage()}</p>
                <div className="mt-2 text-xs text-gray-500 w-full text-center px-4">
                    {finalTranscript}
                </div>
            </footer>
            <SettingsModal
                isOpen={isSettingsOpen}
                onClose={() => setIsSettingsOpen(false)}
                onSave={handleSaveSettings}
                initialApiKey={elevenLabsApiKey}
            />
             <audio ref={audioRef} hidden />
        </div>
    );
};

export default App;
