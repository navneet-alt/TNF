import React from 'react';

const TableHeader = () => {
  return (
    <div className="grid grid-cols-6 gap-4 p-4 border-b border-gray-300 bg-gray-100">
      <div className="col-span-2 font-semibold">Book Title</div>
      <div className="font-semibold">Published</div>
      <div className="font-semibold">Concurrency</div>
    </div>
  );
};

export default TableHeader;
