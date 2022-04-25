import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router-dom';
import { object, string, number } from 'yup';
import ErrorMsg from './ErrorMsg';
import Spinner from './Spinner';

const ClientForm = ({ showClient, loading }) => {
  const navigate = useNavigate();

  //* Validation with YUP https://github.com/jquense/yup
  const userSchema = object({
    name: string().min(3).max(40).required(),
    company: string().required(),
    email: string().email(),
    phone: number().integer().positive().required(),
  });

  const handleSubmit = async (values) => {
    try {
      if (showClient.id) {
        const url = `${import.meta.env.VITE_API_URL}/${showClient.id}`;

        const response = await fetch(url, {
          method: 'PUT',
          body: JSON.stringify(values),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        // console.log(response);

        await response.json();
        // console.log(result);

        // Redirect to ?
        navigate('/clients');
      } else {
        const url = import.meta.env.VITE_API_URL;

        const response = await fetch(url, {
          method: 'POST',
          body: JSON.stringify(values),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        // console.log(response);

        await response.json();
        // console.log(result);

        // Redirect to ?
        navigate('/clients');
      }
    } catch (error) {
      console.log(error);
    }
  };
  return loading ? (
    <Spinner />
  ) : (
    <div className="bg-white mt-8 px-5 py-6 rounded-md shadow-md md:w-3/4 mx-auto">
      <h1 className="text-gray-700 font-bold text-xl uppercase text-center mt-4">
        {showClient?.name ? 'Edit Client' : 'Add new client'}
      </h1>

      <Formik
        // state of formik
        initialValues={{
          name: showClient?.name ?? '',
          company: showClient?.company ?? '',
          email: showClient?.email ?? '',
          phone: showClient?.phone ?? '',
          notes: showClient?.notes ?? '',
        }}
        enableReinitialize={true}
        // func submit
        onSubmit={async (values, { resetForm }) => {
          await handleSubmit(values);

          resetForm();
        }}
        validationSchema={userSchema}
      >
        {({ errors, touched }) => {
          {
            /* console.log(errors); */
          }
          return (
            <Form className="mt-8">
              {/* Client Name */}
              <div className="mb-5">
                <label htmlFor="name" className="text-gray-700 text-lg">
                  Name:
                </label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Client Name"
                  className="mt-2 block w-full bg-gray-100 p-1"
                />

                {/* Error Message */}
                {errors.name && touched.name ? (
                  <ErrorMsg message={errors.name} />
                ) : null}
              </div>

              {/* Company Name */}
              <div className="mb-5">
                <label htmlFor="company" className="text-gray-700 text-lg">
                  Company:
                </label>
                <Field
                  type="text"
                  id="company"
                  name="company"
                  placeholder="Company Name"
                  className="mt-2 block w-full bg-gray-100 p-1"
                />

                {/* Error Message */}
                {errors.company && touched.company ? (
                  <ErrorMsg message={errors.company} />
                ) : null}
              </div>

              {/* E-mail */}
              <div className="mb-5">
                <label htmlFor="email" className="text-gray-700 text-lg">
                  E-mail:
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  placeholder="E-mail"
                  className="mt-2 block w-full bg-gray-100 p-1"
                />

                {/* Error Message */}
                {errors.email && touched.email ? (
                  <ErrorMsg message={errors.email} />
                ) : null}
              </div>

              {/* Phone */}
              <div className="mb-5">
                <label htmlFor="phone" className="text-gray-700 text-lg">
                  Phone:
                </label>
                <Field
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="Phone"
                  className="mt-2 block w-full bg-gray-100 p-1"
                />
                {/* Error Message */}
                {errors.phone && touched.phone ? (
                  <ErrorMsg message={errors.phone} />
                ) : null}
              </div>

              {/* Client Notes */}
              <div className="mb-5">
                <label htmlFor="notes" className="text-gray-700 text-lg">
                  Client Notes:
                </label>
                <Field
                  as="textarea"
                  type="text"
                  id="notes"
                  name="notes"
                  placeholder="Client Notes"
                  className="mt-2 block w-full bg-gray-100 p-1 h-40 resize-none"
                />
              </div>

              <input
                type="submit"
                value={showClient?.name ? 'Edit Client' : 'Add New Client'}
                className="bg-[#24A19C] block w-full text-center text-gray-100 p-1 font-semibold text-lg uppercase hover:bg-[#2eaeaa] rounded-md"
              />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

ClientForm.defaultProps = {
  showClient: {},
  loading: false,
};

export default ClientForm;
