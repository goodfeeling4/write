import React from "react";
import Deletebtn from "@/component/deletebtn";
import Link from "next/link";


export default async function Page() {
  const getThoughts = async () => {
    try {
      const res = await fetch(`${process.env.PORT_WRITE || "http://localhost:3000"}/api/message`, {
        cache: "no-store",
      });
      if (!res.ok) {
        throw new Error("Failed to fetch thoughts");
      }
      const data = await res.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error("Error loading thoughts:", error);
      return [
        {
          title: "No messages found.",
          description: "No messages found.",
        }
      ];
    }
  }

  const thoughts = await getThoughts();

  return (
    <div className="static flex justify-center items-center  dark:bg-[#111827] bg-blue-300 w-full mx-auto">
      <div className="flex flex-col w-full  min-h-[90vh]">
        {thoughts.length === 0 ? (
          <div className="text-center text-gray-500 mt-8">No messages found.</div>
        ) : (thoughts.map((m) => (
          <div key={m._id || m.title} className="flex justify-between items-start sm:mx-[10vw] mx-[5vw] m-2 p-4 dark:bg-slate-800 bg-blue-500 dark:text-blue-200   rounded-md">

            <div className="flex-1 pr-4">
              <div>
                <h1 className="text-[1.2rem] dark:text-blue-400 text-black font-extrabold">{m.title}</h1>
                <div className="dark:text-gray-400 text-black">{m.description}</div>
              </div>
            </div>
            <div className="flex sm:gap-4 gap-2 items-start flex-shrink-0">
              <Deletebtn id={m._id} />
              <Link href={`/editThoughts/${m._id}`}>
                <div className="bg-gradient-to-r from-pink-800 to-blue-800 rounded-sm p-1">
                  <img width="30" height="30" src="https://img.icons8.com/ios-glyphs/30/create-new.png" alt="create-new" />
                </div>
              </Link>
            </div>
          </div>

        ))
        )}
        <div className="flex justify-center sticky bottom-0 items-center sm:gap-8 mb-[10vh] m-3 gap-2">
          <button className="bg-blue-900 rounded-l-full  text-white rounded p-2 px-4 hover:bg-blue-600 transition-colors mt-3 ">
            <a href="/">go to home</a>
          </button>
          <button className="bg-blue-700 rounded-r-full  text-white rounded p-2 px-4 hover:bg-blue-600 transition-colors mt-3 ">
            <a href="/addThoughts">add thoughts</a>
          </button>
        </div>
      </div>
    </div>
  );
}



