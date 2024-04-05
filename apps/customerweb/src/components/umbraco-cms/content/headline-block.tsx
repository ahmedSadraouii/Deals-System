import React from 'react';

export interface HeadlineBlockProps {
  headline: string;
}

export function HeadlineBlock({ headline }: HeadlineBlockProps) {
  return <h1 className="text-5xl">{headline}</h1>;
}
