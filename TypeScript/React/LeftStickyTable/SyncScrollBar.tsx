import { createContext, useContext, useEffect, useRef } from 'react';

type SyncScrollContextType = {
  width: number;
  height: number;
  baseRef: React.RefObject<HTMLDivElement | null>;
  followerRef: React.RefObject<HTMLDivElement | null>;
  innerRef: React.RefObject<HTMLDivElement | null>;
  syncWidth: () => void;
  syncWidthByVerticalScrollbar: () => void;
};

const SyncScrollContext = createContext<SyncScrollContextType | null>(null);

export const useSyncScroll = () => {
  const ctx = useContext(SyncScrollContext);
  if (!ctx) throw new Error('SyncScrollBar内で使用してください');
  return ctx;
};

/**
 * 同期横スクロールバー
 * 本JSX内でContextが使用可能
 * @example
 * <SyncScrollBar.Root width={100} height={100}>
 *   <SyncScrollBar.Follower />
 *   <SyncScrollBar.Base>
 *     <div>...</div>
 *   </SyncScrollBar.Base>
 * </SyncScrollBar.Root>
 */
function SyncScrollBarRoot({ children, width, height }: { children: React.ReactNode; width: number; height: number }) {
  const baseRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  // width同期
  const syncWidth = () => {
    if (!baseRef.current || !innerRef.current) return;
    innerRef.current.style.width = `${baseRef.current.scrollWidth}px`;
  };

  // 縦スクロールバー表示状態によるwidth同期
  const syncWidthByVerticalScrollbar = () => {
    const followerScroll = followerRef.current;
    const baseScroll = baseRef.current;

    if (!followerScroll || !baseScroll) return;

    //"縦"スクロールバーのwidth
    const verticalScrollbarWidth = baseScroll.offsetWidth - baseScroll.clientWidth;
    followerScroll.style.width = (width - verticalScrollbarWidth).toString() + 'px';
  };

  useEffect(() => {
    const base = baseRef.current;
    const follower = followerRef.current;

    if (!base || !follower) return;

    let syncing = false;

    syncWidth();
    syncWidthByVerticalScrollbar();
    window.addEventListener('resize', syncWidth);
    window.addEventListener('resize', syncWidthByVerticalScrollbar);

    const onBaseScroll = () => {
      if (syncing) return;
      syncing = true;
      follower.scrollLeft = base.scrollLeft;
      syncing = false;
    };

    const onFollowerScroll = () => {
      if (syncing) return;
      syncing = true;
      base.scrollLeft = follower.scrollLeft;
      syncing = false;
    };

    base.addEventListener('scroll', onBaseScroll);
    follower.addEventListener('scroll', onFollowerScroll);

    return () => {
      window.removeEventListener('resize', syncWidth);
      window.removeEventListener('resize', syncWidthByVerticalScrollbar);
      base.removeEventListener('scroll', onBaseScroll);
      follower.removeEventListener('scroll', onFollowerScroll);
    };
  }, []);

  return (
    <SyncScrollContext.Provider
      value={{ width, height, baseRef, followerRef, innerRef, syncWidth, syncWidthByVerticalScrollbar }}
    >
      {children}
    </SyncScrollContext.Provider>
  );
}

/** 基準横スクロールバー */
function SyncScrollBarBase({
  children,
  ...props
}: { children: React.ReactNode } & React.HTMLAttributes<HTMLDivElement>) {
  const { baseRef, width, height } = useSyncScroll();

  return (
    <div ref={baseRef} {...props} style={{ ...props.style, width: width, height: height }}>
      {children}
    </div>
  );
}

/** 追従する横スクロールバー */
function SyncScrollBarFollower() {
  const { width, followerRef, innerRef } = useSyncScroll();

  return (
    <div className="bg-white">
      <div ref={followerRef} className="overflow-x-auto overflow-y-hidden h-4" style={{ width: width }}>
        <div ref={innerRef} />
      </div>
    </div>
  );
}

type SyncScrollBarType = {
  Root: typeof SyncScrollBarRoot;
  Base: typeof SyncScrollBarBase;
  Follower: typeof SyncScrollBarFollower;
};

export const SyncScrollBar = {
  Root: SyncScrollBarRoot,
  Base: SyncScrollBarBase,
  Follower: SyncScrollBarFollower,
} satisfies SyncScrollBarType;
