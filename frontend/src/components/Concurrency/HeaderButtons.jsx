import { useState } from 'react';
import { useBooks } from "../../BookContext";
import axios from 'axios';
import { Link } from 'react-router-dom';

const HeaderButtons = () => {
  const { books, setBooks } = useBooks();
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State for dialog visibility
  const [concurrencyDisplay, setConcurrencyDisplay] = useState(""); // To display concurrency type

  const licenseName = books.licenseName;
  const orderNumber = books.orderNumber;



  const handleSave = () => {
    // Extract only the premium book entries (where is_premium is true)
    const premiumBooks = Object.keys(books)
      .filter(key => !isNaN(key)) // Filters out keys that are not numbers (e.g., orderNumber, licenseName)
      .map(key => books[key]) // Extracts the book objects
      .filter(book => book.is_premium === true); // Only keep books where is_premium is true

    if (premiumBooks.length === 0) {
      setConcurrencyDisplay("No premium books found");
      setIsDialogOpen(true);
      return;
    }

    // Determine the concurrency display value based on premium books
    const uniqueConcurrency = new Set(premiumBooks.map(book => book.concurrency));
    const concurrencyValue = uniqueConcurrency.size === 1 ? 
      Array.from(uniqueConcurrency)[0] : 
      "Title Specific";

    setConcurrencyDisplay(concurrencyValue);
    setIsDialogOpen(true); // Open the dialog
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false); // Close the dialog
  };

  const handleCreateLicense = async () => {
    const payload = {
      licenseName: books.licenseName, // license name from state
      orderNumber: books.orderNumber, // order number from state
      books : Object.keys(books)
      .filter(key => !isNaN(key)) // Ensure this only filters for numeric keys that represent books
      .map(key => ({
        book_id: books[key].book_id,      // Ensure this is included
        book_name: books[key].book_name,  // Ensure this is included
        is_premium: books[key].is_premium,  // Ensure this is included
        concurrency: books[key].concurrency  // Ensure this is included
      }))
    };
    try {
      const response = await axios.post("http://localhost:5000/api/v1/create-license", payload,         {
      }
);
      console.log("License created successfully:", response.data);
      alert("License Created Successfully!");
      setIsDialogOpen(false); 
    } catch (error) {
      console.error("Error creating license:", error.response?.data || error.message);
      alert("Failed to create license. Please try again.");
    }
  };
  
  

  const handleCancelLicense = () => {
    alert("License Creation Cancelled!");
    setIsDialogOpen(false); // Close dialog on cancellation
  };

  return (
    <div className="flex items-center">
      <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded">SAVE</button>
      <Link to='/form'> <button className="ml-2 border px-4 py-2 rounded">BACK</button> </Link>
      

      {/* Dialog Box */}
      {isDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md w-1/3">
            <h2 className="text-lg font-bold">Concurrency Details</h2>
            
            {/* License Name and Order Number */}
            <p>License Name: <strong>{licenseName}</strong></p>
            <p>Order Number: <strong>{orderNumber}</strong></p>
            <p>Concurrency: <strong>{concurrencyDisplay}</strong></p>

            <div className="mt-4 flex justify-between">
              {/* Create License and Cancel License Buttons */}
              <div className="flex space-x-4">
                <button onClick={handleCreateLicense} className="bg-green-500 text-white px-4 py-2 rounded">
                  Create License
                </button>
                <button onClick={handleCancelLicense} className="bg-red-500 text-white px-4 py-2 rounded">
                  Cancel
                </button>
              </div>
              
              {/* Close Button */}
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
