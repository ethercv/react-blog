import PostItem from './PostItem';
import PostEditForm from './PostEditForm';
import Heading from './Heading';
import { PostListProps } from '../types';
import '../App.css';

const PostList: React.FC<PostListProps> = ({
  posts,
  onDelete,
  editingPost,
  onEditClick,
  onSave,
}) => {
  return (
    <div className="feed">
      <Heading text="Лента" />
      {posts.length === 0 ? (
        <p className="empty-feed">Тут пока пусто...</p>
      ) : (
        posts.map((post) =>
          editingPost === post.id ? (
            <PostEditForm
              key={post.id}
              post={post}
              onSave={onSave}
              onCancel={() => onEditClick(null)}
            />
          ) : (
            <PostItem
              key={post.id}
              post={post}
              onDelete={onDelete}
              onEditClick={() => onEditClick(post.id)}
            />
          )
        )
      )}
    </div>
  );
};

export default PostList;
