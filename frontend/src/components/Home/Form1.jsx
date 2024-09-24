import { useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

const Form = () => {
  const [orderNumber, setOrderNumber] = useState("");
  const [licenseName, setLicenseName] = useState("");
  const [bundleName, setBundleName] = useState("");
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState("");
  const [suggestedBundles, setSuggestedBundles] = useState([]);
  const [filterType, setFilterType] = useState("all"); // "all", "normal", "premium"
  const [premiumBooksCount, setPremiumBooksCount] = useState(0);

  const handleSearch = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/v1/search-bundle", {
        bundle_name: bundleName,
        filter_type: filterType,
      });

      const fetchedBooks = response.data;

      // Set books
      setBooks(fetchedBooks);

      // Correctly count premium books based on `is_premium` flag
      const premiumCount = fetchedBooks.reduce((count, book) => {
        return book.is_premium ? count + 1 : count;
      }, 0);

      // Update premium book count
      setPremiumBooksCount(premiumCount);
    } catch (error) {
      console.error("Error while searching", error);
    }
  };

  const handleBundleNameChange = async (e) => {
    const value = e.target.value;
    setBundleName(value);

    // Only fetch suggestions if the length is 3 or more
    if (value.length >= 3) {
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/suggest-bundles?query=${value}`);
        setSuggestedBundles(response.data);
      } catch (error) {
        console.error("Error fetching suggestions", error);
      }
    } else {
      setSuggestedBundles([]); // Clear suggestions if less than 3 characters
    }
  };

  // Button click handler to set filter
  const handleFilterClick = (type) => {
    setFilterType(type);
    handleSearch();
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white shadow-md rounded-md">
      {/* Filter Buttons */}
      <div className="mt-4 flex gap-x-2 mb-3">
        <button
          className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-200"
          onClick={() => handleFilterClick("normal")}
        >
          Normal
        </button>
        <button
          className="bg-yellow-600 text-white py-2 px-4 rounded-md hover:bg-yellow-700 transition duration-200"
          onClick={() => handleFilterClick("premium")}
        >
          Premium
        </button>
      </div>

      {/* Order Number and License Name */}
      <div className="form-container">
        <label className="form-label block mb-2 text-sm font-medium text-gray-700" htmlFor="orderNumber">
          Order Number *
        </label>
        <input
          type="text"
          className="form-input block w-full p-2 mb-4 border rounded-md border-gray-300"
          id="orderNumber"
          placeholder="Enter Order Number"
          value={orderNumber}
          onChange={(e) => setOrderNumber(e.target.value)}
          required
        />

        <label className="form-label block mb-2 text-sm font-medium text-gray-700" htmlFor="licenseName">
          License Name *
        </label>
        <input
          type="text"
          className="form-input block w-full p-2 mb-4 border rounded-md border-gray-300"
          id="licenseName"
          placeholder="Enter License Name"
          value={licenseName}
          onChange={(e) => setLicenseName(e.target.value)}
          required
        />
      </div>

      {/* Search by Bundle Name */}
      <div className="form-container mt-4">
        <label className="form-label block mb-2 text-sm font-medium text-gray-700" htmlFor="bundleName">
          Bundle Name *
        </label>
        <input
          type="text"
          className="form-input block w-full p-2 mb-4 border rounded-md border-gray-300"
          id="bundleName"
          placeholder="Enter Bundle Name"
          value={bundleName}
          onChange={handleBundleNameChange}
          required
        />

        {/* Bundle suggestions dropdown */}
        {suggestedBundles.length > 0 && (
          <ul className="bg-white border border-gray-300 mt-2 rounded-md shadow-sm">
            {suggestedBundles.map((bundle, index) => (
              <li
                key={index}
                className="p-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => {
                  setBundleName(bundle.bundle_name);
                  setSuggestedBundles([]); // Clear suggestions after selection
                }}
              >
                {bundle.bundle_name}
              </li>
            ))}
          </ul>
        )}

        <button
          type="button"
          className="search-button w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-200 mt-4"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      {/* Policies Section */}
      <div className="policies mt-6">
        <div>
          <p>{premiumBooksCount} titles are {bundleName ? bundleName : "Bundle"} protected. Please review/edit the titles</p>
        </div>
        <div className="extra-info mt-2">
          <div className="info-item flex justify-between">
            <p className="font-semibold">CONCURRENCY</p>
            <p>1</p>
          </div>
          <div className="info-item flex justify-between">
            <p className="font-semibold">PRINT/COPY</p>
            <p>{books.length}</p> {/* Total number of books in the bundle */}
          </div>
          <li className="mt-3">
            <NavLink to="/concurrency" className="text-blue-500 hover:underline">
              View/Edit concurrency per title
            </NavLink>
          </li>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <button className="search-button bg-blue-600 text-white font-semibold py-2 px-5 rounded-md hover:bg-blue-700 transition duration-200 mt-4">
          Save
        </button>
      </div>
    </div>
  );
};

export default Form;
