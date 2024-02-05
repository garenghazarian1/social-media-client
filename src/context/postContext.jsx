import {createContext, useContext,  useState, useEffect } from "react";
import axios from "axios"; 
import {baseUrl} from "../config/api"
import { useAuthContext } from "./authProvider";

const PostContext = createContext(null);
export const usePostContext = () => useContext(PostContext);

const PostContextProvider = ({ children }) => {



//Home state
const [posts, setPosts] = useState([]);
//add Page state
const [title, setTitle] = useState("");
const [date, setDate] = useState("");
const [content, setContent] = useState("");
const [image, setImage] = useState();



const {user} = useAuthContext ()
//console.log("user one",user) //user._id is from here
const handleTitle = (e)=>{setTitle(e.target.value)}
const handleContent = (e)=>{setContent(e.target.value)}
const handleDate = (e)=>{setDate(e.target.value)}

 //Home Page********************************************
  useEffect(() => { async function getData() {
      try {const response = await axios.get(`${baseUrl}/posts/get/all`);

        const data = response.data;
        //console.log("🚀 ~ data one:", data);

        if (data.success) {
          setPosts(data.posts);
        }
      } catch (error) { console.error("Error fetching data:", error);}
    };
    getData();
  }, []);

  // Add Page***************************************************
  const handleSubmit = async (e) => {

    e.preventDefault();
    try {

      const formData = new FormData();
      formData.append('nameId', user._id);
      formData.append('title', title);
      formData.append('content', content);
      formData.append('date', date);
      if (image) { // Assuming 'image' is a file object
        formData.append('image', image);
    }
      // Print FormData contents in console for debugging
      for (let item of formData.entries()) {
        //console.log(item[0] + ': ', item[1]);
    }

    const response = await axios.post(`${baseUrl}/posts/add`, formData);
   // console.log("response1", response)
//, {headers: {'Content-Type': 'multipart/form-data'}}
      if (response.data.success) {
        setPosts(prevPosts => [response.data.post, ...prevPosts ]);
      }

      // Clearing the form fields after successful submission
      setTitle("");
      setContent("");
      setDate("");
      setImage("")
    } catch (error) {
      console.error("Error submitting post:", error);
    }
  };
 
 //add photo*******************************************************
 const handleImageSelection = async (e) =>{
 //console.log(e.currentTarget.files[0]);// get file information
 setImage(e.currentTarget.files[0]);
 
 }

 const resetForm = () => {setTitle("");
 setContent("");
 setDate("");
 setImage("")};

  // Function to handle the cancel action
  const handleCancel = () => {
    resetForm(); // This will reset the form fields
};

// delete post************************************************
const handleDelete = async (postId) => {
  try {
    const response = await axios.delete(`${baseUrl}/posts/delete/${postId}`);
    if (response.data.success) {
      setPosts(prevPosts => prevPosts.filter(post => post._id !== postId));
    }
  } catch (error) {
    console.error("Error deleting post:", error);
  }
};

 // HELPS FUNCTION TO FORMAT THE DATE
 const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric',hour: '2-digit', 
  minute: '2-digit', hour12: true };
  return new Date(dateString).toLocaleDateString(undefined, options);
};


const handleLike = async (postID, userID) => {
  try {
    const response = await axios.put(`${baseUrl}/posts/like`, { postID, userID });
    //console.log("🚀 ~ handleLike ~ response:", response);

    // Create a copy of the current posts array
    const updatedPosts = [...posts];
    
    // Find the index of the post that was liked/unliked
    const postIndex = updatedPosts.findIndex(post => post._id === postID);

    if (postIndex !== -1) {
      // Update the likes array for the specific post
      updatedPosts[postIndex].likes = response.data.post.likes;
    }

    // Update the state with the modified posts array
    setPosts(updatedPosts);

  } catch (error) {
    console.error("Error in handleLike:", error);
  }
};

 




    return (
        <PostContext.Provider value={{ posts, setPosts, handleSubmit, handleTitle, handleContent, handleDate, title, content, date, handleImageSelection, image, setImage, handleCancel, handleDelete, formatDate, handleLike }}>
          {children}
        </PostContext.Provider>);}

export default PostContextProvider;