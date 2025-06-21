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
    <div className="flex flex-col gap-2">
      {thoughts.length === 0 ? (
        <div className="text-center text-gray-500 mt-8">No messages found.</div>
      ) : (thoughts.map((m) => (
        <div key={m._id || m.title} className="flex justify-between sm:mx-[10vw] mx-[5vw] m-2 p-4 dark:bg-gray-700 bg-gray-300 dark:text-blue-200 rounded-md ">

          <div>
            <div>
              <h1 className="text-[1.2rem] text-shadow-blue-500 font-extrabold">{m.title}</h1>
              <div>{m.description}</div>
            </div>
          </div>
          <div className="flex sm:gap-8 gap-2 items-center ">
            <Deletebtn id={m._id} />
            <Link href={`/editThoughts/${m._id}`}>
              <div className=" bg-linear-60 from-pink-800 to-blue-800 rounded-sm">
                <img width="35" height="35" className="p-1  " src="https://img.icons8.com/3d-fluency/94/edit.png" alt="edit" />
              </div>
            </Link>
          </div>

        </div>

      ))
      )}

    </div>
  );
}



