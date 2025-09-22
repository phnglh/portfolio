'use client';

import { createContext, use } from 'react';

// Instead of using a non-existent `Entry` type, we define a generic type placeholder.
// You can supply any type (Til, Leetcode, Note, etc.) when consuming the context.

export type ContentContext<T = unknown> = T;

const Context = createContext<ContentContext | undefined>(undefined);
Context.displayName = 'ContentContext';

export const useContentContext = <T = unknown>() => {
  const context = use(Context) as ContentContext<T> | undefined;

  if (!context) {
    throw new Error('useContentContext must be used within a ContentProvider');
  }

  return context;
};

export const ContentProvider = Context.Provider;
