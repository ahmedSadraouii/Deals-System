'use client';

import { useCallback } from 'react';
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import { Input, Button } from '@nextui-org/react';
import { useForm } from 'react-hook-form';

export default function Page() {
  const defaultValues = {
    email: '',
    password: '',
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  const onSubmit = useCallback(
    async (data: typeof defaultValues) => {
      await signIn('credentials', {
        email: data.email,
        password: data.password,
        callbackUrl: '/',
      });
    },
    [errors],
  );

  return (
    <>
      <section className="bg-gray-50">
        <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
          <div className="w-full rounded-lg bg-gray-100 text-center shadow sm:max-w-xl md:mt-0 xl:p-0">
            <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
              <h1 className="text-4xl font-bold leading-tight tracking-tight text-gray-900">
                Anmelden
              </h1>
              <h1 className="text-sm font-light leading-tight tracking-tight text-gray-900">
                Bitte melde dich an um fortzufahren.
              </h1>

              <form method="post" onSubmit={handleSubmit(onSubmit)}>
                <Input
                  className="mb-5"
                  type="email"
                  label="Nutzername oder E-Mail"
                  variant="bordered"
                  isRequired={true}
                  isInvalid={!!errors.email}
                  radius="full"
                  errorMessage={errors.email && 'Email is required'}
                  {...register('email', { required: true })}
                />
                <Input
                  className="mb-5"
                  label="Passwort"
                  variant="bordered"
                  isRequired={true}
                  isInvalid={!!errors.email}
                  radius="full"
                  {...register('password', { required: true })}
                  errorMessage={errors.email && 'Email is required'}
                />
                <a
                  href="#"
                  className="mb-7 text-sm font-medium text-black hover:underline"
                >
                  Passwort vergessen?
                </a>
                <Button
                  type="submit"
                  className="hover:bg-primary-700 focus:ring-primary-300 mb-5 mt-5 w-full rounded-full bg-black px-5 py-7 text-center text-sm font-medium text-white focus:outline-none focus:ring-4"
                >
                  Anmelden
                </Button>

                <Button
                  type="button"
                  className="border-1 hover:bg-primary-700 focus:ring-primary-300 mb-5 w-full rounded-full border-black bg-transparent px-5 py-7 text-center text-sm font-medium text-black focus:outline-none focus:ring-4"
                >
                  Account erstellen
                </Button>

                <Button
                  type="button"
                  className="border-1 hover:bg-primary-700 focus:ring-primary-300 w-full rounded-full border-black bg-transparent px-5 py-7 text-center text-sm font-medium text-black focus:outline-none focus:ring-4"
                >
                  <Image
                    src="/aldi-sport-logo.svg"
                    alt="ALDI Sport Logo"
                    width={20}
                    height={20}
                  />
                  Mit ALDI SPORTS Konto anmelden
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
