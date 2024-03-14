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
  /*const onSubmit = (event: any) => {
  event.preventDefault()
  const data = new FormData(event.currentTarget)
  console.log(data)
  console.log(event.currentTarget)
}*/
  return (
    <>
      <section className="bg-gray-50">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div
            className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-xl xl:p-0 text-center">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-4xl font-bold leading-tight tracking-tight text-gray-900">
                Anmelden
              </h1>
              <h1 className="text-sm font-light leading-tight tracking-tight text-gray-900">
                Bitte melde dich an um fortzufahren.
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
                  label="Passwort"
                  variant="bordered"
                  isRequired={true}
                  isInvalid={errors.email ? true : false}
                  radius="full"
                  {...register("password", {required: true})}
                  errorMessage={errors.email && "Email is required"}
                  validationState={errors.email ? "invalid" : "valid"}
                />
                <a href="#" className="text-sm font-medium text-black hover:underline mb-7">Passwort vergessen?</a>
                <Button type="submit"
                        className="w-full rounded-full text-white bg-black hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium text-sm px-5 py-7 text-center mb-5 mt-5">Anmelden</Button>

                <Button type="button"
                        className="w-full rounded-full text-black bg-transparent border-1 border-black hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium text-sm px-5 py-7 text-center mb-5">Account
                  erstellen</Button>

                <Button type="button"
                        className="w-full rounded-full text-black bg-transparent border-1 border-black hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium text-sm px-5 py-7 text-center">
                  <img src="/aldi-sport-logo.svg" alt="aldi sport logo" className="h-5"/> Mit ALDI SPORTS Konto anmelden
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;
