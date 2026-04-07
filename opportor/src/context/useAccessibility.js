import { AccessibilityContext } from "./AccessibilityContext";
import { useContext } from "react";

export function useAccessibility() {
  return useContext(AccessibilityContext);
}