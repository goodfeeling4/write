"use client";
import React, { useState, useEffect } from "react";
import Deletebtn from "@/component/deletebtn";
import Link from "next/link";

export default function Page() {
  const [thoughts, setThoughts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true);

  const getThoughts = async (pageNum = 1) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/message`, { cache: "no-store" });
      if (!res.ok) {
        throw new Error("Failed to fetch thoughts");
      }
      const data = await res.json();
      console.log(data);

      if (pageNum === 1) {
        setThoughts(data.thoughts || data);
      } else {
        setThoughts(prev => [...prev, ...(data.thoughts || data)]);
      }

      // Check if there are more items
      if (data.thoughts && data.thoughts.length < 10) {
        setHasMore(false);
      }

      return data.toString();
    } catch (error) {
      console.error("Error loading thoughts:", error);
      if (pageNum === 1) {
        setThoughts([{
          title: "No messages found.",
          description: "No messages found.",
        }]);
      }
    } finally {
      setLoading(false);
      setInitialLoading(false);
    }
  }

  const loadMore = () => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      getThoughts(nextPage);
    }
  };

  useEffect(() => {
    getThoughts();
  }, []);

  if (initialLoading) {
    return (
      <div className="static flex justify-center items-center dark:bg-[#111827] bg-blue-300 w-full mx-auto min-h-[90vh]">
        <div className="text-center text-gray-500">Loading thoughts...</div>
      </div>
    );
  }

  return (
    <div className="static flex justify-center items-center dark:bg-[#111827] bg-blue-300 w-full mx-auto">
      <div className="flex flex-col w-full min-h-[90vh]">
        {thoughts.length === 0 ? (
          <div className="text-center text-gray-500 mt-8">No messages found.</div>
        ) : (
          thoughts.map((m) => (
            <div key={m._id || m.title} className="flex justify-between items-start sm:mx-[10vw] mx-[5vw] m-2 p-4 dark:bg-slate-800 bg-blue-500 dark:text-blue-200 rounded-md">
              <div className="flex-1 pr-4">
                <div>
                  <h1 className="text-[1.2rem] dark:text-blue-400 text-black font-extrabold">{m.title}</h1>
                  <div className="dark:text-gray-400 text-black">{m.description}</div>
                </div>
              </div>
              <div className="flex-col gap-2">
                <div className="flex sm:gap-4 gap-2 items-start flex-shrink-0">
                  <Deletebtn id={m._id} />
                  <Link href={`/editThoughts/${m._id}`}>
                    <div className="bg-gradient-to-r from-pink-800 to-blue-800 rounded-sm p-1">
                      <img width="30" height="30" src="https://img.icons8.com/ios-glyphs/30/create-new.png" alt="create-new" />
                    </div>
                  </Link>
                </div>
                <div className="flex-col gap-2">
                  <p className="text-gray-500 text-sm">
                    <b> created on</b> {m.createdAt.split("T")[0]}
                  </p>
                  {m.updatedAt.split("T")[0] === m.createdAt.split("T")[0] ? (
                    null
                  ) : (
                    <p className="text-gray-500 text-sm">
                      <b>updated on</b> {m.updatedAt.split("T")[0]}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))
        )}

        {/* Load More Button */}
        {hasMore && (
          <div className="flex justify-center mt-4">
            <button
              onClick={loadMore}
              disabled={loading}
              className="bg-blue-600 text-white rounded p-2 px-6 hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {loading ? "Loading..." : "Load More"}
            </button>
          </div>
        )}

        <div className="flex justify-center sticky bottom-0 items-center sm:gap-8 mb-[10vh] m-3 gap-2">
          <button className="bg-blue-900 rounded-l-full text-white rounded p-2 px-4 hover:bg-blue-600 transition-colors mt-3">
            <a href="/">go to home</a>
          </button>
          <button className="bg-blue-700 rounded-r-full text-white rounded p-2 px-4 hover:bg-blue-600 transition-colors mt-3">
            <a href="/addThoughts">add thoughts</a>
          </button>
        </div>
      </div>
    </div>
  );
}





