
export default function Page() {
  
  
  return (
    <div>
      {/* <Listname />  */}
      <div className="flex flex-col items-center justify-center min-h-screen dark:bg-[#111827] bg-blue-300 p-4">
            <h1 className="text-3xl text-blue-500 mb-4">Welcome to write</h1>
            <p className="text-lg dark:invert text-gray-700 text-center mb-6">A platform for writing and sharing your thoughts.</p>
            <button className="bg-blue-500 text-white rounded p-2 hover:bg-blue-600 transition-colors">
                <a href="/addThoughts">Add thoughts</a>

            </button>
            <button className="bg-blue-700 text-white rounded p-2 px-4 hover:bg-blue-600 transition-colors mt-3 ">
                <a href="/allThoughts">see all thoughts</a>
            </button>
        </div>
      </div>
      );
}