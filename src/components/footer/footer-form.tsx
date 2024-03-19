'use client';
import React, {useCallback} from 'react';
import Image from 'next/image';
import {Input, Button} from '@nextui-org/react';
import {useForm} from 'react-hook-form';

const FooterForm = () => {
  const defaultValues = {
    name: '',
    surname: '',
    email: '',
    password: '',
  };
  const {
    register,
    handleSubmit,
    formState: {errors},
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
            className="bg-white rounded-full"
            type="text"
            label="Vorname"
            variant="bordered"
            isRequired={true}
            isInvalid={!!errors.name}
            radius="full"
            errorMessage={errors.name && 'Vorname is required'}
            {...register('name', {required: true})}
          />
          <Input
            className="bg-white rounded-full ml-4"
            type="text"
            label="Nachname"
            variant="bordered"
            isRequired={true}
            isInvalid={!!errors.surname}
            radius="full"
            errorMessage={errors.surname && 'Nachname is required'}
            {...register('surname', {required: true})}
          />
        </div>
        <Input
          className="bg-white rounded-full"
          type="email"
          label="E-Mail Adresse"
          variant="bordered"
          isRequired={true}
          isInvalid={!!errors.email}
          radius="full"
          errorMessage={errors.email && 'Email is required'}
          {...register('email', {required: true})}
        />

        <div className="mb-4 mt-4 flex items-center justify-center">
          <input
            id="default-checkbox"
            type="checkbox"
            value=""
            className="h-16 w-16 rounded-2xl border-gray-300 bg-transparent !shadow-none focus:!border-none"
          />
          <label
            htmlFor="default-checkbox"
            className="ms-2 text-left text-sm font-medium text-white"
          >
            Ich möchte News per E-Mail erhalten und bin mit der damit verbundenen Verarbeitung meiner personenbezogenen
            Daten gemäß der ALDI SÜD-Datenschutzerklärung einverstanden*. Ein Widerruf ist jederzeit möglich.
          </label>
        </div>

        <Button
          type="submit"
          className="mb-5 mt-5 w-full rounded-full bg-amber-500 px-5 py-7 text-center text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300"
        >
          Jetzt anmelden {""}
          <Image
            src="/icons/send-icon.svg"
            width={15}
            height={15}
            alt="send icon"
          />
        </Button>
      </form>
    </>
  );
};

export default FooterForm;
