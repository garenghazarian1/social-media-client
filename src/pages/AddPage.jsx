import Home from "./Home";
import { usePostContext } from "../context/postContext.jsx";
import { useAuthContext } from "../context/authProvider.jsx";

export default function PostForm() {

const {handleSubmit, handleTitle, handleContent, handleDate, title, content, date, handleImageSelection, image, handleCancel,   } = usePostContext()
const {user} = useAuthContext ()
console.log("user", user)
    return (
        <>
            <div className="mt-4 max-w-lg mx-auto p-6 bg-white shadow-lg rounded-2xl">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                    <h4 className="text-md font-semibold text-gray-800 py-1 px-2 bg-gray-100 rounded-lg shadow">
  What is on your mind <span className="text-lg inline-block bg-gray-700 text-white p-1 rounded align-middle"> {user?.name || 'Guest'}</span>?
</h4>
                        <label className="block text-lg font-bold text-gray-800 mb-2" htmlFor="title">Title</label>
                        <input type="text" name="title" placeholder="To do title" className="w-full py-2 px-3 border border-gray-300 rounded-full text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        onChange={handleTitle}
                        value={title} />
                    </div>
    
                    <div>
                        <label className="block text-lg font-bold text-gray-800 mb-2" htmlFor="content"> Content</label>
                            <textarea
                                placeholder="Content here"
                                name="content"
                                rows="4"
                                className=" w-full py-2 px-3 border border-gray-300 rounded-full text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                onChange={handleContent}
                                value={content}
                            ></textarea>
                    </div>
    
                    <div>
                        <label className="block text-lg font-bold text-gray-800 mb-2" htmlFor="author">Deadline</label>
                        <input type="text" placeholder="date and time " name="Date" className="w-full py-2 px-3 border border-gray-300 rounded-full text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        onChange={handleDate}
                        value={date}></input> 
                    </div>

                    <div>
                        <label className="bg-blue-300 hover:bg-blue-800 text-white font-bold py-2 px-6 rounded-full focus:outline-none focus:shadow-outline transition duration-300 inline-flex items-center cursor-pointer">Add image
                        <input hidden name="image" type="file" accept="image/*"  onChange={handleImageSelection} />
                        </label>

                        <img src={image && URL.createObjectURL(image)} />
                    </div>

                    <div className="flex justify-center gap-4">
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full focus:outline-none focus:shadow-outline transition duration-300">
                            Submit
                        </button>

                        <button
                                type="button" // Important to have type="button" so it doesn't submit the form
                                className="  bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-full focus:outline-none focus:shadow-outline transition duration-300"
                                onClick={handleCancel}>
                                Cancel
                        </button>
                    </div>
                </form>
           
            </div>
         <Home/>
        </>
    );
}    



