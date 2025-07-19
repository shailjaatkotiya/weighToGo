import { useState, useEffect } from 'react';
import type { Flight, User } from '../types';

interface SpaceData {
  flights: Flight[];
  users: User[];
  currentUser?: {
    userId: string;
  };
}

export const useSpaceData = () => {
  const [data, setData] = useState<SpaceData>({ flights: [], users: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('/space.json');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        setData(result);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    flights: data.flights,
    users: data.users,
    currentUser: data.currentUser,
    loading,
    error,
    refetch: () => {
      setLoading(true);
      setError(null);
      // Re-trigger the useEffect
      setData({ flights: [], users: [] });
    }
  };
}; 