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
        <div className="flex  flex-around items-center justify-between sm:m-4 m-3">
          <a href="/" className=" sm:text-3xl text-2xl text-[#004FFF] ">write</a>
          <button className="bg-blue-700 text-white rounded text-sm sm:p-2 p-1.5 px-3 hover:bg-blue-600 transition-colors ">
                <a href="/allThoughts">see all thoughts</a>
            </button>
          <button className="bg-blue-500 text-white rounded text-sm sm:p-2 p-1.5 px-3 hover:bg-blue-600 transition-colors ">
            <a href="/addThoughts">Add thoughts</a>
          </button>
        </div>

        {children}
      </body>
    </html>
  );
}
