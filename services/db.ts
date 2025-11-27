
import { SavedReport } from '../types';

const DB_KEY = 'ventureswords_mission_logs_v1';

export const db = {
  save: (report: Omit<SavedReport, 'id' | 'timestamp'>): SavedReport => {
    const logs = db.getAll();
    const newReport: SavedReport = {
      ...report,
      id: crypto.randomUUID(),
      timestamp: Date.now(),
    };
    // Prepend to list (newest first)
    const updatedLogs = [newReport, ...logs];
    localStorage.setItem(DB_KEY, JSON.stringify(updatedLogs));
    return newReport;
  },

  getAll: (): SavedReport[] => {
    const raw = localStorage.getItem(DB_KEY);
    if (!raw) return [];
    try {
      return JSON.parse(raw);
    } catch (e) {
      return [];
    }
  },

  delete: (id: string) => {
    const logs = db.getAll();
    const filtered = logs.filter(log => log.id !== id);
    localStorage.setItem(DB_KEY, JSON.stringify(filtered));
  },

  clear: () => {
    localStorage.removeItem(DB_KEY);
  }
};
