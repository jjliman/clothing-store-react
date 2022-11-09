import { useNavigate } from 'react-router-dom';

import './directory-item.styles.scss';

const DirectoryItem = ({ category }) => {
  const { title, imageUrl } = category;
  const navigate = useNavigate();
  const goToCategoryHandler = () => {
    navigate(`/shop/${title}`);
  }
  return (
    <div onClick={goToCategoryHandler} className='directory-item-container'>
      <div className='background-image' style={{
        backgroundImage: `url(${imageUrl})`
      }} />
      <div className='body'>
        <h2>{title}</h2>
        <p>Shop Now</p>
      </div>
    </div>
  );
};

export default DirectoryItem;
