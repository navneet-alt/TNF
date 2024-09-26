import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios"; // Ensure axios is imported

export default function Home() {
  const navigate = useNavigate();
  const [licenses, setLicenses] = useState([]); // State to hold licenses

  const navigater = () => {
    navigate("/form");
  };

  

  // Fetch licenses on component mount
  useEffect(() => {
    const fetchLicenses = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/v1/licenses",);
        setLicenses(response.data); // Set the fetched licenses to state
      } catch (error) {
        console.error("Error fetching licenses:", error);
      }
    };

    fetchLicenses();
  }, []); // Empty dependency array to run only on mount

  const handleLicenseClick = (license) => {
    navigate('/entitlements', { state: license }); // Pass the specific license object
  };

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
              <th className="p-2 font-bold">LICENSE NUMBER</th> 
              <th className="p-2 font-bold">LICENSE NAME</th>
              <th className="p-2 font-bold">STATUS</th>
              <th className="p-2"></th>
            </tr>
          </thead>
          <tbody>
            {licenses.map((license) => (
              <tr key={license._id} className="border-b">
                <td className="p-2">{license.orderNumber}</td>
                <td className="p-2">
                  <button onClick={() => handleLicenseClick(license)} className="text-blue-500 hover:underline">
                    {license.licenseName}
                  </button>
                </td>
                <td className="p-2">{license.books.length > 0 ? "Active" : ""}</td> 
                <td className="p-2">
                  <FontAwesomeIcon icon={faEllipsis} />
                </td>
              </tr>
            ))}
            {/* Add more rows here if needed */}
          </tbody>
        </table>
      </div>
    </div>
  );
}
