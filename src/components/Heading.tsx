import { HeadingProps } from '../types';
import '../App.css';

const Heading: React.FC<HeadingProps> = ({ text }) => {
  return <h2 className="heading">{text}</h2>;
};

export default Heading;
