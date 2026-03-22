import React, { createContext, useContext, useState } from 'react';

type SyncRowContextType = {
  hoverIndex: number | null;
  setHoverIndex: (index: number | null) => void;
};

const SyncRowContext = createContext<SyncRowContextType | null>(null);

export const SyncRowProvider = ({ children }: { children: React.ReactNode }) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  return <SyncRowContext.Provider value={{ hoverIndex, setHoverIndex }}>{children}</SyncRowContext.Provider>;
};

export const useSyncRow = () => {
  const ctx = useContext(SyncRowContext);
  if (!ctx) throw new Error('SyncRow内で使用してください');
  return ctx;
};

type SyncRowProps = {
  rowIndex: number;
  children: React.ReactNode;
};

/** 同期行 */
export const SyncRow = ({ rowIndex, children }: SyncRowProps) => {
  const { setHoverIndex } = useSyncRow();

  return (
    <div onMouseEnter={() => setHoverIndex(rowIndex)} onMouseLeave={() => setHoverIndex(null)}>
      {children}
    </div>
  );
};
