import type { ReactNode } from 'react';
import { Fragment } from 'react';
import { Transition } from '@headlessui/react';
import type { ToastOptions } from 'react-hot-toast';
import reactHotToast from 'react-hot-toast';
import { ToastCard } from '@/components/toast-card';

export interface ToastParams {
  icon?: ReactNode;
  title: ReactNode;
  description: ReactNode;
  options?: ToastOptions;
}
export function toast({ icon, title, description, options }: ToastParams) {
  reactHotToast.custom(
    (t) => (
      <Transition
        show={t.visible}
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <ToastCard
          toastId={t.id}
          title={title}
          icon={icon}
          description={description}
        />
      </Transition>
    ),
    options,
  );
}
