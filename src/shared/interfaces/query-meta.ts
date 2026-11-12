import '@tanstack/react-query';

interface AppQueryMeta extends Record<string, unknown> {
  persist?: boolean;
}

declare module '@tanstack/react-query' {
  interface Register {
    queryMeta: AppQueryMeta;
  }
}
