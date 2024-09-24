import {useState } from "react";
import BookRow from "./BookRow";
import TableHeader from "./TableHeader";
import HeaderButtons from "./HeaderButtons";
import Modal from "./Modal";

const ConcurrencyBookTable = () => {
  const [books, setBooks] = useState([
    {
      title: "Data Science and Machine Learning",
      status: "Published",
      concurrency: 1,
    },
    {
      title: "The Applied Theatre Reader",
      status: "Published",
      concurrency: 1,
    },
  ]);
  
  const [isModalOpen, setModalOpen] = useState(false);
  const [bulkConcurrency, setBulkConcurrency] = useState("");

  const updateConcurrency = (index, newConcurrency) => {
    setBooks((prevBooks) => {
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
      setBooks((prevBooks) =>
        prevBooks.map((book) => ({
          ...book,
          concurrency: numericValue,
        }))
      );
    }
  };

  return (
    <div className="min-h-screen h-full w-full flex flex-col bg-gray-50">
      <header className="flex justify-between items-center border-b p-4 bg-white w-full">
        <h1 className="text-xl font-semibold">View/Edit DRM Policies</h1>
        <HeaderButtons/>
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
          {books.map((book, index) => (
            <BookRow
              key={index}
              book={book}
              onUpdateConcurrency={(newConcurrency) => updateConcurrency(index, newConcurrency)}
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
