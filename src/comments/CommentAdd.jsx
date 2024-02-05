import { useState } from "react";
import {baseUrl}  from '../config/api.js'
import axios  from 'axios'
import { usePostContext } from "../context/postContext.jsx";


export default function CommentAdd  ({postID="", userID=""})  {
  // const {data} =  usePostContext();
  // console.log("🚀 ~ CommentAdd ~ posts:", data)
const [comment, setComment] = useState('');

const {posts, setPosts } =  usePostContext();

const handleSubmit = async (e) => {
  e.preventDefault();
  let response; // Declare response outside the try block to use it later

  if (comment === '') {
      alert("Please enter a comment");
  } else {
      try {
          // Attempt to submit the comment
          response = await axios.post(`${baseUrl}/comments/add`, { comment, postID, userID });
      } catch (error) {
          console.error("Error submitting comment:", error);
          // Handle the error appropriately (e.g., show an error message to the user)
          return; // Exit the function if an error occurs
      }

      // Check the response after the try-catch block
      if (response && response.data.success) {
          const oldPosts = [...posts];
          const id = oldPosts.findIndex((item) => item._id === postID);
          if (id !== -1) { // Ensure the post was found before updating
              oldPosts[id].comments = [...response.data.post.comments];
              setPosts(oldPosts); // Update the posts state
          }

          setComment(''); // Clear the comment input field
      }
  }
};

  return (
    <form  className="mt-4"
    onSubmit={handleSubmit}>
      <div className="flex items-center space-x-3">
        <input
          type="text"
          value={comment}
          placeholder="Leave a comment..."
          onChange={(e) => setComment(e.target.value)}
          className="text-black w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-4 py-2 text-white bg-blue-500 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Post
        </button>
      </div>
    </form>
  );
};


