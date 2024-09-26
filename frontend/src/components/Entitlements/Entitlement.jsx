import React from "react";
import { useLocation } from 'react-router-dom';

const LicenseDetails = () => {
  const location = useLocation();
  const license = location.state; // Access the specific license object
  
  if (!license) {
    return <div>No license data found</div>; // Handle case where license is not found
  }

  return (
    <div className="p-4 max-w-6xl mx-auto bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">License: {license.licenseName}</h1>
      <h2 className="text-lg mb-2">Order Number: {license.orderNumber}</h2>
      <table className="table-auto w-full bg-white rounded-lg">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-2 font-bold">Book Name</th>
            <th className="p-2 font-bold">Is Premium</th>
            <th className="p-2 font-bold">Concurrency</th>
          </tr>
        </thead>
        <tbody>
          {license.books.map((book) => (
            <tr key={book._id} className="border-b">
              <td className="p-2">{book.book_name}</td>
              <td className="p-2">{book.is_premium ? "Yes" : "No"}</td>
              <td className="p-2">{book.concurrency > 0 ? book.concurrency : "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LicenseDetails;
