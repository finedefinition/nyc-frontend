'use client';
import { Formik, Form, FormikHelpers } from 'formik';
import { useRouter } from 'next/navigation';
import { formikSchema, FormikSchema } from '@/lib/validation/formikSchema';
import InputContainer from '@/components/Shared/InputContainer';
import ClickableComponent from '@/components/ClickableComponent/ClickableComponent';
import { handleSubmit } from '@/utils/contactForm/handleSubmit';
import { ContactSectionData } from '@/data/mainPage/ContactSection';

type ContactFormikProps = {
  dark?: boolean;
};

const ContactForm = ({ dark }: ContactFormikProps) => {
  const router = useRouter();

  return (
    <>
      <Formik
        initialValues={{
          name: '',
          userEmail: '',
          message: '',
        }}
        validationSchema={formikSchema}
        onSubmit={async (
          values,
          helpers: FormikHelpers<FormikSchema & { serverError?: string }>
        ) => {
          await handleSubmit(values, helpers, router);
        }}
      >
        {({ values, errors, touched, isValid, dirty }) => (
          <Form>
            {Object.keys(values).map((inputName) => (
              <InputContainer
                key={inputName}
                inputName={inputName}
                error={errors[inputName as keyof FormikSchema]}
                isTouched={touched[inputName as keyof FormikSchema]}
                dark={dark}
              />
            ))}

            <ClickableComponent
              type="submit"
              disabled={!(isValid && dirty)}
              variants={['button', 'secondary']}
            >
              {ContactSectionData.button}
            </ClickableComponent>

            {errors.serverError ? (
              <div className="text-error text-sm">{errors.serverError}</div>
            ) : (
              <div className="h-5" />
            )}
          </Form>
        )}
      </Formik>
    </>
  );
};

export default ContactForm;
