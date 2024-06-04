import { useCallback } from 'react';
import type { UserDetailsDto } from 'api-user';
import { useForm } from 'react-hook-form';
import { AldiButton } from '@/components/nextui/aldi-button';
import { AldiInput } from '@/components/nextui/aldi-input';
import { emailRegex } from '@/utils/email-regex';

export interface PersonalInformationFormProps {
  initialFormValues: UserDetailsDto;
}

export function PersonalInformationForm({
  initialFormValues,
}: PersonalInformationFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialFormValues,
  });

  const onSubmit = useCallback(
    (data: typeof initialFormValues) => {
      console.log(data);
      console.log(errors);
    },
    [errors],
  );

  return (
    <div>
      <form method="post" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-5 flex">
          <AldiInput
            type="text"
            label="Vorname"
            variant="bordered"
            isRequired={true}
            isInvalid={!!errors.firstName}
            radius="full"
            errorMessage={errors.firstName && 'Vorname is required'}
            {...register('firstName', { required: true })}
          />
          <AldiInput
            className="ml-4"
            type="text"
            label="Nachname"
            variant="bordered"
            isRequired={true}
            isInvalid={!!errors.lastName}
            radius="full"
            errorMessage={errors.lastName && 'Nachname is required'}
            {...register('lastName', { required: true })}
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
          errorMessage={
            errors.email && 'Eine korrekte E-Mail Adresse wird benötigt'
          }
          {...register('email', {
            required: true,
            validate: (value) => !!value && emailRegex.test(value),
          })}
        />
        <div className="mb-5 flex">
          <AldiInput
            type="text"
            label="Geschlecht"
            variant="bordered"
            isRequired={true}
            isInvalid={!!errors.gender}
            radius="full"
            errorMessage={errors.gender && 'Geschlecht wird benötigt'}
            {...register('gender', { required: true })}
          />
          <AldiInput
            className="ml-4"
            type="text"
            label="Geburtstag"
            variant="bordered"
            isRequired={true}
            isInvalid={!!errors.dateOfBirth}
            radius="full"
            errorMessage={errors.dateOfBirth && 'Geburtsdatum wird benötigt'}
            {...register('dateOfBirth', { required: true })}
          />
        </div>
        <div className="mb-5 flex">
          <AldiInput
            type="text"
            label="Straße"
            variant="bordered"
            isRequired={true}
            isInvalid={!!errors.addressStreet}
            radius="full"
            errorMessage={errors.addressStreet && 'Straße wird benötigt'}
            {...register('addressStreet', { required: true })}
          />
          <AldiInput
            className="ml-4"
            type="text"
            label="Hausnummer"
            variant="bordered"
            isRequired={true}
            isInvalid={!!errors.addressHouseNumber}
            radius="full"
            errorMessage={
              errors.addressHouseNumber && 'Hausnummer wird benötigt'
            }
            {...register('addressHouseNumber', { required: true })}
          />
        </div>
        <div className="mb-5 flex">
          <AldiInput
            className="mr-5"
            type="text"
            label="Stadt"
            variant="bordered"
            isRequired={true}
            isInvalid={!!errors.addressCity}
            radius="full"
            errorMessage={errors.addressCity && 'Ort wird benötigt'}
            {...register('addressCity', { required: true })}
          />
          <AldiInput
            type="number"
            label="PLZ"
            variant="bordered"
            isRequired={true}
            isInvalid={!!errors.addressPostalCode}
            radius="full"
            errorMessage={
              errors.addressPostalCode && 'Postleitzahl wird benötigt'
            }
            {...register('addressPostalCode', {
              required: true,
              validate: (value) => !!value && value.toString().length === 5,
            })}
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
  );
}
