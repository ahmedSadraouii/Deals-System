import type { SVGProps } from 'react';

export function HeartSvg(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 21 20"
      fill="none"
      {...props}
    >
      <mask
        id="mask0_1900_4311"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="21"
        height="20"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0 0H20.4725V19.501H0V0Z"
          fill="white"
        />
      </mask>
      <g mask="url(#mask0_1900_4311)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1.82396 9.12312C3.22596 13.4851 8.76496 17.0121 10.237 17.8851C11.714 17.0031 17.293 13.4371 18.65 9.12712C19.541 6.34112 18.714 2.81212 15.428 1.75312C13.836 1.24212 11.979 1.55312 10.697 2.54512C10.429 2.75112 10.057 2.75512 9.78696 2.55112C8.42896 1.53012 6.65496 1.23112 5.03796 1.75312C1.75696 2.81112 0.932957 6.34012 1.82396 9.12312ZM10.238 19.5011C10.114 19.5011 9.99096 19.4711 9.87896 19.4101C9.56596 19.2391 2.19296 15.1751 0.395957 9.58112C0.394957 9.58112 0.394957 9.58012 0.394957 9.58012C-0.733043 6.05812 0.522957 1.63212 4.57796 0.325118C6.48196 -0.290882 8.55696 -0.0198819 10.235 1.03912C11.861 0.0111181 14.021 -0.272882 15.887 0.325118C19.946 1.63412 21.206 6.05912 20.079 9.58012C18.34 15.1101 10.913 19.2351 10.598 19.4081C10.486 19.4701 10.362 19.5011 10.238 19.5011Z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
}
