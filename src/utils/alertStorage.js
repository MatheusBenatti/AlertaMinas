export const ALERT_STORAGE_KEY = 'alerta-minas-simulated-alerts';

export function loadSavedAlerts() {
  if (typeof window === 'undefined') return [];

  try {
    const raw = localStorage.getItem(ALERT_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    return [];
  }
}

export function saveSavedAlerts(alerts) {
  if (typeof window === 'undefined') return;

  localStorage.setItem(ALERT_STORAGE_KEY, JSON.stringify(alerts));
}
