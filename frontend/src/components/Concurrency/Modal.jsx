import React from "react";

const Modal = ({ isOpen, onClose, onSave, value, setValue }) => {
  if (!isOpen) return null;

  const handleSave = () => {
    onSave(value);
    onClose();
  };

  const handleChange = (e) => {
    const newValue = e.target.value > 0 ? Math.max(1, parseInt(e.target.value)) : alert('You cannot set concurrency below 1');
    setValue(newValue);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="mb-4">Please enter a concurrency value for all titles</h2>
        <input
          type="number"
          value={value}
          onChange={handleChange}
          className="border w-full p-2 mb-4"
          min="1" 
          step="1"
        />
        <div className="flex justify-end">
          <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2" onClick={handleSave}>
            Save
          </button>
          <button className="bg-gray-300 px-4 py-2 rounded" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
