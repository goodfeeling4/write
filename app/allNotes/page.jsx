import React from "react";

async function getThoughts() {
  try {
    const res = await fetch(`${process.env.PORT_WRITE || ""}/api/message`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch thoughts");
    }
    return res.json();
  } catch (error) {
    console.error("Error loading thoughts:", error);
    return [];
  }
}

export default async function Page() {
  const thoughts = await getThoughts();

  return (
    <div className="flex flex-col gap-2">
      {thoughts.length === 0 ? (
        <div className="text-center text-gray-500 mt-8">No messages found.</div>
      ) : (
        thoughts.map((m) => (
          <div
            key={m._id || m.title}
            className="flex justify-around mx-[10vw] m-2 p-2 dark:bg-gray-700 bg-gray-300 dark:text-blue-200 rounded-md"
          >
            <div>
              <h1 className="text-[1.2rem] text-shadow-blue-500 font-extrabold">{m.title}</h1>
              <div>{m.description}</div>
            </div>
            <div className="flex gap-8 ">
              <button>edit</button>
              <button>delete</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}



