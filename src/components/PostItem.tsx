import { PostItemProps } from '../types';
import '../App.css';

const PostItem: React.FC<PostItemProps> = ({ post, onDelete, onEditClick }) => {
  return (
    <div className="post">
      <p className="post-date">{post.date || 'Дата неизвестна'}</p>
      <div className="post-actions">
        <button onClick={() => onEditClick(post)}>✏️</button>
        <button onClick={() => onDelete(post.id)}>🗑️</button>
      </div>
      <h3>{post.title}</h3>
      <p>{post.content || post.body}</p>
    </div>
  );
};

export default PostItem;
