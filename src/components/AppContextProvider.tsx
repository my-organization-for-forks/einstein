import React, { useState } from 'react';

import { ChildrenProps } from '../types/react/ChildrenProps';
import { AppContext } from '../AppContext';
import { AppContextImpl } from '../einstein/AppContextImpl';

export function AppContextProvider({ children }: ChildrenProps) {
  const [state] = useState<AppContext>(() => new AppContextImpl());
  return <AppContext.Provider value={state}>{children}</AppContext.Provider>;
}
