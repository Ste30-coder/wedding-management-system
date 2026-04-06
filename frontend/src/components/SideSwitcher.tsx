import React from 'react';
import { motion } from 'framer-motion';
import { useWeddingStore } from '../store/useWeddingStore';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const SideSwitcher: React.FC = () => {
  const { activeSide, setActiveSide, brideSideId, groomSideId } = useWeddingStore();

  const sides = [
    { id: 'BRIDE' as const, label: 'Bride Side', sideId: brideSideId },
    { id: 'GROOM' as const, label: 'Groom Side', sideId: groomSideId },
  ] as const;

  return (
    <div className="flex p-1.5 glass-effect rounded-2xl w-fit mx-auto relative overflow-hidden">
      {sides.map((side) => {
        const isActive = activeSide === side.id;
        const colorStyles = side.id === 'BRIDE' 
          ? { bg: 'bg-pink-50', text: 'text-pink-700' } 
          : { bg: 'bg-indigo-50', text: 'text-indigo-700' };

        return (
          <button
            key={side.id}
            onClick={() => setActiveSide(side.id, side.sideId || '')}
            className={cn(
              "relative px-8 py-3 rounded-xl transition-all duration-300 font-semibold text-sm z-10",
              isActive ? colorStyles.text : "text-muted-foreground hover:text-foreground"
            )}
          >
            {isActive && (
              <motion.div
                layoutId="activeSide"
                className={cn("absolute inset-0 rounded-xl shadow-lg", colorStyles.bg)}
                initial={false}
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative z-20">{side.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default SideSwitcher;
