import type { SVGProps } from 'react';

export function OutdoorActivitySvg(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 32 32"
      fill="none"
      {...props}
    >
      <path
        d="M16.0013 5.33268V2.66602M16.0013 26.666V29.3327M8.55359 8.55163L6.66797 6.66602M23.6387 23.6367L25.5243 25.5223M5.33464 15.9993H2.66797M26.668 15.9993H29.3346M23.6393 8.55163L25.5249 6.66602M8.55424 23.6367L6.66862 25.5223M16.0013 22.666C12.3194 22.666 9.33464 19.6812 9.33464 15.9993C9.33464 12.3175 12.3194 9.33268 16.0013 9.33268C19.6832 9.33268 22.668 12.3175 22.668 15.9993C22.668 19.6812 19.6832 22.666 16.0013 22.666Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
