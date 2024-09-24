const BookTable = () => {
    const books = [
        { title: 'The Great Gatsby', concurrency: '5' },
        { title: '1984', concurrency: '10' },
        { title: 'To Kill a Mockingbird', concurrency: '3' },
        { title: 'The Catcher in the Rye', concurrency: '7' },
        { title: 'Pride and Prejudice', concurrency: '8' },
        { title: 'The Hobbit', concurrency: '6' },
        { title: 'Fahrenheit 451', concurrency: '4' },
        { title: 'Brave New World', concurrency: '9' },
        { title: 'Moby Dick', concurrency: '2' },
        { title: 'War and Peace', concurrency: '1' },
    ];

    return (
        <div className="w-full m-2 p-2 rounded-lg shadow-md bg-white">
            <table className="w-full border-collapse mt-2">
                <thead>
                    <tr>
                        <th className="px-4 py-2 bg-gray-200 text-gray-700 text-left">Book Title</th>
                        <th className="px-4 py-2 bg-gray-200 text-gray-700 text-left">Concurrency</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book, index) => (
                        <tr key={index} className="hover:bg-gray-100">
                            <td className="px-4 py-2 border-b border-gray-200 text-left">{book.title}</td>
                            <td className="px-4 py-2 border-b border-gray-200 text-left">{book.concurrency}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BookTable;
