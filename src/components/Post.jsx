import { useState , useEffect } from "react";
import { usePostContext } from "../context/postContext.jsx";
import { useAuthContext } from "../context/authProvider";
import{Trash2} from 'lucide-react';
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import Comment from "../comments/Comment.jsx";
import CommentAdd from "../comments/CommentAdd.jsx";


export default function Post({ data = {
    _id : '',
    title : '',
    date : '',
    content : '',
    image : '',
    likes : [],
    comments : [],
    nameId : { _id: '', name: '', createdAt: '' 

  },

} }) {
    //console.log("data", data)
    const { user = {username: "",_id: ""} } = useAuthContext();
    //console.log("🚀user:", user)
    const { handleDelete, formatDate, handleLike } =  usePostContext();
   
// Local state to track the likes count
const [likesCount, setLikesCount] = useState(data.likes.length);
        
useEffect(() => {
    setLikesCount(data.likes.length);
}, [data.likes]);


    return (
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg overflow-hidden md:max-w-2xl my-5 border border-gray-300 hover:shadow-2xl transition-shadow duration-300">
        <div className="p-8">
                <h4 className="text-lg font-semibold text-gray-800 py-2 px-4 text-center bg-gray-100 rounded-lg shadow">Author: {data?.nameId?.name}</h4>
                <h3 className="block mt-1 text-xl leading-tight font-bold text-black hover:text-blue-500">
                    {data.title}
                </h3>
                <p className="mt-2 text-gray-700">
                    Details: {data.content}
                </p>
                <h4 className="mt-2 text-gray-600 font-semibold">
                    Deadline: {data.date}
                </h4>
                <h4 className="mt-2 text-gray-600 font-semibold">
                    Date: {formatDate(data?.nameId.createdAt)}
                </h4>
                
                {data.image ? <img src={data.image} alt="Uploaded Content" /> : null}
            <div className="flex items-center justify-start gap-4">
                
                        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded m-4 w-16 "
                                onClick={() => handleDelete(data._id)} >
                            <Trash2 />  
                        </button>
                

                { !user ?  null :
                    data.likes.includes(user._id)? 
                    <div className="flex items-center justify-center space-x-2">
                    <AiFillLike
                      style={{ fontSize: '36px' }} className="text-blue-500 cursor-pointer hover:text-blue-600 transition-colors duration-150 ease-in-out"
                      onClick={() => handleLike(data._id, user._id)}/>
                    <p className="text-lg font-medium text-gray-800">{likesCount}</p>
                  </div>

                   : <div className="flex items-center justify-center space-x-2">
                   <AiOutlineLike style={{ fontSize: '36px' }} className="text-blue-500 cursor-pointer hover:text-blue-600 transition-colors duration-150 ease-in-out"
                   onClick={() => handleLike(data._id, user._id)}/>
                   <p className="text-lg font-medium text-gray-800">{likesCount}</p>
                   </div>
                }
            </div>
            <div>
                {data.comments.map((item)=>(<Comment key={item._id} data={item} postID={data._id} />))}
                <CommentAdd postID={data._id} userID={user?._id}/>
            </div>
        </div>
    </div>
    );
};
