import React from "react";

const BookRow = ({ book, onUpdateConcurrency }) => {
  const handleConcurrencyChange = (event) => {
    const newConcurrency = Number(event.target.value);
    if (!isNaN(newConcurrency) && newConcurrency >= 0) {
      onUpdateConcurrency(newConcurrency); // Update the concurrency
    }
  };

  const handleKeyPress = (event) => {
    const key = event.which || event.keyCode;
    if (key < 48 || key > 57) {
      event.preventDefault();
    }
  };

  return (
    <div className="grid grid-cols-3 gap-4 items-center border-b py-2 w-full">
      <div className="text-blue-600 underline">{book.book_name}</div>
      <div>{book.is_premium ? "Premium" : "Standard"}</div>
      <div>
        <input
          type="text" // Change to text for better control over keypress
          className="border w-full p-1"
          value={book.concurrency}
          onChange={handleConcurrencyChange}
          onKeyPress={handleKeyPress} // Add key press handler
        />
      </div>
    </div>
  );
};

export default BookRow;
