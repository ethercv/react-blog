import '../App.css';
import { PostEditFormProps } from '../types';
import { useState } from 'react';

const PostEditForm: React.FC<PostEditFormProps> = ({ post, onSave, onCancel }) => {
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content || post.body);

  const handleSave = () => {
    if (!title.trim() || !content.trim()) {
      alert('Пожалуйста, заполните оба поля!');
      return;
    }
    onSave(post.id, { title, content });
  };

  return (
    <div className="post-edit">
      <h2>Редактировать пост</h2>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea value={content} onChange={(e) => setContent(e.target.value)} />
      <div className="edit-buttons">
        <button onClick={handleSave}>Сохранить</button>
        <button onClick={onCancel}>Отмена</button>
      </div>
    </div>
  );
};

export default PostEditForm;
