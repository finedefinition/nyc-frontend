/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { FormikHelpers } from 'formik';
import { apiClient } from '@/utils/api/apiClient';
import {
  FormikSchema,
  ExtendedFormikErrors,
} from '@/lib/validation/formikSchema';

export const handleSubmit = async (
  values: FormikSchema,
  helpers: FormikHelpers<FormikSchema>,
  router: AppRouterInstance
) => {
  const { resetForm, setSubmitting, setErrors } = helpers;

  try {
    const data: any = await apiClient.sendMessageFromContactForm(
      '/contact',
      values
    );

    // eslint-disable-next-line
    console.log(data.status, 'status');

    if (data.status === 200) {
      router.push('/contactform', { scroll: false });
      resetForm();
      return;
    }
    setErrors({
      serverError:
        'An error occurred while sending the data. Please try again.',
    } as ExtendedFormikErrors<FormikSchema>);
  } catch (error) {
    // eslint-disable-next-line
    console.log(error);
    setErrors({
      serverError:
        'A connection error occurred. Please check your internet connection or try again later.',
    } as ExtendedFormikErrors<FormikSchema>);
  } finally {
    setSubmitting(false);
  }
};
