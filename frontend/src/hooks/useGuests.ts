import { useState } from 'react';
import api from '../api';
import { useWeddingStore } from '../store/useWeddingStore';

interface CreateGuestData {
  fullName: string;
  phoneNumber: string;
  email?: string;
  relationship?: string;
  groupId?: string;
  tags?: string[];
  notes?: string;
}

export function useGuests() {
  const { weddingId, sideId } = useWeddingStore();
  const [guests, setGuests] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchGuests = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/guests', {
        params: {
          weddingId,
          sideId
        }
      });
      setGuests(response.data);
    } catch (err: any) {
      setError('Failed to fetch guests.');
    } finally {
      setLoading(false);
    }
  };

  const addGuest = async (data: CreateGuestData) => {
    setLoading(true);
    setError(null);
    try {
      const payload = {
        ...data,
        weddingId,
        sideId
      };

      const response = await api.post('/guests', payload);
      await fetchGuests(); // Refresh list
      return response.data;
    } catch (err: any) {
      console.error('Add Guest Error:', err);
      setError(err.response?.data?.message || 'Failed to add guest. Ensure backend is running.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { guests, fetchGuests, addGuest, loading, error };
}
