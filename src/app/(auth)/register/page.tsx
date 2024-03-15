"use client";
import React from 'react';

import {Input, Button, Checkbox} from "@nextui-org/react";
import {useForm} from "react-hook-form";
import Image from 'next/image'

const Page = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: {errors}
  } = useForm({
    defaultValues: {
      email: "",
      name: "",
      surname: "",
      postCode: "",
      place: "",
      password: "",
      phone: "",
    }
  });
  const onSubmit = (data: any) => {
    console.log(data)
    console.log(errors)
  }
  return (
    <>
      <section className="bg-gray-50 h-full py-28 text-center px-5">
        <h1 className="text-4xl font-bold leading-tight tracking-tight text-gray-900">
          Registriere Dich, um Dir tolle Deals zu sichern!
        </h1>
        <h1 className="text-sm font-light leading-tight tracking-tight text-gray-900">
          Bitte registriere dich an um fortzufahren.
        </h1>
        <div className="flex items-center justify-center mx-auto md:h-screen lg:py-0">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full sm:max-w-6xl xl:p-0 text-center">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8 bg-gray-100 rounded-2xl mr-10">
              <form
                method="post"
                onSubmit={handleSubmit(onSubmit)}
              >
                <Input
                  className="mb-5"
                  type="email"
                  label="E-Mail"
                  variant="bordered"
                  isRequired={true}
                  isInvalid={errors.email ? true : false}
                  radius="full"
                  {...register("email", {required: true})}
                  errorMessage={errors.email && "Email is required"}
                  validationState={errors.email ? "invalid" : "valid"}
                />
                <div className="flex mb-5">
                  <Input
                    type="text"
                    label="Vorname"
                    variant="bordered"
                    isRequired={true}
                    isInvalid={errors.name ? true : false}
                    radius="full"
                    {...register("name", {required: true})}
                    errorMessage={errors.name && "Vorname is required"}
                    validationState={errors.name ? "invalid" : "valid"}
                  />
                  <Input
                    className="ml-4"
                    type="text"
                    label="Nachname"
                    variant="bordered"
                    isRequired={true}
                    isInvalid={errors.surname ? true : false}
                    radius="full"
                    {...register("surname", {required: true})}
                    errorMessage={errors.surname && "Nachname is required"}
                    validationState={errors.surname ? "invalid" : "valid"}
                  />
                </div>
                <div className="flex mb-5">
                  <Input
                    type="text"
                    label="PLZ"
                    variant="bordered"
                    isRequired={true}
                    isInvalid={errors.postCode ? true : false}
                    radius="full"
                    {...register("postCode", {required: true})}
                    errorMessage={errors.postCode && "PLZ is required"}
                    validationState={errors.postCode ? "invalid" : "valid"}
                  />
                  <Input
                    className="ml-5"
                    type="text"
                    label="Ort"
                    variant="bordered"
                    isRequired={true}
                    isInvalid={errors.place ? true : false}
                    radius="full"
                    {...register("place", {required: true})}
                    errorMessage={errors.place && "Ort is required"}
                    validationState={errors.place ? "invalid" : "valid"}
                  />
                </div>
                <Input
                  className="mb-5"
                  label="Passwort"
                  variant="bordered"
                  isRequired={true}
                  isInvalid={errors.password ? true : false}
                  radius="full"
                  {...register("password", {required: true})}
                  errorMessage={errors.password && "Email is required"}
                  validationState={errors.password ? "invalid" : "valid"}
                />

                <Input
                  className="mb-5"
                  label="Telefonnummer"
                  variant="bordered"
                  isRequired={true}
                  isInvalid={errors.phone ? true : false}
                  radius="full"
                  {...register("phone", {required: true})}
                  errorMessage={errors.phone && "Telefonnummer is required"}
                  validationState={errors.phone ? "invalid" : "valid"}
                />

                <div className="flex justify-center items-center mb-4">
                  <input id="default-checkbox" type="checkbox" value=""
                         className="w-14 h-14 rounded-2xl bg-gray-100 border-gray-300 focus:!border-none !shadow-none"/>
                  <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-gray-900 text-left">
                    Indem Sie dieses Formular abschicken, stimmen Sie unseren Datenschutzbestimmungen und
                    Nutzungsbedingungen zu.
                  </label>
                </div>

                <div className="flex justify-center items-center mb-4">
                  <input id="default-checkbox" type="checkbox" value=""
                         className="w-14 h-14 rounded-2xl bg-gray-100 border-gray-300 focus:!border-none !shadow-none"/>
                  <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-gray-900 text-left">
                    Ja, ich möchte den Newsletter erhalten und akzeptiere die Datenschutzrichtlinie sowie die
                    Nutzungsbedingungen.
                  </label>
                </div>
                <Button type="submit"
                        className="w-full rounded-full text-white bg-black hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium text-sm px-5 py-7 text-center mt-5">
                  Alle bestätigen und registrieren
                </Button>

                <Button type="button"
                        className="w-full rounded-full text-black bg-transparent border-1 border-black hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium text-sm px-5 py-7 text-center mt-5">
                  Auswahl bestätigen und registrieren
                </Button>
              </form>
            </div>

            <div
              className="w-full rounded-2xl bg-white shadow md:mt-0 sm:max-w-xl xl:p-0 text-center !bg-center !bg-cover relative min-h-[700px]"
              style={{background: 'url("/login-image.png")'}}>
              <div className="p-4 w-full h-full flex items-end">
                <div className="w-full bg-amber-500 text-white text-left p-8 rounded-2xl ">
                  <h1 className="font-medium text-2xl mb-4">Deine Vorteile als Mitglied im Überblick!</h1>
                  <ul>
                    <li className="flex items-center">
                      <Image
                        src="/icons/login-check-icon.svg"
                        width={30}
                        height={70}
                        alt="aldi sport logo"
                        className="mr-3"
                      /> Kostenlos, unverbindlich und jederzeit löschbar!
                    </li>
                    <li className="flex items-center">
                      <Image
                        src="/icons/login-check-icon.svg"
                        width={30}
                        height={70}
                        alt="aldi sport logo"
                        className="mr-3"
                      /> Einlösen deiner Offline Deals!
                    </li>
                    <li className="flex items-center">
                      <Image
                        src="/icons/login-check-icon.svg"
                        width={30}
                        height={70}
                        alt="aldi sport logo"
                        className="mr-3"
                      /> Neue Angebote, Sonderaktionen und Deals nie mehr verpassen!
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

        </div>
        <div className="mx-auto w-full sm:max-w-6xl">
          <Button type="button"
                  className="rounded-full text-black bg-transparent border-1 border-black hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium text-sm px-5 py-7 text-center mt-5">
            <Image
              src="/aldi-sport-logo.svg"
              width={100}
              height={70}
              alt="aldi sport logo"
              className="h-5"
            /> Mit ALDI SPORTS Konto anmelden
          </Button>
          <p className="mt-5 text-sm font-light text-gray-500">Du besitzt ein ALDI SPORTS Konto? Melde dich mit deinen
            Accountdaten an.</p>
        </div>
      </section>


    </>
  );
};

export default Page;
