import React from 'react';
import ClientForm from '../components/ClientForm';

const NewClient = () => {
  return (
    <>
      <h2 className="font-bold text-4xl text-[#24A19C] capitalize">
        new client
      </h2>
      <p className="mt-1 text-gray-700">
        Complete the fields to register a new client
      </p>

      <ClientForm />
    </>
  );
};

export default NewClient;
