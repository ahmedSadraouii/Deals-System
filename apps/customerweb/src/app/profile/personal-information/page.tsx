import { useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import MenuBar from '@/components/account/menu-bar';
import ProfileAvatar from '@/components/account/profile-avatar';
import { AldiButton } from '@/components/nextui/aldi-button';
import { AldiInput } from '@/components/nextui/aldi-input';

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

  const sessionData = useSession();
  console.log(sessionData);

  return (
    <div className="container mx-auto py-14">
      <MenuBar />

      <div className="mx-auto mt-10 max-w-4xl">
        <div className="rounded-xl bg-gray-100 p-5">
          <div className="mx-auto max-w-xl">
            <div className="mb-10 flex items-center">
              <ProfileAvatar />
              <h1 className="ml-4 text-4xl font-bold">Henrik Ekstrand</h1>
            </div>
            <hr className="mb-10 border-b-2" />
            <div>
              <form method="post" onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-5 flex">
                  <AldiInput
                    type="text"
                    label="Vorname"
                    variant="bordered"
                    isRequired={true}
                    isInvalid={!!errors.name}
                    radius="full"
                    errorMessage={errors.name && 'Vorname is required'}
                    {...register('name', { required: true })}
                  />
                  <AldiInput
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
                <AldiInput
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
                  <AldiInput
                    type="text"
                    label="Geschlecht"
                    variant="bordered"
                    isRequired={true}
                    isInvalid={!!errors.name}
                    radius="full"
                    errorMessage={errors.name && 'Vorname is required'}
                    {...register('name', { required: true })}
                  />
                  <AldiInput
                    className="ml-4"
                    type="text"
                    label="Geburtstag"
                    variant="bordered"
                    isRequired={true}
                    isInvalid={!!errors.surname}
                    radius="full"
                    errorMessage={errors.surname && 'Nachname is required'}
                    {...register('surname', { required: true })}
                  />
                </div>
                <div className="mb-5 flex">
                  <AldiInput
                    type="text"
                    label="Straße"
                    variant="bordered"
                    isRequired={true}
                    isInvalid={!!errors.name}
                    radius="full"
                    errorMessage={errors.name && 'Vorname is required'}
                    {...register('name', { required: true })}
                  />
                  <AldiInput
                    className="ml-4"
                    type="text"
                    label="Hausnummer"
                    variant="bordered"
                    isRequired={true}
                    isInvalid={!!errors.surname}
                    radius="full"
                    errorMessage={errors.surname && 'Nachname is required'}
                    {...register('surname', { required: true })}
                  />
                </div>

                <div className="mb-5 flex">
                  <AldiInput
                    className="mr-5"
                    type="text"
                    label="Stadt"
                    variant="bordered"
                    isRequired={true}
                    isInvalid={!!errors.place}
                    radius="full"
                    errorMessage={errors.place && 'Ort is required'}
                    {...register('place', { required: true })}
                  />
                  <AldiInput
                    type="text"
                    label="PLZ"
                    variant="bordered"
                    isRequired={true}
                    isInvalid={!!errors.postCode}
                    radius="full"
                    errorMessage={errors.postCode && 'PLZ is required'}
                    {...register('postCode', { required: true })}
                  />
                </div>

                <AldiButton
                  type="submit"
                  className="mt-5 w-full rounded-full bg-black px-5 py-7 text-center text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300"
                >
                  Speichern
                </AldiButton>

                <AldiButton
                  type="button"
                  className="mt-5 w-full rounded-full border-1 border-black bg-transparent px-5 py-7 text-center text-sm font-medium text-black hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300"
                >
                  Ausloggen
                </AldiButton>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
