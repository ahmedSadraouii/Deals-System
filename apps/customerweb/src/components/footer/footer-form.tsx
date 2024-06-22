'use client';

import React, { useCallback, useState } from 'react';
import Image from 'next/image';
import { Input, Button } from '@nextui-org/react';
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
        <div className="mb-5 flex">
          <Input
            className="rounded-full bg-white"
            type="text"
            label="Vorname"
            variant="bordered"
            isRequired={true}
            isInvalid={!!errors.name}
            radius="full"
            errorMessage={errors.name && 'Vorname is required'}
            {...register('name', { required: true })}
          />
          <Input
            className="ml-4 rounded-full bg-white"
            type="text"
            label="Nachname"
            variant="bordered"
            isRequired={true}
            isInvalid={!!errors.surname}
            radius="full"
            errorMessage={errors.surname && 'Nachname is required'}
            {...register('surname', { required: true })}
          />
        </div>
        <Input
          className="rounded-full bg-white"
          type="email"
          label="E-Mail Adresse"
          variant="bordered"
          isRequired={true}
          isInvalid={!!errors.email}
          radius="full"
          errorMessage={errors.email && 'Email is required'}
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
        <Button
          type="submit"
          className="mb-5 mt-5 w-full rounded-full bg-aldi-blue px-5 py-7 text-center text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300"
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
