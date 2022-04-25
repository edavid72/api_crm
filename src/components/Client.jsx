import React from 'react';
import { useNavigate } from 'react-router-dom';

const Client = ({ client, handleDelete }) => {
  const navigate = useNavigate();
  const { name, company, email, phone, notes, id } = client;
  return (
    <tr className="text-gray-700 text-center border-b hover:bg-gray-100">
      <td className="p-3">{name}</td>
      <td className="p-3">
        <p>
          <span className="text-gray-600 uppercase font-semibold">Email:</span>
          {email}
        </p>
        <p>
          <span className="text-gray-600 uppercase font-semibold">Phone:</span>
          {phone}
        </p>
      </td>
      <td className="p-3">{company}</td>
      <td className="p-3">
        <button
          type="button"
          className="bg-[#FFB72B] hover:bg-[#d5a647] block w-full text-gray-100 mb-2"
          onClick={() => navigate(`/clients/${id}`)}
        >
          Show
        </button>
        <button
          type="button"
          className="bg-[#24A19C] hover:bg-[#36c2be] block w-full text-gray-100 mb-2"
          onClick={() => navigate(`/clients/edit/${id}`)}
        >
          Edit
        </button>
        <button
          type="button"
          className="bg-[#fd5d5d] hover:bg-[#f57070] block w-full text-gray-100 mb-2"
          onClick={() => handleDelete(id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default Client;
