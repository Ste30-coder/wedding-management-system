import { useState, useEffect } from 'react';
import api from '../api';
import { useWeddingStore } from '../store/useWeddingStore';

export interface Stats {
  totalGuests: number;
  confirmedCount: number;
  declinedCount: number;
  pendingCount: number;
  confirmedRate: number;
  trends: {
    total: string;
    confirmed: string;
    declined: string;
    pending: string;
  };
}

export interface Activity {
  id: string;
  fullName: string;
  status: string;
  sideId: string;
  group?: { groupName: string };
}

export function useDashboard() {
  const { activeSide, weddingId, sideId } = useWeddingStore();
  const [stats, setStats] = useState<Stats | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const refresh = () => setRefreshTrigger(prev => prev + 1);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        let currentWeddingId = weddingId;
        let currentSideId = sideId;

        // AUTO-BOOTSTRAP: If no wedding selected OR if it's the old 'w-1' mockup ID
        if (!currentWeddingId || currentWeddingId === 'w-1') {
          console.log('DEBUG: No real wedding ID found. Bootstrapping from DB...');
          const weddingsRes = await api.get('/dashboard/weddings');
          if (weddingsRes.data && weddingsRes.data.length > 0) {
            const firstWedding = weddingsRes.data[0];
            currentWeddingId = firstWedding.id;
            
            // Set the first wedding in store
            // Also find the sides
            const brideSideId = firstWedding.sides?.find((s: any) => s.name.toLowerCase() === 'bride')?.id || '';
            const groomSideId = firstWedding.sides?.find((s: any) => s.name.toLowerCase() === 'groom')?.id || '';

            // Set the first wedding in store
            const { setWedding, setActiveSide } = useWeddingStore.getState();
            setWedding(
              firstWedding.id, 
              `${firstWedding.brideName} & ${firstWedding.groomName}`,
              brideSideId,
              groomSideId
            );
            
            if (brideSideId) {
              currentSideId = brideSideId;
              setActiveSide('BRIDE', brideSideId);
            }
          }
        }

        const params: any = { weddingId: currentWeddingId };
        if (activeSide !== 'BOTH') {
           params.sideId = currentSideId || sideId; 
        }

        const [statsRes, activityRes] = await Promise.all([
          api.get('/dashboard/stats', { params }),
          api.get('/dashboard/recent-activity', { params })
        ]);

        setStats(statsRes.data);
        setActivities(activityRes.data);
      } catch (err: any) {
        console.error('Failed to fetch dashboard data', err);
        const status = err.response?.status;
        const msg = status === 403 ? 'ACCESS DENIED (PERMISSION ISSUE)' : 
                    status === 401 ? 'AUTHENTICATION EXPIRED (PLEASE LOGIN AGAIN)' :
                    'CONNECTION TO SERVER FAILED';
        setError(msg);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [activeSide, weddingId, sideId, refreshTrigger]);

  return { stats, activities, loading, error, refresh };
}
