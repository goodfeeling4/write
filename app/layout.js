import "./globals.css";


export const metadata = {
  title: "write",
  description: "write is a platform for writing and sharing your thoughts.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">

      <body
        className=""
      >
        <div className="flex h-[10vh] items-center justify-between sm:p-8 p-3 mb-0.5 dark:bg-[#111827] bg-blue-300">
          <div className="flex sm:gap-4 place-items-center sm:m-1" >
            <a href="/"><img src="https://29c2rwit2ctb68ey.public.blob.vercel-storage.com/write-fJBQtCpZLR2bOKuQpzfYLjFueTtPYQ.ico" alt="logo" className="sm:w-10 sm:h-10 w-8 h-8" /></a>
            <a href="/" className=" sm:text-3xl text-2xl text-blue-500 ">write</a>
          </div>

          <div className="flex sm:gap-4 gap-2">
            <button className="bg-blue-700 text-white rounded text-sm sm:p-2 p-1.5 px-3 hover:bg-blue-600 transition-colors ">
              <a href="/allThoughts">see all thoughts</a>
            </button>
            <button className="bg-blue-500 text-white rounded text-sm sm:p-2 p-1.5 px-3 hover:bg-blue-600 transition-colors ">
              <a href="/addThoughts">Add thoughts</a>
            </button>
          </div>
        </div>

        {children}
      </body>
    </html>
  );
}
