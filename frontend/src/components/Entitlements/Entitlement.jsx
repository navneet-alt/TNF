import SearchBar from './SearchBar'
import BookTable from './BookTable'
function Entitlement() {
  return (
    <div>
      <div>
      <h3 className="text-2xl font-bold text-gray-800 mb-4">ENTITLEMENTS</h3>
        <div className="flex justify-between items-center container mx-auto p-4">
            <SearchBar className="flex-1 mr-4" /> {/* Add margin to the right for spacing */}
            <button className="px-4 py-2 border-2 border-blue-500 bg-blue-500 text-white font-bold cursor-pointer rounded-md hover:bg-blue-600 transition">
                Request As CSV
            </button>
        </div>
        <div>
          <BookTable/>
        </div>
        <div className='footer flex justify-center items-center p-4'> 
          <button className="px-4 py-2 m-4 border-2 border-blue-500 bg-blue-500 text-white font-bold cursor-pointer rounded-md hover:bg-blue-600 transition">LOAD MORE</button>
          <button className="px-4 py-2 m-4 border-2 border-blue-500 bg-blue-500 text-white font-bold cursor-pointer rounded-md hover:bg-blue-600 transition">BACK TO TOP</button>
        </div>
      </div>
    </div>
  )
}

export default Entitlement
