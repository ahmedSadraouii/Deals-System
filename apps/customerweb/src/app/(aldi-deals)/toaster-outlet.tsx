'use client';

import { Toaster } from 'react-hot-toast';

export function ToasterOutlet() {
  return (
    <Toaster
      position="top-right"
      containerClassName="navbar-offset"
      reverseOrder={false}
    />
  );
}
