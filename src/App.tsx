import { useState, useEffect } from 'react';
import PostForm from './components/PostForm';
import PostList from './components/PostList';
import { fetchPosts, addPostToAPI, deletePostFromAPI, editPostOnAPI } from './api/api';
import { Post } from './types';
import './App.css';

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [editingPost, setEditingPost] = useState<number | null>(null);

  useEffect(() => {
    fetchPosts()
      .then((data) => setPosts(data.slice(0, 7)))
      .catch((error) => console.error(error));
  }, []);

  const handlePublish = (newPost: Omit<Post, 'id' | 'date'>) => {
    const getRandomId = () => Math.floor(Math.random() * 90) + 1;
    const currentDate = new Date();
    const formattedDate = `${currentDate.toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit',
    })}, ${currentDate.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    })}`;

    const postWithId = {
      id: getRandomId(),
      ...newPost,
      date: formattedDate,
    };

    setPosts([postWithId, ...posts]);
    addPostToAPI(postWithId).catch((error) => console.error(error));
  };

  const handleDelete = (id: number) => {
    setPosts(posts.filter((post) => post.id !== id));
    deletePostFromAPI(id).catch((error) => console.error(error));
  };

  const handleEditSave = async (id: number, updatedData: Partial<Post>) => {
    try {
      await editPostOnAPI(id, updatedData);
      setPosts(posts.map((post) => (post.id === id ? { ...post, ...updatedData } : post)));
      setEditingPost(null);
    } catch (error) {
      console.error('Ошибка редактирования:', error);
    }
  };

  return (
    <div className="app">
      <PostForm onPublish={handlePublish} />
      <PostList
        posts={posts}
        onDelete={handleDelete}
        editingPost={editingPost}
        onEditClick={setEditingPost}
        onSave={handleEditSave}
      />
    </div>
  );
};

export default App;
