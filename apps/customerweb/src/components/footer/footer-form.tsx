'use client';

import React, { useCallback, useState } from 'react';
import Image from 'next/image';
import { AldiInput } from '../nextui/aldi-input';
import { Button } from '@nextui-org/react';
import { useForm } from 'react-hook-form';
import { AldiCheckbox } from 'src/components/nextui/aldi-checkbox';

function FooterForm() {
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsCheckboxChecked((prev) => !prev);
  };
  const defaultValues = {
    name: '',
    surname: '',
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
    (data: typeof defaultValues) => {
      console.log(data);
      console.log(errors);
    },
    [errors],
  );
  return (
    <>
      <form method="post" onSubmit={handleSubmit(onSubmit)} className="mt-5">
        <div className="mb-5 flex flex-col items-center justify-center gap-5 lg:flex-row">
          <AldiInput
            className="rounded-full bg-white"
            type="text"
            label="Vorname"
            variant="bordered"
            isRequired={true}
            isInvalid={!!errors.name}
            radius="full"
            errorMessage={errors.name?.message}
            {...register('name', { required: true })}
          />
          <AldiInput
            className="rounded-full bg-white lg:ml-4"
            type="text"
            label="Nachname"
            variant="bordered"
            isRequired={true}
            isInvalid={!!errors.surname}
            radius="full"
            errorMessage={errors.surname?.message}
            {...register('surname', { required: true })}
          />
        </div>
        <AldiInput
          className="rounded-full bg-white"
          type="email"
          label="E-Mail Adresse"
          variant="bordered"
          isRequired={true}
          isInvalid={!!errors.email}
          radius="full"
          errorMessage={errors.email?.message}
          {...register('email', { required: true })}
        />
        <div className="mt-6 flex gap-2">
          <AldiCheckbox
            checked={isCheckboxChecked}
            onChange={handleCheckboxChange}
          />
          <p className="text-sm text-white">
            Ich möchte News per E-Mail erhalten und bin mit der damit
            verbundenen Verarbeitung meiner personenbezogenen Daten gemäß der
            ALDI SÜD-Datenschutzerklärung einverstanden*. Ein Widerruf ist
            jederzeit möglich.
          </p>
        </div>
        <p className="mt-4 text-sm text-white">*Pflichtfeld</p>
        <Button
          type="submit"
          className="mb-5 mt-5 w-full rounded-full bg-secondary px-5 py-7 text-center text-lg font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300 md:font-normal"
        >
          Jetzt anmelden {''}
          <Image
            src="/icons/send-icon.svg"
            width={16}
            height={15}
            alt="send icon"
          />
        </Button>
      </form>
    </>
  );
}

export default FooterForm;
