// src/components/HeaderButtons.jsx
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useState } from 'react';

const HeaderButtons = ({ bundle_name, updatedBooks }) => {
  const [error, setError] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State for dialog visibility
  const [concurrencyDisplay, setConcurrencyDisplay] = useState("");
  const navigate = useNavigate();

  const handleSave = async () => {
    const payload = { bundle_name, updatedBooks };

    try {
      console.log("Payload to be sent:", payload);
      const response = await axios.post("http://localhost:5000/api/v1/update-concurrency", payload);
      console.log("Concurrency updated:", response.data);
      alert("Concurrency updated successfully!");

      // Determine the concurrency display value
      const uniqueConcurrency = new Set(updatedBooks.map(book => book.concurrency));
      const concurrencyValue = uniqueConcurrency.size === 1 ? 
        Array.from(uniqueConcurrency)[0] : 
        "Title Specific";

      setConcurrencyDisplay(concurrencyValue);
      setIsDialogOpen(true); // Open the dialog
    } catch (error) {
      console.log("Error updating concurrency:", error.response?.data || error.message);
      setError("Failed to update concurrency.");
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <div className="flex items-center">
      <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded">SAVE</button>
      <button className="ml-2 border px-4 py-2 rounded" onClick={() => navigate('/form')}>
        BACK
      </button>
      {error && <div className="text-red-500">{error}</div>}

      {/* Dialog Box */}
      {isDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md w-1/3">
            <h2 className="text-lg font-bold">Confirmation</h2>
            <p>Bundle Name: <strong>{bundle_name}</strong></p>
            <p>Concurrency: <strong>{concurrencyDisplay}</strong></p>
            <div className="mt-4 flex justify-end">
              <button onClick={handleCloseDialog} className="bg-blue-500 text-white px-4 py-2 rounded">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeaderButtons;
