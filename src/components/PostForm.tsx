import '../App.css';
import { useState } from 'react';
import Button from './Button';
import Heading from './Heading';
import { PostFormProps } from '../types';

const PostForm: React.FC<PostFormProps> = ({ onPublish }) => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [error, setError] = useState<string>('');

  const validateInputs = (newTitle: string, newContent: string): string => {
    if (!newTitle.trim() || !newContent.trim()) {
      return 'Пожалуйста, заполните оба поля!';
    }
    if (newTitle.length > 30) {
      return 'Заголовок не должен превышать 30 символов!';
    }
    if (newContent.length > 60) {
      return 'Текст поста не должен превышать 60 символов!';
    }
    return '';
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    setError(validateInputs(newTitle, content));
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);
    setError(validateInputs(title, newContent));
  };

  const handlePublish = () => {
    if (error) return;
    onPublish({ title, content });
    setTitle('');
    setContent('');
    setError('');
  };

  return (
    <div className="new-post">
      <Heading text="Новый пост" />
      <div className="input-container">
        <input
          type="text"
          placeholder="Заголовок"
          className="input-title"
          value={title}
          onChange={handleTitleChange}
        />
      </div>
      <div className="input-container">
        <textarea
          placeholder="Напиши пост"
          className="input-post"
          value={content}
          onChange={handleContentChange}
        />
      </div>
      {error && <p className="error-message">{error}</p>}
      <Button onClick={handlePublish} disabled={!!error} className="btn-publish">
        Опубликовать
      </Button>
    </div>
  );
};

export default PostForm;
