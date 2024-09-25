// components/BookRow.jsx
import React from "react";

const BookRow = ({ book, onUpdateConcurrency }) => {
  const handleConcurrencyChange = (e) => {
    const newConcurrency = e.target.value;
    onUpdateConcurrency(newConcurrency);
  };

  return (
    <div className="grid grid-cols-6 gap-4 p-4 border-b border-gray-300 bg-white">
      {/* Title Column: Display book_name */}
      <div className="col-span-2">
        {book.book_name}
      </div>

      {/* Published Column: Hardcoded "Published" */}
      <div>
        Published
      </div>

      {/* Concurrency Column: Editable input */}
      <div>
        <input
          type="number"
          className="border p-2 rounded-md w-full"
          value={book.concurrency || ""}
          onChange={handleConcurrencyChange}
          placeholder="Enter Concurrency"
        />
      </div>

      {/* Additional columns as needed */}
      <div>{/* Placeholder for future columns */}</div>
      <div>{/* Placeholder for future columns */}</div>
    </div>
  );
};

export default BookRow;
