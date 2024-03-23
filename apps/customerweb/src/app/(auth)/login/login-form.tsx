'use client';

import { useCallback } from 'react';
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import { Button, Input } from '@nextui-org/react';
import { useForm } from 'react-hook-form';

export function LoginForm() {
  const defaultValues = {
    email: 'a',
    password: 'b',
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  const onSubmit = useCallback(async (data: typeof defaultValues) => {
    await signIn('credentials', {
      email: data.email,
      password: data.password,
      callbackUrl: '/',
    });
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
        type="password"
        className="mb-5"
        label="Passwort"
        variant="bordered"
        isRequired={true}
        isInvalid={!!errors.email}
        radius="full"
        errorMessage={errors.email && 'Email is required'}
        {...register('password', { required: true })}
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
  );
}
