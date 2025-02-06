import { Post } from '../types';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

export const fetchPosts = async (): Promise<Post[]> => {
  const response = await fetch(`${BASE_URL}/posts`);
  if (!response.ok) throw new Error('Ошибка загрузки постов');
  return response.json();
};

export const addPostToAPI = async (newPost: Omit<Post, 'id'>): Promise<Post> => {
  const response = await fetch(`${BASE_URL}/posts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newPost),
  });
  if (!response.ok) throw new Error('Ошибка при добавлении поста');
  return response.json();
};

export const deletePostFromAPI = async (id: number): Promise<void> => {
  const response = await fetch(`${BASE_URL}/posts/${id}`, { method: 'DELETE' });
  if (!response.ok) throw new Error('Ошибка при удалении поста');
};

export const editPostOnAPI = async (id: number, updatedPost: Partial<Post>): Promise<Post> => {
  const response = await fetch(`${BASE_URL}/posts/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedPost),
  });
  if (!response.ok) throw new Error('Ошибка при обновлении поста');
  return response.json();
};
