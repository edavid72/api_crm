import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ClientForm from '../components/ClientForm';

const EditClient = () => {
  const { id } = useParams();

  const [showClient, setShowClient] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // console.log(loading);
    const getClientById = async () => {
      try {
        const url = `${import.meta.env.VITE_API_URL}/${id}`;
        const response = await fetch(url);
        const result = await response.json();
        setShowClient(result);
      } catch (error) {
        console.log(error);
      }
      setLoading(!loading);
    };
    getClientById();
  }, []);
  return (
    <div>
      <h2 className="font-bold text-4xl text-[#24A19C] capitalize">
        Edit client
      </h2>
      <p className="mt-1 text-gray-700">Use this form to edit clients</p>

      {showClient?.name ? (
        <ClientForm showClient={showClient} loading={loading} />
      ) : (
        <p className="text-xl mt-6">No Results</p>
      )}
    </div>
  );
};

export default EditClient;
