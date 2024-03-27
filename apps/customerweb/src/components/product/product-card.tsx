import React from 'react';

export interface ProductCardProps {
  title: string;
  content: string;
}

export function ProductCard({ title, content }: ProductCardProps) {
  return (
    <>
      <div className="mb-10 rounded-xl border p-6">
        <h1 className="mb-4 text-3xl font-bold">{title}</h1>
        <p className="mb-5 font-light text-gray-500">{content}</p>
      </div>
    </>
  );
}
