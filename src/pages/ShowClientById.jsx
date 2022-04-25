import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaUserTie, FaStickyNote } from 'react-icons/fa';
import { GiFactory } from 'react-icons/gi';
import { AiOutlineMail } from 'react-icons/ai';
import { AiTwotonePhone } from 'react-icons/ai';
import Spinner from '../components/Spinner';

const ShowClientById = () => {
  const { id } = useParams();

  const [showClient, setShowClient] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(loading);
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
    <div className="text-gray-700">
      {loading ? (
        <Spinner />
      ) : Object.keys(showClient).length === 0 ? (
        <p className="text-xl text-red-500">No Results</p>
      ) : (
        <div>
          <h2 className="font-bold text-2xl text-[#24A19C] capitalize">
            Show Client:{' '}
            <span className="font-medium text-xl">{showClient.name}</span>
          </h2>
          <p className="mt-1 text-gray-700 text-xl">Client Information</p>

          <div className="bg-white mt-10 p-3 md:p-6 text-gray-600">
            {/* Name Client */}
            <div className="flex items-center text-lg md:text-2xl p-2">
              <FaUserTie />
              <p className="ml-3 font-semibold">
                Client: <span className="font-normal">{showClient.name}</span>
              </p>
            </div>

            {/* Name Company */}
            <div className="flex items-center text-lg md:text-2xl p-2">
              <GiFactory />
              <p className="ml-3 font-semibold">
                Company:{' '}
                <span className="font-normal">{showClient.company}</span>
              </p>
            </div>

            {/* Email */}
            <div className="flex items-center text-lg md:text-2xl p-2">
              <AiOutlineMail />
              <p className="ml-3 font-semibold">
                E-mail: <span className="font-normal">{showClient.email}</span>
              </p>
            </div>

            {/* Phone */}
            <div className="flex items-center text-lg md:text-2xl p-2">
              <AiTwotonePhone />
              <p className="ml-3 font-semibold">
                Phone: <span className="font-normal">{showClient.phone}</span>
              </p>
            </div>

            {/* Notes */}
            {showClient.notes && (
              <div className="flex items-center text-lg md:text-2xl p-2">
                <FaStickyNote />
                <p className="ml-3 font-semibold">
                  Notes: <span className="font-normal">{showClient.notes}</span>
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowClientById;
