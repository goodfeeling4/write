"use client";
import { useState } from "react";

export default function Page(prams) {
  const [formData, setFormData] = useState({
    title: "",
    description: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

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
        setMessage("Message created successfully!");
        setFormData({ title: "", description: "" });
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.error || "Failed to create message"}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setMessage("Error: Failed to submit form");
    } finally {
      setIsSubmitting(false);
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
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:w-[50vw] sm:h-[80vh] w-[90vw] h-[80vh] ">
          <label className="flex flex-col">
            <span className="text-sm font-medium">Title</span>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter title"
              className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </label>

          <label className="flex flex-col">
            <span className="text-sm font-medium">Content</span>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Write your content here..."
              className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 h-40"
              required
            ></textarea>
          </label>

          {message && (
            <div className={`p-2 rounded ${message.includes("Error") ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-500 text-white rounded p-2 hover:bg-blue-600 transition-colors disabled:bg-gray-400"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>

      </div>
    </div>
  );
}