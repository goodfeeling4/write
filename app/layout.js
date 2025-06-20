import "./globals.css";


export const metadata = {
  title: "write",
  description: "write is a platform for writing and sharing your thoughts.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">

      <body
        className="dark:bg-black"
      >
        <div className="flex  flex-around items-center justify-between ">
          <a href="/" className=" text-3xl text-[#004FFF] m-4">write</a>
          <button className="bg-blue-700 text-white rounded p-2 px-4 hover:bg-blue-600 transition-colors mt-3 ">
                <a href="/allNotes">see all thoughts</a>
            </button>
          <button className="bg-blue-500 text-white rounded p-2 hover:bg-blue-600 transition-colors m-4">
            <a href="/addTopic/123">Add thoughts</a>
          </button>
        </div>

        {children}
      </body>
    </html>
  );
}
