'use client';

import * as React from 'react';
import { LogoSlider } from '@/components/home/logo-slider';
import MainSlider from '@/components/home/main-slider';
import Products from '@/components/home/products';

export default function Page() {
  return (
    <>
      <MainSlider />
      <Products />
      <LogoSlider name="Unsere Partner" bg="white" />
    </>
  );
}
