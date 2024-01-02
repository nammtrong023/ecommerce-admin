'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type ProcessType = 'NEW' | 'TRASHED' | null;

interface ProcessState {
    isNew: boolean;
    processType: ProcessType;
    setIsNew: (isNew: boolean) => void;
    setProcessType: (processType: ProcessType) => void;
}

export const useProcess = create<ProcessState>()(
    persist(
        (set, get) => ({
            isNew: false,
            processType: null,
            setProcessType: (processType: ProcessType) => set({ processType }),
            setIsNew: (isNew: boolean) => set({ isNew }),
        }),
        {
            name: 'process-storage',
            storage: createJSONStorage(() => sessionStorage),
        },
    ),
);
