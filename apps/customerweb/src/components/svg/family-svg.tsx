import type { SVGProps } from 'react';

export function FamilySvg(props: SVGProps<SVGSVGElement>) {
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
        d="M22.6667 26.666C22.6667 24.4569 19.6819 22.666 16 22.666C12.3181 22.666 9.33333 24.4569 9.33333 26.666M28 22.6665C28 21.0263 26.3545 19.6166 24 18.9993M4 22.6665C4 21.0263 5.64546 19.6166 8 18.9993M24 13.6475C24.8183 12.9151 25.3333 11.8507 25.3333 10.666C25.3333 8.45688 23.5425 6.66602 21.3333 6.66602C20.3089 6.66602 19.3743 7.05115 18.6667 7.68454M8 13.6475C7.18167 12.9151 6.66667 11.8507 6.66667 10.666C6.66667 8.45688 8.45753 6.66602 10.6667 6.66602C11.6911 6.66602 12.6257 7.05115 13.3333 7.68454M16 18.666C13.7909 18.666 12 16.8752 12 14.666C12 12.4569 13.7909 10.666 16 10.666C18.2091 10.666 20 12.4569 20 14.666C20 16.8752 18.2091 18.666 16 18.666Z"
        stroke="#202B77"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
