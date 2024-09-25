import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const [orderNumber, setOrderNumber] = useState("");
  const [licenseName, setLicenseName] = useState("");
  const [bundleName, setBundleName] = useState("");
  const [books, setBooks] = useState([]); // All fetched books
  const [filteredBooks, setFilteredBooks] = useState([]); // Books based on filter
  const [suggestedBundles, setSuggestedBundles] = useState([]);
  const [filterType, setFilterType] = useState(null); // Initially no filter
  const [premiumBooksCount, setPremiumBooksCount] = useState(0);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearchDone, setIsSearchDone] = useState(false); // New state to check if search is done

  // New state variable to store concurrency values of premium books
  const [concurrencyValues, setConcurrencyValues] = useState({});

  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/v1/search-bundle", {
        bundle_name: bundleName,
      });

      const fetchedBooks = response.data;
      setBooks(fetchedBooks); // Store all fetched books
      setFilteredBooks(fetchedBooks); // Initialize filtered books with fetched books

      const premiumCount = fetchedBooks.reduce((count, book) => {
        return book.is_premium ? count + 1 : count;
      }, 0);
      setPremiumBooksCount(premiumCount);
      setIsSearchDone(true); // Mark that the search has been done

      // Initialize concurrency values for premium books
      const initialConcurrency = {};
      fetchedBooks.forEach(book => {
        if (book.is_premium) {
          initialConcurrency[book.book_id] = 1; // Default concurrency value
        }
      });
      setConcurrencyValues(initialConcurrency); // Set the initial concurrency values
    } catch (error) {
      console.error("Error while searching", error);
    }
  };

  const filterBooks = (filterType) => {
    let filtered;
    if (filterType === "normal") {
      filtered = books.filter((book) => !book.is_premium);
    } else if (filterType === "premium") {
      filtered = books.filter((book) => book.is_premium || !book.is_premium);
    } else {
      filtered = books;
    }
    setFilteredBooks(filtered); // Update filtered books state
  };

  const handleSave = () => {
    if (!orderNumber || !licenseName) {
      alert("Please fill in all required fields: Order Number and License Name.");
      return;
    }

    console.log("Form saved with:", { orderNumber, licenseName, bundleName, filteredBooks, concurrencyValues });
  };

  const handleBundleNameChange = async (e) => {
    const value = e.target.value;
    setBundleName(value);

    if (value.length >= 1) { // Trigger suggestions if input has 1 or more characters
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/suggest-bundles?query=${value}`);
        setSuggestedBundles(response.data);
        setShowSuggestions(true);
      } catch (error) {
        console.error("Error fetching suggestions", error);
      }
    } else {
      setSuggestedBundles([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setBundleName(suggestion.bundle_name);
    setShowSuggestions(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setActiveSuggestionIndex((prevIndex) =>
        prevIndex === suggestedBundles.length - 1 ? 0 : prevIndex + 1
      );
    } else if (e.key === "ArrowUp") {
      setActiveSuggestionIndex((prevIndex) =>
        prevIndex === 0 ? suggestedBundles.length - 1 : prevIndex - 1
      );
    } else if (e.key === "Enter" && showSuggestions) {
      setBundleName(suggestedBundles[activeSuggestionIndex].bundle_name);
      setShowSuggestions(false);
      e.preventDefault();
    }
  };

  const handleFilterClick = (type) => {
    setFilterType(type);
    filterBooks(type); // Filter books when a filter type is selected
  };

  const handleViewEditConcurrency = () => {
    if (filterType === "premium" && premiumBooksCount > 0) {
      navigate("/concurrency", { state: { books: filteredBooks, concurrencyValues, bundle_name: bundleName } });
    }
  };

  const handleConcurrencyChange = (bookId, value) => {
    setConcurrencyValues((prevValues) => ({
      ...prevValues,
      [bookId]: value, // Update concurrency for specific book
    }));
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white shadow-md rounded-md">
      <div className="form-container">
        <label className="form-label block mb-2 text-sm font-medium text-gray-700" htmlFor="orderNumber">
          Order Number <span className="text-red-500">*</span>
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
          License Name <span className="text-red-500">*</span>
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

      <div className="relative">
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
          onKeyDown={handleKeyDown}
          required
        />
        {showSuggestions && suggestedBundles.length > 0 && (
          <ul className="absolute z-10 bg-white border w-full rounded-md shadow-lg max-h-48 overflow-y-auto">
            {suggestedBundles.map((bundle, index) => (
              <li
                key={index}
                className={`p-2 cursor-pointer ${index === activeSuggestionIndex ? "bg-gray-200" : "bg-white"}`}
                onClick={() => handleSuggestionClick(bundle)}
              >
                {bundle.bundle_name}
              </li>
            ))}
          </ul>
        )}
      </div>

      <button
        type="button"
        className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-200 mt-4"
        onClick={handleSearch}
      >
        Search
      </button>

      {isSearchDone && (
        <div className="mt-4 flex gap-x-2 mb-3">
          <button
            className={`py-2 px-4 rounded-md transition duration-200 ${
              filterType === "normal" ? "bg-green-600 text-white" : "bg-gray-200"
            }`}
            onClick={() => handleFilterClick("normal")}
          >
            Normal
          </button>
          <button
            className={`py-2 px-4 rounded-md transition duration-200 ${
              filterType === "premium" ? "bg-yellow-600 text-white" : "bg-gray-200"
            }`}
            onClick={() => handleFilterClick("premium")}
          >
            Premium
          </button>
        </div>
      )}

      {filterType && (
        <div className="policies mt-6 bg-blue-100 p-5 rounded-lg">
          {filterType === "premium" && (
            <div>
              <p>{premiumBooksCount} titles are protected. Please review/edit the titles</p>
            </div>
          )}
          <div className="extra-info mt-2">
            <div className="info-item flex justify-between">
              <p className="font-semibold">CONCURRENCY</p>
              <p>{filterType === "normal" ? "N/A" : "1"}</p> {/* Show N/A for normal filter */}
            </div>
            <div className="info-item flex justify-between">
              <p className="font-semibold">PRINT/COPY</p>
              <p>{filteredBooks.length}</p>
            </div>
            <div className="flex justify-center text-blue-900">
            {filterType === "premium" && (
              <button onClick={handleViewEditConcurrency} className="underline">
                View/Edit the Concurrency
              </button>
          )}
             
            </div>
          </div>
        </div>
      )}

      

      <button
        type="button"
        className="w-full bg-green-600 text-white font-semibold py-2 rounded-md hover:bg-green-700 transition duration-200 mt-4"
        onClick={handleSave}
      >
        Save
      </button>
    </div>
  );
};

export default Form;
