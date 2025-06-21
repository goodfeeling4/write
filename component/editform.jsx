"use client";
import Link from "next/link";
import { useState } from "react";

export default function Editform( {id, oldTitle, oldDescription} ) {
    
    console.log(id);
    console.log(oldTitle);
    console.log(oldDescription);
  const [formData, setFormData] = useState({
    title: oldTitle,
    description: oldDescription
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const [message, setMessage] = useState("");
  const [goToAllThoughts, setGoToAllThoughts] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    setMessage("");

    try {
      const response = await fetch(`/api/message/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage("thoughts updated successfully!");
        setFormData({ title: "", description: "" });
        
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.error || "Failed to update thoughts"}`);
      }
    } catch (error) {
      console.error("Error Updating thoughts:", error);
      setMessage("Error: Failed to submit form");
    } finally {
      setIsUpdating(false);
      setGoToAllThoughts(true);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  return (
    <div>
      <div className="h-[85vh] overflow-auto flex flex-col items-center justify-center dark:bg-[#111827] bg-blue-300  p-4">

        <form onSubmit={handleSubmit} className="flex flex-col dark:text-[#cc9ccc] text-[1.3rem] gap-4 sm:w-[50vw] w-[90vw]">
          <label className="flex flex-col ">
            <span className="font-medium">Title</span>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter title"
              className="border  border-gray-500 dark:border-gray-300  text-blue-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </label>

          <label className="flex flex-col">
            <span className=" font-medium">Content</span>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder={"Write your thoughts here...\nand every one can see it \nevery one can ADD their thoughts \nand also DELETE their thoughts"}
              className="border text-blue-600 border-gray-500 dark:border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 h-40"
              required
            ></textarea>
          </label>

          {message && (
            <div className={`rounded ${message.includes("Error") ? " text-red-700" : "text-green-700"}`}>
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={isUpdating}
            className="bg-blue-500 text-white rounded p-2 hover:bg-blue-600 transition-colors disabled:bg-gray-400"
          >
            {isUpdating ? "updating...your valuable thoughts" : "update your thoughts"}
          </button>
        </form>

        {goToAllThoughts ? 
          <Link href="/allThoughts" className=" m-2 p-2 w-2xs  rounded-l-full flex justify-center items-center bg-blue-300 text-blue-700 border-b-2 border-white ">
            go to all thoughts 
          </Link> : null}

      </div>
    </div>
  );
}