import React from "react";

const BookRow = ({ book, onUpdateConcurrency }) => {
  const handleConcurrencyChange = (event) => {
    const newConcurrency = Number(event.target.value);
    // Call the function passed from the parent to update concurrency
    onUpdateConcurrency(newConcurrency);
  };

  return (
    <div className="grid grid-cols-3 gap-4 items-center border-b py-2 w-full">
      <div className="text-blue-600 underline">{book.title}</div>
      <div>{book.status}</div>
      <div>
        <input
          type="number"
          className="border w-full p-1"
          value={book.concurrency}
          onChange={handleConcurrencyChange} // Update on change
        />
      </div>
    </div>
  );
};

export default BookRow;
