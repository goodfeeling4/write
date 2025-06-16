import "./globals.css";


export const metadata = {
  title: "write",
  description: "write is a platform for writing and sharing your thoughts.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">

      <body 
      >
        <div className="flex flex-around items-center justify-between ">
              <h1 className=" text-3xl text-[#004FFF] m-4">write</h1>
              <button className="bg-blue-500 text-white rounded p-2 hover:bg-blue-600 transition-colors m-4">
        <a href="/addTopic/123">Add Topic</a>
      </button>
        </div>

        {children}
      </body>
    </html>
  );
}
