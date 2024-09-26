import  { createContext, useContext, useState } from 'react';

const BooksContext = createContext();

export const useBooks = () => {
  return useContext(BooksContext);
};

export const BooksProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  
  return (
    <BooksContext.Provider value={{ books, setBooks }}>
      {children}
    </BooksContext.Provider>
  );
};
