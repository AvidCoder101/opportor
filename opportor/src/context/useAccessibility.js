import { useContext } from "react";
import { AccessibilityContext } from "./AccessibilityContext";

export function useAccessibility() {
  return useContext(AccessibilityContext);
}