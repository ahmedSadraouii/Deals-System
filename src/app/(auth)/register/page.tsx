"use client";
import React from 'react';

import {Input, Button} from "@nextui-org/react";
import {useForm} from "react-hook-form";

const Page = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: {errors}
  } = useForm({
    defaultValues: {
      email: "",
      password: ""
    }
  });
  const onSubmit = (data: any) => {
    console.log(data)
    console.log(errors)
  }
  return (
    <>
      <section className="bg-gray-50">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div
            className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 text-center">
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
                  label="Nutzername oder E-Mail"
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
                  label="Password"
                  variant="bordered"
                  isRequired={true}
                  isInvalid={errors.email ? true : false}
                  radius="full"
                  {...register("password", {required: true})}
                  errorMessage={errors.email && "Email is required"}
                  validationState={errors.email ? "invalid" : "valid"}
                />

                <Button type="button"
                        className="w-full rounded-full text-black bg-transparent border-1 border-black hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium text-sm px-5 py-7 text-center mt-5">
                  <img src="/aldi-sport-logo.svg" alt="aldi sport logo" className="h-5"/> Mit ALDI SPORTS Konto anmelden
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
