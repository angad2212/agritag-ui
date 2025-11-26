import { useState, useEffect } from 'react';

interface CattleDeviceData {
  latitude: number;
  longitude: number;
  rfid_uid: string;
  temperature: number;
  timestamp: number;
}

interface UseCattleDeviceDataReturn {
  data: CattleDeviceData | null;
  loading: boolean;
  error: string | null;
}

const API_URL = 'https://agritag-5283e-default-rtdb.firebaseio.com/devices/agritag-001/latest.json';

export const useCattleDeviceData = (): UseCattleDeviceDataReturn => {
  const [data, setData] = useState<CattleDeviceData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(API_URL);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.statusText}`);
        }
        
        const jsonData: CattleDeviceData = await response.json();
        setData(jsonData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch cattle data');
        console.error('Error fetching cattle device data:', err);
      } finally {
        setLoading(false);
      }
    };

    // Fetch immediately
    fetchData();

    // Set up polling every 30 seconds for real-time updates
    const interval = setInterval(fetchData, 30000);

    return () => clearInterval(interval);
  }, []);

  return { data, loading, error };
};

