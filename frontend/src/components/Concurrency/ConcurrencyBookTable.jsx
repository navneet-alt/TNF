import { useState } from "react";
import BookRow from "./BookRow";
import TableHeader from "./TableHeader";
import HeaderButtons from "./HeaderButtons";
import Modal from "./Modal";
import { useBooks } from "../../BookContext";

const ConcurrencyBookTable = () => {
  const { books, setBooks } = useBooks();

  const [isModalOpen, setModalOpen] = useState(false);
  const [bulkConcurrency, setBulkConcurrency] = useState("");

  const updateConcurrency = (bookName, newConcurrency) => {
    setBooks((prevBooks) => {
      const updatedBooks = { ...prevBooks }; // Shallow copy of books object

      // Find and update the correct book by name
      Object.keys(updatedBooks).forEach((key) => {
        if (!isNaN(key) && updatedBooks[key].book_name === bookName) {
          updatedBooks[key] = {
            ...updatedBooks[key],
            concurrency: newConcurrency, // Update the concurrency value
          };
        }
      });

      return updatedBooks; // Reflect changes back to original books
    });
  };
  console.log(books);

  const handleBulkEdit = (newConcurrency) => {
    const numericValue = Number(newConcurrency);
    if (!isNaN(numericValue)) {
      setBooks((prevBooks) => {
        const updatedBooks = { ...prevBooks }; // Shallow copy of books object

        // Apply bulk concurrency update only to premium books
        Object.keys(updatedBooks).forEach((key) => {
          if (!isNaN(key) && updatedBooks[key].is_premium) {
            updatedBooks[key] = {
              ...updatedBooks[key],
              concurrency: numericValue,
            };
          }
        });

        return updatedBooks;
      });
    }
  };

  return (
    <div className="min-h-screen h-full w-full flex flex-col bg-gray-50">
      <header className="flex justify-between items-center border-b p-4 bg-white w-full">
        <h1 className="text-xl font-semibold">View/Edit DRM Policies</h1>
        <HeaderButtons  updatedBooks={books} />
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
          {Object.keys(books)
            .filter((key) => !isNaN(key) && books[key].is_premium) // Filter only premium books
            .map((key) => (
              <BookRow
                key={books[key].book_name} // Use the book's name as a key
                book={books[key]} // Pass the book object
                onUpdateConcurrency={(newConcurrency) =>
                  updateConcurrency(books[key].book_name, newConcurrency)
                } // Pass book name and concurrency for update
              />
            ))}
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
