import { ButtonProps } from '../types';
import '../App.css';

const Button: React.FC<ButtonProps> = ({ onClick, disabled, children, className = '' }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`btn ${className} ${disabled ? 'disabled' : ''}`}
    >
      {children}
    </button>
  );
};

export default Button;
