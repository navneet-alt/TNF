import React from "react";

const Modal = ({ isOpen, onClose, onSave, value, setValue }) => {
  if (!isOpen) return null;

  const handleSave = () => {
    onSave(value);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-md shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Bulk Edit Concurrency</h2>
        <input
          type="number"
          className="border p-2 w-full rounded-md mb-4"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter new concurrency value"
        />
        <div className="flex justify-end space-x-2">
          <button
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
