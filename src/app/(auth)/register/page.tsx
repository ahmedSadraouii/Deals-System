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
      <section className="bg-gray-50">
        <div className="flex flex-col items-center justify-center px-8 py-8 mx-auto md:h-screen lg:py-0">
          <div
            className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-xl xl:p-0 text-center">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-4xl font-bold leading-tight tracking-tight text-gray-900">
                Registrieren
              </h1>
              <h1 className="text-sm font-light leading-tight tracking-tight text-gray-900">
                Erstellen Sie Ihr Konto.
              </h1>

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
                <Input
                  className="mb-5"
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
                  className="mb-5"
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
                <Input
                  className="mb-5"
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
                  className="mb-5"
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
                  <label for="default-checkbox" className="ms-2 text-sm font-medium text-gray-900 text-left">
                    Indem Sie dieses Formular abschicken, stimmen Sie unseren Datenschutzbestimmungen und
                    Nutzungsbedingungen zu.
                  </label>
                </div>

                <div className="flex justify-center items-center mb-4">
                  <input id="default-checkbox" type="checkbox" value=""
                         className="w-14 h-14 rounded-2xl bg-gray-100 border-gray-300 focus:!border-none !shadow-none"/>
                  <label for="default-checkbox" className="ms-2 text-sm font-medium text-gray-900 text-left">
                    Ja, ich möchte den Newsletter erhalten und akzeptiere die Datenschutzrichtlinie sowie die
                    Nutzungsbedingungen.
                  </label>
                </div>

                <Button type="button"
                        className="w-full rounded-full text-black bg-transparent border-1 border-black hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium text-sm px-5 py-7 text-center mt-5">
                  <Image
                    src="/aldi-sport-logo.svg"
                    width={100}
                    height={70}
                    alt="aldi sport logo"
                    className="h-5"
                  /> Mit ALDI SPORTS Konto anmelden
                </Button>

                <Button type="submit"
                        className="w-full rounded-full text-white bg-black hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium text-sm px-5 py-7 text-center mb-5 mt-5">Weiter</Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;
