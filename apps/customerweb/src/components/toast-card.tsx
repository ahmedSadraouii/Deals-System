import type { ReactNode } from 'react';
import { forwardRef } from 'react';
import reactHotToast from 'react-hot-toast';

export interface ToastCardProps {
  toastId: string;
  icon?: ReactNode;
  title: ReactNode;
  description: ReactNode;
}

export const ToastCard = forwardRef<HTMLDivElement, ToastCardProps>(
  function ToastCardForwardRef({ toastId, icon, title, description }, ref) {
    return (
      <div
        className="pointer-events-auto flex w-full max-w-md items-center rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5"
        ref={ref}
      >
        {icon && (
          <div className="shrink-0 text-4xl text-primary/30">{icon}</div>
        )}
        <div className="w-0 flex-1 p-4">
          <div className="flex items-start">
            <div className="flex-1">
              <p className="text font-medium text-default-900">{title}</p>
              <p className="mt-1 text-sm text-default-500">{description}</p>
            </div>
          </div>
        </div>
        <button
          onClick={() => reactHotToast.dismiss(toastId)}
          className="flex h-full items-center justify-center rounded-none rounded-r-lg border border-l border-default-200 border-transparent p-4 text-sm font-medium text-primary hover:text-primary/80 focus:outline-none focus:ring-2 focus:ring-primary/10"
        >
          Schließen
        </button>
      </div>
    );
  },
);
