import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import BookRow from './BookRow';
import TableHeader from './TableHeader';
import HeaderButtons from './HeaderButtons';
import Modal from './Modal';

const ConcurrencyBookTable = () => {
  const location = useLocation();
  const [books, setBooks] = useState(location.state?.books || []);
  const [premiumBooks, setPremiumBooks] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [bulkConcurrency, setBulkConcurrency] = useState("");

  const bundleName = location.state?.bundle_name || ""; // Retrieve bundle name from state

  // Filter premium books from the main books list
  useEffect(() => {
    const premiumOnlyBooks = books.filter((book) => book.is_premium);
    setPremiumBooks(premiumOnlyBooks);
  }, [books]);

  const updateConcurrency = (index, newConcurrency) => {
    setPremiumBooks((prevBooks) => {
      const updatedBooks = [...prevBooks];
      updatedBooks[index] = {
        ...updatedBooks[index],
        concurrency: newConcurrency,
      };
      return updatedBooks;
    });
  };

  const handleBulkEdit = (newConcurrency) => {
    const numericValue = Number(newConcurrency);
    if (!isNaN(numericValue)) {
      const updatedBooks = premiumBooks.map((book) => ({
        ...book,
        concurrency: numericValue,
      }));
      setPremiumBooks(updatedBooks);
    }
  };

  const handleConcurrencyChange = (index, newConcurrency) => {
    updateConcurrency(index, newConcurrency);
  };

  return (
    <div className="min-h-screen h-full w-full flex flex-col bg-gray-50">
      <header className="flex justify-between items-center border-b p-4 bg-white w-full">
        <h1 className="text-xl font-semibold">View/Edit DRM Policies</h1>
        <HeaderButtons bundle_name={bundleName} updatedBooks={premiumBooks} />
      </header>

      <div className="flex justify-end p-4 bg-white">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => setModalOpen(true)}
        >
          Bulk edit
        </button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded ml-2">
          DOWNLOAD AS CSV
        </button>
      </div>

      <div className="flex-grow w-full overflow-auto p-4">
        <TableHeader />

        <div className="w-full">
          {premiumBooks.length > 0 ? (
            premiumBooks.map((book, index) => (
              <BookRow
                key={index}
                book={book}
                onUpdateConcurrency={(newConcurrency) =>
                  handleConcurrencyChange(index, newConcurrency)
                }
              />
            ))
          ) : (
            <p>No premium books available for concurrency edit.</p>
          )}
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleBulkEdit}
        value={bulkConcurrency}
        setValue={setBulkConcurrency}
      />
    </div>
  );
};

export default ConcurrencyBookTable;
