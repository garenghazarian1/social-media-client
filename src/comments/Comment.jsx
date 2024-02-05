import React from 'react';
import axios from 'axios';
import { baseUrl } from '../config/api.js';
import { usePostContext } from "../context/postContext.jsx";

export default function Comment({ data = {
  text: "",
  commenter: {
    name: "",
    _id: "",
  },
  _id: "",
  postID: "",
}}) {
   //console.log("🚀 ~ Comment ~ data:", data)
   const {  } =  usePostContext();
  const handleEdit = () => {
    console.log('Edit clicked');
    // Add your edit logic here
  };

  const handleCommentDelete = async () => {
    console.log('Delete clicked');
    try {
      
      const response = await axios.patch(`${baseUrl}/comments/delete`,  { commentID: data._id, postID: data.postID });
      console.log(response.data); // Log or handle response data as needed
      
      // Optionally, trigger a UI update or state change to reflect the deletion
    } catch (error) {
      console.error("Error deleting comment:", error);
      // Handle the error appropriately (e.g., show an error message to the user)
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-lg shadow-md overflow-hidden my-5 border border-gray-300 hover:shadow-lg transition-shadow duration-300 ease-in-out">
      <h3 className='text-black'>{data.commenter.name}</h3>
      <div className="p-4">
        <textarea
          className="text-black w-full p-3 border border-gray-200 rounded-lg resize-none"
          value={data.text}
          readOnly
        ></textarea>
        <div className="flex justify-end space-x-2 mt-3">
          <button
            onClick={handleEdit}
            className="inline-flex items-center justify-center px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Edit
          </button>
          <button
            onClick={handleCommentDelete}
            className="inline-flex items-center justify-center px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
