import { createContext, useState } from "react";

const AccessibilityContext = createContext();

export function AccessibilityProvider({ children }) {
  const [fontSize, setFontSize] = useState("normal");
  const [highContrast, setHighContrast] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [dyslexiaFont, setDyslexiaFont] = useState(false);

  return (
    <AccessibilityContext.Provider
      value={{
        fontSize,
        setFontSize,
        highContrast,
        setHighContrast,
        reduceMotion,
        setReduceMotion,
        dyslexiaFont,
        setDyslexiaFont,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
}

export default AccessibilityContext;