import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [posts, setPosts] = useState([]);
  const [isEditing, setIsEditing] = useState(null); 
  const [editableTitle, setEditableTitle] = useState('');
  const [editableContent, setEditableContent] = useState('');

  const handlePublish = () => {
    if (!title.trim() || !content.trim()) {
      alert('Пожалуйста, заполните оба поля!');
      return;
    }

    if (title.trim().length > 30) {
      alert('Заголовок не должен превышать 30 символов!');
      return;
    }
    if (content.trim().length > 60) {
      alert('Текст поста не должен превышать 60 символов!');
      return;
    }
  
    const currentDate = new Date();
    const newPost = {
      title: title.trim(),
      content: content.trim(),
      date: currentDate.toLocaleString('ru-RU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
  
    
    setPosts([
      { id: Date.now(), ...newPost },
      ...posts,
    ]);
  
    
    addPostToAPI(newPost)
      .then(() => console.log('Пост успешно добавлен на сервер'))
      .catch((error) => console.error('Ошибка при добавлении поста на сервер:', error));
  
    
    setTitle('');
    setContent('');
  };
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'title') {
      setTitle(value);
    } else if (name === 'content') {
      setContent(value);
    }
  };

  const BASE_URL = 'https://jsonplaceholder.typicode.com';

  const fetchPosts = () => {
    fetch(`${BASE_URL}/posts`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Ошибка сети');
        }
        return response.json();
      })
      .then((data) => {
        setPosts(data.slice(0, 7));
      })
      .catch((error) => {
        console.error('Ошибка загрузки постов:', error);
      });
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = (id) => {
    setPosts(posts.filter((post) => post.id !== id));

    deletePostFromAPI(id)
    .then(() => console.log(`Пост с ID ${id} успешно удалён`))
    .catch((error) => console.error(`Ошибка при удалении поста с ID ${id}:`, error));
  };

  
  const handleEditClick = (id) => {
    const postToEdit = posts.find((post) => post.id === id);
    setIsEditing(id);
    setEditableTitle(postToEdit.title);
    setEditableContent(postToEdit.content);
  };

  
  const handleSave = (id) => {
    setPosts(
      posts.map((post) =>
        post.id === id
          ? { ...post, title: editableTitle, content: editableContent }
          : post
      )
    );

    editPostOnAPI(id, { title: editableTitle, content: editableContent })
    .then(() => console.log(`Пост с ID ${id} успешно обновлён`))
    .catch((error) => console.error(`Ошибка при обновлении поста с ID ${id}:`, error));

    setIsEditing(null);
  };

  
  const handleCancel = () => {
    setIsEditing(null);
    setEditableTitle('');
    setEditableContent('');
  };

const addPostToAPI = (newPost) => {
  return fetch(`${BASE_URL}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newPost),
  }).then((response) => {
    if (!response.ok) {
      throw new Error('Ошибка при добавлении поста на сервер');
    }
    return response.json();
  });
};


const deletePostFromAPI = (id) => {
  return fetch(`${BASE_URL}/posts/${id}`, {
    method: 'DELETE',
  }).then((response) => {
    if (!response.ok) {
      throw new Error('Ошибка при удалении поста на сервере');
    }
    return response.json();
  });
};


const editPostOnAPI = (id, updatedPost) => {
  return fetch(`${BASE_URL}/posts/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedPost),
  }).then((response) => {
    if (!response.ok) {
      throw new Error('Ошибка при обновлении поста на сервере');
    }
    return response.json();
  });
};


  return (
    <div className="app">
      <div className="new-post">
        <h2>Новый пост</h2>
        <div className="input-container">
          <input
            type="text"
            placeholder="Заголовок"
            value={title}
            name="title"
            onChange={handleInputChange}
            className="input-title"
          />
        </div>
        <div className="input-container">
          <textarea
            placeholder="Напиши пост"
            value={content}
            name="content"
            onChange={handleInputChange}
            className="input-post"
          />
        </div>
        <button className="btn-publish" onClick={handlePublish}>
          Опубликовать
        </button>
      </div>

      <div className="feed">
        <h2>Лента</h2>
        <div id="feed-container">
          {posts.length === 0 ? (
            <p className="empty-feed">Тут пока пусто...</p>
          ) : (
            posts.map((post) => (
              <div key={post.id} className="post">
                <p className="post-date">{post.date || 'Дата неизвестна'}</p>
                <div className="post-actions">
                  <button
                    className="btn-edit"
                    onClick={() => handleEditClick(post.id)}
                  >
                    ✏️
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(post.id)}
                  >
                    🗑️
                  </button>
                </div>
                {isEditing === post.id ? (
                  <div className="post-edit">
                    <input
                      type="text"
                      value={editableTitle}
                      onChange={(e) => setEditableTitle(e.target.value)}
                    />
                    <textarea
                      value={editableContent}
                      onChange={(e) => setEditableContent(e.target.value)}
                      
                    />
                    <button onClick={() => handleSave(post.id)}>Сохранить</button>
                    <button onClick={handleCancel}>Отмена</button>
                  </div>
                ) : (
                  <div>
                    <h3>{post.title}</h3>
                    <p>{post.content || post.body}</p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
