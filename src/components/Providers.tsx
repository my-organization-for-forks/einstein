import React from 'react';

import { ChildrenProps } from '../types/react/ChildrenProps';
import { AppContextProvider } from './AppContextProvider';

export function Providers({ children }: ChildrenProps) {
  return <AppContextProvider>{children}</AppContextProvider>;
}
