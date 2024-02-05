
import Post from "../components/Post";
import { usePostContext } from "../context/postContext.jsx";
import { useScrollContext } from '../context/scrollContext.jsx';

export default function Home() {

  const {posts, handleLike} =  usePostContext();
 
  const { showTopBtn, scrollToTop } = useScrollContext();

  return (
    <div className="flex flex-col  justify-center gap-4 mt-10 mx-auto">
        <div  className="min-w-[400px] mb-4 flex-shrink-0">
            {posts.map((item) => (
            <Post key={item._id} data={item} handleLike={handleLike}/>
            ))}
        </div>
            {showTopBtn && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-5 right-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                    title="Go to top"
                >
                    Top
                </button>
            )}
    </div>

);

}
