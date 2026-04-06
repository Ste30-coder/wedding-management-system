import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type WeddingSide = 'BRIDE' | 'GROOM' | 'BOTH';

interface WeddingState {
  activeSide: WeddingSide;
  weddingId: string | null;
  sideId: string | null;
  brideSideId: string | null;
  groomSideId: string | null;
  weddingName: string;
  
  setActiveSide: (side: WeddingSide, sideId?: string) => void;
  setWedding: (id: string, name: string, brideSideId: string, groomSideId: string) => void;
}

export const useWeddingStore = create<WeddingState>()(
  persist(
    (set) => ({
      activeSide: 'BRIDE',
      weddingId: null,
      sideId: null,
      brideSideId: null,
      groomSideId: null,
      weddingName: 'The Royal Wedding',

      setActiveSide: (side, sideId) => set({ 
        activeSide: side, 
        sideId: sideId || null 
      }),
      
      setWedding: (id, name, brideSideId, groomSideId) => set({ 
        weddingId: id, 
        weddingName: name,
        brideSideId,
        groomSideId
      }),
    }),
    {
      name: 'wedding-storage',
    }
  )
);
