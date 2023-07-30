import React from 'react';

import { Providers } from './Providers';
import { App } from './App';

export function Root() {
  return (
    <Providers>
      <App />
    </Providers>
  );
}
