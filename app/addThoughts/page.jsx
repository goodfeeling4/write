"use client";
import { useState } from "react";
import Link from "next/link";

export default function Page() {
  const [formData, setFormData] = useState({
    title: "",
    description: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [goToAllThoughts, setGoToAllThoughts] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      const response = await fetch("/api/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage("thoughts added successfully!");
        setFormData({ title: "", description: "" });
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.error || "Failed to add thoughts"}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setMessage("Error: Failed to submit form");
    } finally {
      setIsSubmitting(false);
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
      <div className="flex flex-col items-center  dark:bg-[#111827] bg-blue-300 h-[84vh] overflow-hidden p-4">

        <form onSubmit={handleSubmit} className="flex flex-col dark:text-[#cc9ccc] text-[1.3rem] gap-1 sm:w-[50vw]  w-[90vw] ">
          <label className="flex flex-col ">
            <span className="font-medium">Title</span>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter thoughts title"
              className="border text-blue-600 placeholder:text-gray-400 dark:placeholder:text-gray-800 border-gray-500 dark:border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </label>

          <label className="flex flex-col">
            <span className=" font-medium">Content</span>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder={"Write your thoughts here...\nand every one can see it \nevery one can ADD, EDIT and DELETE their thoughts"}
              className="border text-blue-600 placeholder:text-gray-400 dark:placeholder:text-gray-800  border-gray-500 dark:border-gray-300  rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 h-40"
              required
            ></textarea>
          </label>

          {message && (
            <div className={` rounded ${message.includes("Error") ? " text-red-700" : " text-green-700"}`}>
              {message}
            </div>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-500  text-white rounded p-2 hover:bg-blue-600 transition-colors disabled:bg-gray-400"
          >
            {isSubmitting ? "Adding...your valuable thoughts" : "Add your thoughts"}
          </button>
        </form>
        {goToAllThoughts ? 
          <Link href="/allThoughts" className=" m-2 p-2 w-2xs  rounded-l-full flex justify-center items-center dark:bg-blue-300 bg-blue-500 text-blue-700 border-b-2 border-white ">
            go to all thoughts 
          </Link> : null}
      </div>
    </div>
  );
}