'use client';

import React, { useCallback, useState } from 'react';
import Image from 'next/image';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { newsletterSignup } from '@/components/footer/actions/newsletter-signup.action';
import { AldiButton } from '@/components/nextui/aldi-button';
import { AldiCheckbox } from '@/components/nextui/aldi-checkbox';
import { AldiInput } from '@/components/nextui/aldi-input';
import { emailRegex } from '@/utils/email-regex';
import { toast } from '@/utils/toast';

export function FooterForm() {
  const [isLoading, setLoading] = useState(false);
  const [hasSignedUp, setSignedUp] = useState(false);
  const defaultValues = {
    firstName: '',
    lastName: '',
    email: '',
    termsChecked: false,
  };
  const form = useForm({
    defaultValues,
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = useCallback(async (data: typeof defaultValues) => {
    try {
      setLoading(true);
      await newsletterSignup(data);
      setSignedUp(true);
    } catch (error) {
      toast({
        title: 'Fehler',
        description:
          'Es ist ein Fehler aufgetreten. Bitte versuche es später erneut.',
      });
      setLoading(false);
      console.error(error);
    }
  }, []);

  if (hasSignedUp) {
    return (
      <div className="flex flex-col items-center text-center text-white">
        <Image
          src="/img-celebration.png"
          alt="Vielen Dank"
          width={32}
          height={32}
          priority
        />

        <h1 className="mb-4 mt-2 text-4xl font-bold">
          Erfolgreich zum Newsletter angemeldet!{' '}
        </h1>

        <p className="mb-10 text-center text-xl">
          Du erhältst eine Mail zur Bestätigung deiner Newsletter-Anmeldung.
          Klicke auf den Button in der E-Mail, um deine Anmeldung zu bestätigen.
        </p>
      </div>
    );
  }

  return (
    <>
      <h1 className="text-sm text-white">Nie wieder einen Deal verpassen!</h1>
      <h2 className="text-2xl font-bold text-white md:text-4xl">
        Jetzt zum Newsletter anmelden
      </h2>
      <ul className="mt-2 md:mt-5">
        <li className="mb-2 flex items-center text-white">
          <Image
            src="/icons/login-check-icon.svg"
            width={32}
            height={32}
            alt=""
            className="mr-3"
          />
          Kostenlos, unverbindlich und jederzeit löschbar!
        </li>
        <li className="flex items-center text-white">
          <Image
            src="/icons/login-check-icon.svg"
            width={32}
            height={32}
            alt=""
            className="mr-3"
          />
          Neue Angebote, Sonderaktionen und Deals – nichts mehr verpassen!
        </li>
      </ul>
      <FormProvider {...form}>
        <form method="post" onSubmit={handleSubmit(onSubmit)} className="mt-5">
          <div className="mb-5 flex flex-col items-center justify-center gap-5 lg:flex-row">
            <AldiInput
              color="white"
              type="text"
              label="Vorname"
              isInvalid={!!errors.lastName}
              errorMessage={errors.firstName && 'Vorname wird benötigt'}
              {...register('firstName', { required: true })}
            />
            <AldiInput
              color="white"
              type="text"
              label="Nachname"
              isInvalid={!!errors.lastName}
              errorMessage={errors.lastName && 'Nachname wird benötigt'}
              {...register('lastName', { required: true })}
            />
          </div>
          <AldiInput
            color="white"
            type="email"
            label="E-Mail Adresse"
            isInvalid={!!errors.email}
            errorMessage={
              errors.email && 'Eine korrekte E-Mail Adresse wird benötigt'
            }
            {...register('email', {
              required: true,
              validate: (value) => emailRegex.test(value),
            })}
          />
          <div className="mt-6 flex gap-2">
            <Controller
              render={({ field }) => (
                <AldiCheckbox
                  color="white"
                  isRequired={true}
                  isInvalid={!!errors.termsChecked}
                  isSelected={field.value}
                  {...field}
                >
                  Ich möchte News per E-Mail erhalten und bin mit der damit
                  verbundenen Verarbeitung meiner personenbezogenen Daten gemäß
                  der ALDI SÜD-Datenschutzerklärung einverstanden*. Ein Widerruf
                  ist jederzeit möglich.
                </AldiCheckbox>
              )}
              name="termsChecked"
              rules={{ required: true }}
            />
          </div>
          <p className="my-4 text-sm text-white">*Pflichtfeld</p>
          <AldiButton
            type="submit"
            variant="solid"
            color="secondary"
            fullWidth={true}
            isLoading={isLoading}
          >
            Jetzt anmelden {''}
            <Image
              src="/icons/send-icon.svg"
              width={16}
              height={15}
              alt="send icon"
            />
          </AldiButton>
        </form>
      </FormProvider>
    </>
  );
}
