import PostsComponent from "../CreatePost";
import PostItemComponent from "../PostItem";
import "./index.css";

const PostDisplayComponent = () => {
  return (
    <div className="PostMainCl">
      <div className="PostformDiv">
        <PostsComponent />
      </div>

      <div className="PostCarts">
        <PostItemComponent />
      </div>
    </div>
  );
};

export default PostDisplayComponent;
