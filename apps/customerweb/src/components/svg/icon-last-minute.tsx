import type { SVGProps } from 'react';

export function IconLastMinute(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <path
        d="M12 12C15.866 12 19 8.86599 19 5H5C5 8.86599 8.13401 12 12 12ZM12 12C15.866 12 19 15.134 19 19H5C5 15.134 8.13401 12 12 12Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path d="M5 2H12H19" stroke="currentColor" />
      <path d="M5 22H12H19" stroke="currentColor" />
    </svg>
  );
}
