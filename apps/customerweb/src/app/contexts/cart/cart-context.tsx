'use client';

import type { ReactNode } from 'react';
import React, { createContext, useState, useContext } from 'react';

interface CartContextType {
  currentStep: number;
  setCurrentStep: (step: number) => void;
}
const CartContext = createContext<CartContextType | undefined>(undefined);
interface CartProviderProps {
  children: ReactNode;
}
export function CartProvider({ children }: CartProviderProps) {
  const [currentStep, setCurrentStep] = useState<number>(1);
  return (
    <CartContext.Provider value={{ currentStep, setCurrentStep }}>
      {children}
    </CartContext.Provider>
  );
}
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
