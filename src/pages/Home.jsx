import React, { useEffect, useState } from 'react';
import Client from '../components/Client';

const Home = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const getClientsAPI = async () => {
      try {
        const url = import.meta.env.VITE_API_URL;

        const response = await fetch(url);
        const result = await response.json();
        setClients(result);
      } catch (error) {
        console.log(error);
      }
    };
    getClientsAPI();
  }, []);

  const handleDelete = async (id) => {
    const confirmar = confirm('Do you want to delete this client?');

    if (confirmar) {
      try {
        const url = `${import.meta.env.VITE_API_URL}/${id}`;
        const response = await fetch(url, {
          method: 'DELETE',
        });
        await response.json();

        const newArrayClients = clients.filter((client) => client.id !== id);
        setClients(newArrayClients);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <h2 className="font-bold text-4xl text-[#24A19C] capitalize">Clients</h2>
      <p className="mt-1 text-gray-700">Manage your clients</p>

      <table className="w-full mt-5 table-auto shadow bg-white">
        <thead className="bg-[#24a19c] text-gray-100">
          <tr>
            <th className="p-2">Name</th>
            <th className="p-2">Contact</th>
            <th className="p-2">Company</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {clients.map((client) => {
            return (
              <Client
                key={client.id}
                client={client}
                handleDelete={handleDelete}
              />
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Home;
