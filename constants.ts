
import React from 'react';

export const ELEVENLABS_API_URL = "https://api.elevenlabs.io/v1/text-to-speech";
export const ELEVENLABS_VOICE_ID = "21m00Tcm4TlvDq8ikWAM"; // Rachel
export const GEMINI_MODEL_NAME = "gemini-2.5-flash";
export const PLACEHOLDER_API_KEY = "placeholder_api_key";


// FIX: Converted from JSX to React.createElement to be valid in a .ts file and fixed SVG attribute casing.
export const GearIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", ...props },
    React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" }),
    React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z" })
  )
);

// FIX: Converted from JSX to React.createElement to be valid in a .ts file.
export const LogoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor", className: "w-8 h-8 text-blue-400", ...props },
        React.createElement('path', { d: "M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM8.547 16.598a.75.75 0 0 1-.852-.036l-2.25-1.5a.75.75 0 1 1 .9-1.224l1.628 1.085a.75.75 0 0 0 .94-.066 4.473 4.473 0 0 0 .33-4.137 4.5 4.5 0 0 0-3.364-3.364c-1.612-.243-3.11.264-4.137.33a.75.75 0 0 0-.066.94l1.085 1.628a.75.75 0 1 1-1.224.9l-1.5-2.25a.75.75 0 0 1 .036-.852C3.996 9.402 4.02 9.35 6 8.25c2.145-1.2 4.543-.982 6.362.296 2.155 1.518 3.103 4.02 2.533 6.44a.75.75 0 0 1-1.428-.433 4.978 4.978 0 0 0-1.46-3.26c-1.332-1.12-3.15-.965-4.464.33Z" }),
        React.createElement('path', { d: "M12 13.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" })
    )
);
