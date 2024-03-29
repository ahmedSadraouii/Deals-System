import type { SVGProps } from 'react';

export function IconPlus(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <path d="M6 12H18M12 18L12 6" stroke="#0B102F" />
    </svg>
  );
}
