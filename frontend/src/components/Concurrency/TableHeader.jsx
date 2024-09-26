

const TableHeader = () => {
  return (
    <div className="grid grid-cols-3 gap-4 bg-gray-200 p-2 font-semibold w-full">
      <div>BOOK TITLE</div>
      <div>PUBLISHED STATUS</div>
      <div>CONCURRENCY No. of People</div>
    </div>
  );
};

export default TableHeader;
