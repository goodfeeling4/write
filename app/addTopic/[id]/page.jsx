
export default function Page(prams) {
  
  
  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">

        <form className="flex flex-col gap-4 sm:w-[50vw] sm:h-[80vh] w-[90vw] h-[80vh] ">
          <label className="flex flex-col">
            <span className="text-sm font-medium">Title</span>
            <input
              type="text"
              placeholder="Enter title"
              className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>

          <label className="flex flex-col">
            <span className="text-sm font-medium">Content</span>
            <textarea
              placeholder="Write your content here..."
              className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 h-40"
            ></textarea>
          </label>

          <button
            type="submit"
            className="bg-blue-500 text-white rounded p-2 hover:bg-blue-600 transition-colors"
          >
            Submit
          </button>
        </form>

      </div>
      </div>
      );
}