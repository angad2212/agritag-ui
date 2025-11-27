import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Determines cattle health status based on temperature
 * Normal: 38-39.5°C (healthy range for cattle)
 * Warning: 39.5-40.5°C (elevated temperature, needs monitoring)
 * Critical: >40.5°C (high fever) or <37°C (hypothermia)
 */
export function getCattleStatusFromTemperature(temperature: number | null | undefined): "normal" | "warning" | "critical" {
  if (!temperature || temperature === 0) {
    return "normal"; // Default to normal if no temperature data
  }

  if (temperature < 37 || temperature > 40.5) {
    return "critical";
  }
  
  if (temperature >= 39.5) {
    return "warning";
  }
  
  return "normal";
}
