'use client';

import React, { useCallback } from 'react';
import Image from 'next/image';
import { Input, Button } from '@nextui-org/react';
import { useForm } from 'react-hook-form';

export default function Page() {
  const defaultValues = {
    email: '',
    name: '',
    surname: '',
    postCode: '',
    place: '',
    password: '',
    phone: '',
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
      <section className="h-full bg-gray-50 px-5 py-28 text-center">
        <h1 className="text-4xl font-bold leading-tight tracking-tight text-gray-900">
          Registriere Dich, um Dir tolle Deals zu sichern!
        </h1>
        <h1 className="text-sm font-light leading-tight tracking-tight text-gray-900">
          Bitte registriere dich an um fortzufahren.
        </h1>
        <div className="mx-auto flex items-center justify-center md:h-screen lg:py-0">
          <div className="grid w-full grid-cols-1 gap-4 text-center sm:max-w-6xl md:grid-cols-2 xl:p-0">
            <div className="mr-10 space-y-4 rounded-2xl bg-gray-100 p-6 sm:p-8 md:space-y-6">
              <form method="post" onSubmit={handleSubmit(onSubmit)}>
                <Input
                  className="mb-5"
                  type="email"
                  label="E-Mail"
                  variant="bordered"
                  isRequired={true}
                  isInvalid={!!errors.email}
                  radius="full"
                  errorMessage={errors.email && 'Email is required'}
                  {...register('email', { required: true })}
                />
                <div className="mb-5 flex">
                  <Input
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
                    className="ml-4"
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
                <div className="mb-5 flex">
                  <Input
                    type="text"
                    label="PLZ"
                    variant="bordered"
                    isRequired={true}
                    isInvalid={!!errors.postCode}
                    radius="full"
                    errorMessage={errors.postCode && 'PLZ is required'}
                    {...register('postCode', { required: true })}
                  />
                  <Input
                    className="ml-5"
                    type="text"
                    label="Ort"
                    variant="bordered"
                    isRequired={true}
                    isInvalid={!!errors.place}
                    radius="full"
                    errorMessage={errors.place && 'Ort is required'}
                    {...register('place', { required: true })}
                  />
                </div>
                <Input
                  className="mb-5"
                  label="Passwort"
                  variant="bordered"
                  isRequired={true}
                  isInvalid={!!errors.password}
                  radius="full"
                  errorMessage={errors.password && 'Email is required'}
                  {...register('password', { required: true })}
                />

                <Input
                  className="mb-5"
                  label="Telefonnummer"
                  variant="bordered"
                  isRequired={true}
                  isInvalid={!!errors.phone}
                  radius="full"
                  errorMessage={errors.phone && 'Telefonnummer is required'}
                  {...register('phone', { required: true })}
                />

                <div className="mb-4 flex items-center justify-center">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    value=""
                    className="h-14 w-14 rounded-2xl border-gray-300 bg-gray-100 !shadow-none focus:!border-none"
                  />
                  <label
                    htmlFor="default-checkbox"
                    className="ms-2 text-left text-sm font-medium text-gray-900"
                  >
                    Indem Sie dieses Formular abschicken, stimmen Sie unseren
                    Datenschutzbestimmungen und Nutzungsbedingungen zu.
                  </label>
                </div>

                <div className="mb-4 flex items-center justify-center">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    value=""
                    className="h-14 w-14 rounded-2xl border-gray-300 bg-gray-100 !shadow-none focus:!border-none"
                  />
                  <label
                    htmlFor="default-checkbox"
                    className="ms-2 text-left text-sm font-medium text-gray-900"
                  >
                    Ja, ich möchte den Newsletter erhalten und akzeptiere die
                    Datenschutzrichtlinie sowie die Nutzungsbedingungen.
                  </label>
                </div>
                <Button
                  type="submit"
                  className="hover:bg-primary-700 focus:ring-primary-300 mt-5 w-full rounded-full bg-black px-5 py-7 text-center text-sm font-medium text-white focus:outline-none focus:ring-4"
                >
                  Alle bestätigen und registrieren
                </Button>

                <Button
                  type="button"
                  className="border-1 hover:bg-primary-700 focus:ring-primary-300 mt-5 w-full rounded-full border-black bg-transparent px-5 py-7 text-center text-sm font-medium text-black focus:outline-none focus:ring-4"
                >
                  Auswahl bestätigen und registrieren
                </Button>
              </form>
            </div>

            <div
              className="relative min-h-[700px] w-full rounded-2xl bg-white !bg-cover !bg-center text-center shadow sm:max-w-xl md:mt-0 xl:p-0"
              style={{ background: 'url("/login-image.png")' }}
            >
              <div className="flex h-full w-full items-end p-4">
                <div className="w-full rounded-2xl bg-amber-500 p-8 text-left text-white ">
                  <h1 className="mb-4 text-2xl font-medium">
                    Deine Vorteile als Mitglied im Überblick!
                  </h1>
                  <ul>
                    <li className="flex items-center">
                      <Image
                        src="/icons/login-check-icon.svg"
                        width={30}
                        height={70}
                        alt="aldi sport logo"
                        className="mr-3"
                      />
                      Kostenlos, unverbindlich und jederzeit löschbar!
                    </li>
                    <li className="flex items-center">
                      <Image
                        src="/icons/login-check-icon.svg"
                        width={30}
                        height={70}
                        alt="aldi sport logo"
                        className="mr-3"
                      />
                      Einlösen deiner Offline Deals!
                    </li>
                    <li className="flex items-center">
                      <Image
                        src="/icons/login-check-icon.svg"
                        width={30}
                        height={70}
                        alt="aldi sport logo"
                        className="mr-3"
                      />
                      Neue Angebote, Sonderaktionen und Deals nie mehr
                      verpassen!
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto w-full sm:max-w-6xl">
          <Button
            type="button"
            className="border-1 hover:bg-primary-700 focus:ring-primary-300 mt-5 rounded-full border-black bg-transparent px-5 py-7 text-center text-sm font-medium text-black focus:outline-none focus:ring-4"
          >
            <Image
              src="/aldi-sport-logo.svg"
              width={100}
              height={70}
              alt="aldi sport logo"
              className="h-5"
            />
            Mit ALDI SPORTS Konto anmelden
          </Button>
          <p className="mt-5 text-sm font-light text-gray-500">
            Du besitzt ein ALDI SPORTS Konto? Melde dich mit deinen Accountdaten
            an.
          </p>
        </div>
      </section>
    </>
  );
}
