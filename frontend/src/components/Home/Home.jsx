import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const navigater = () => {
    navigate("/form");
  }
  return (
    <div>
      <div>
        <p className="text-2xl font-bold text-center my-4 text-gray-800">Book Renter</p>
      </div>
      <div className="p-4 max-w-6xl mx-auto bg-gray-100 rounded-lg shadow-lg">
        <span className="block text-lg mb-4 font-bold text-gray-600">Book Licenses</span>
        <div className="flex justify-end mb-4 space-x-2">
          <button onClick={navigater} className="bg-blue-500 text-white py-2 px-4 text-sm rounded hover:bg-blue-700 transition-colors">CREATE NEW</button>
          <button className="bg-blue-500 text-white py-2 px-4 text-sm rounded hover:bg-blue-700 transition-colors">DOWNLOAD AS CSV</button>
        </div>
        <table className="table-auto w-full bg-white rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-2 font-bold">ORDER NO.</th>
              <th className="p-2 font-bold">LICENSE NAME</th>
              <th className="p-2 font-bold">STATUS</th>
              <th className="p-2"></th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <h1>row data</h1>
            </tr>
            {/* Add more rows here */}
          </tbody>
        </table>
      </div>
    </div>
  );
}
