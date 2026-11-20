import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { DEFAULT_DATA, type SiteData } from "./site-data";
import { checkAdminCredentials } from "./validation";

const DATA_KEY = "sagevik-demo-data-v1";
export const ADMIN_SESSION_KEY = "sagevik-demo-admin";

type ArrayKeys = {
  [K in keyof SiteData]: SiteData[K] extends Array<{ id: string }> ? K : never;
}[keyof SiteData];
type ObjectKeys = Exclude<keyof SiteData, ArrayKeys>;
export type CollectionKey = ArrayKeys;
export type ItemOf<K extends CollectionKey> = SiteData[K] extends Array<infer I> ? I : never;

export type Toast = { id: number; message: string; tone: "success" | "error" | "info" };

type Store = {
  data: SiteData;
  hydrated: boolean;
  isAdmin: boolean;
  setSection: <K extends ObjectKeys>(key: K, value: SiteData[K]) => void;
  addItem: <K extends CollectionKey>(key: K, item: ItemOf<K>) => void;
  updateItem: <K extends CollectionKey>(key: K, id: string, patch: Partial<ItemOf<K>>) => void;
  removeItem: <K extends CollectionKey>(key: K, id: string) => void;
  resetDemo: () => void;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  toasts: Toast[];
  notify: (message: string, tone?: Toast["tone"]) => void;
  dismissToast: (id: number) => void;
  quickEnquiryOpen: boolean;
  setQuickEnquiryOpen: (open: boolean) => void;
};

const StoreContext = createContext<Store | null>(null);

export function newId(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

function mergeDefaults(saved: Partial<SiteData>): SiteData {
  const merged = { ...DEFAULT_DATA, ...saved } as SiteData;
  // Keep newly added fields on singleton objects.
  merged.company = { ...DEFAULT_DATA.company, ...saved.company };
  merged.about = { ...DEFAULT_DATA.about, ...saved.about };
  merged.careers = { ...DEFAULT_DATA.careers, ...saved.careers };
  merged.footer = { ...DEFAULT_DATA.footer, ...saved.footer };
  merged.settings = { ...DEFAULT_DATA.settings, ...saved.settings };
  return merged;
}

export function SiteStoreProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<SiteData>(DEFAULT_DATA);
  const [hydrated, setHydrated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [quickEnquiryOpen, setQuickEnquiryOpen] = useState(false);
  const toastId = useRef(0);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(DATA_KEY);
      if (raw) setData(mergeDefaults(JSON.parse(raw) as Partial<SiteData>));
      setIsAdmin(window.localStorage.getItem(ADMIN_SESSION_KEY) === "1");
    } catch {
      // Corrupt storage: fall back to defaults.
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(DATA_KEY, JSON.stringify(data));
    } catch {
      // Storage full or unavailable; the demo keeps working in memory.
    }
  }, [data, hydrated]);

  const notify = useCallback((message: string, tone: Toast["tone"] = "success") => {
    const id = ++toastId.current;
    setToasts((t) => [...t, { id, message, tone }]);
    window.setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 4200);
  }, []);

  const dismissToast = useCallback((id: number) => setToasts((t) => t.filter((x) => x.id !== id)), []);

  const setSection = useCallback(<K extends ObjectKeys>(key: K, value: SiteData[K]) => {
    setData((d) => ({ ...d, [key]: value }));
  }, []);

  const addItem = useCallback(<K extends CollectionKey>(key: K, item: ItemOf<K>) => {
    setData((d) => ({ ...d, [key]: [item, ...(d[key] as unknown as ItemOf<K>[])] }));
  }, []);

  const updateItem = useCallback(<K extends CollectionKey>(key: K, id: string, patch: Partial<ItemOf<K>>) => {
    setData((d) => ({
      ...d,
      [key]: (d[key] as unknown as Array<ItemOf<K> & { id: string }>).map((it) =>
        it.id === id ? { ...it, ...patch } : it,
      ),
    }));
  }, []);

  const removeItem = useCallback(<K extends CollectionKey>(key: K, id: string) => {
    setData((d) => ({
      ...d,
      [key]: (d[key] as unknown as Array<{ id: string }>).filter((it) => it.id !== id),
    }));
  }, []);

  const resetDemo = useCallback(() => setData(DEFAULT_DATA), []);

  const login = useCallback((email: string, password: string) => {
    const ok = checkAdminCredentials(email, password);
    if (ok) {
      window.localStorage.setItem(ADMIN_SESSION_KEY, "1");
      setIsAdmin(true);
    }
    return ok;
  }, []);

  const logout = useCallback(() => {
    window.localStorage.removeItem(ADMIN_SESSION_KEY);
    setIsAdmin(false);
  }, []);

  const value = useMemo<Store>(
    () => ({
      data,
      hydrated,
      isAdmin,
      setSection,
      addItem,
      updateItem,
      removeItem,
      resetDemo,
      login,
      logout,
      toasts,
      notify,
      dismissToast,
      quickEnquiryOpen,
      setQuickEnquiryOpen,
    }),
    [data, hydrated, isAdmin, setSection, addItem, updateItem, removeItem, resetDemo, login, logout, toasts, notify, dismissToast, quickEnquiryOpen],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useSite(): Store {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useSite must be used inside SiteStoreProvider");
  return ctx;
}

export function useBanner(page: string) {
  const { data } = useSite();
  return data.banners.find((b) => b.page === page) ?? DEFAULT_DATA.banners.find((b) => b.page === page)!;
}
