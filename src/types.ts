export interface Post {
  id: number;
  title: string;
  content: string;
  date: string;
}

export interface PostFormProps {
  onPublish: (newPost: Omit<Post, 'id' | 'date'>) => void;
}

export interface PostListProps {
  posts: Post[];
  onDelete: (id: number) => void;
  editingPost: number | null;
  onEditClick: (id: number | null) => void;
  onSave: (id: number, updatedData: Partial<Post>) => void;
}

export interface PostItemProps {
  post: Post;
  onDelete: (id: number) => void;
  onEditClick: (id: number) => void;
}

export interface PostEditFormProps {
  post: Post;
  onSave: (id: number, updatedData: Partial<Post>) => void;
  onCancel: () => void;
}

export interface HeadingProps {
  text: string;
}

export interface ButtonProps {
  onClick: () => void;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}
