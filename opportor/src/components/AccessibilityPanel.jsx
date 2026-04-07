import { useAccessibility } from "../context/AccessibilityContext";

function AccessibilityPanel() {
  const {
    fontSize,
    setFontSize,
    highContrast,
    setHighContrast,
    reduceMotion,
    setReduceMotion,
    dyslexiaFont,
    setDyslexiaFont,
  } = useAccessibility();

  return (
    <div className="accessibility-panel">
      <h3>Accessibility</h3>

      <label>
        Font Size:
        <select
          value={fontSize}
          onChange={(e) => setFontSize(e.target.value)}
        >
          <option value="normal">Normal</option>
          <option value="large">Large</option>
        </select>
      </label>

      <label>
        <input
          type="checkbox"
          checked={highContrast}
          onChange={() => setHighContrast(!highContrast)}
        />
        High Contrast
      </label>

      <label>
        <input
          type="checkbox"
          checked={reduceMotion}
          onChange={() => setReduceMotion(!reduceMotion)}
        />
        Reduce Animations
      </label>

      <label>
        <input
          type="checkbox"
          checked={dyslexiaFont}
          onChange={() => setDyslexiaFont(!dyslexiaFont)}
        />
        Dyslexia-Friendly Font
      </label>
    </div>
  );
}

export default AccessibilityPanel;