import { Link } from "react-router-dom";


const HeaderButtons = () => {
  return (
    <div className="flex items-center">
      <button className="bg-blue-500 text-white px-4 py-2 rounded">SAVE</button>
      <Link to='/form'> <button className="ml-2 border px-4 py-2 rounded">BACK</button> </Link> 
    </div>
  );
};

export default HeaderButtons;
