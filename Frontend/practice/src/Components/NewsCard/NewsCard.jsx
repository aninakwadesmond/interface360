import Style from './NewsCard.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons/faBookmark';
import { faEdit, faRemove } from '@fortawesome/free-solid-svg-icons';
import { useState, useContext } from 'react';
import { BlogContext } from '../ContextApr/BlogContext';
import Overlay from '../overlay/Overlay';
import { dataLoader } from '../hardCodedData';

function NewsCard({ children, pad = 2, style, data }) {
  const [bookMark, setBookMark] = useState(false);
  const { dispatch } = useContext(BlogContext);
  // function hnadleRemoveBlog() {}

  const { image, title } = data;

  function handleOpenModal() {
    dispatch({ type: 'setModal', payload: true });
    dispatch({ type: 'view', payload: data });
  }
  function handleBookMark(el) {
    console.log(el);
    dispatch({ type: 'bookmarkList', payload: el });
    dispatch({ type: 'checked', payload: true });
    // dispatch({ type: 'setModal', payload: false });
  }
  function handleBook() {
    handleBookMark(data.length > 0 ? data[0] : dataLoader.articles[0]);
    setBookMark((prev) => !prev);
  }
  return (
    <div className={Style.newsCard}>
      <div className={Style.imageBox} onClick={handleOpenModal}>
        <img src={image} alt="" />
      </div>
      <div className={Style.imageText} style={pad && { padding: `${pad}rem` }}>
        {children}
        {/* <span className={Style.bookmark}>
          <FontAwesomeIcon icon={faBookmark} />
        </span> */}
        <span
          className={`${Style.bookmark} ${bookMark ? `${Style.opacity}` : ''}`}
          onClick={handleBook}
        >
          <FontAwesomeIcon icon={faBookmark} />
        </span>
      </div>
    </div>
  );
}
export function NewsCard2({ children, pad = 2, style, blog }) {
  const { setOpen, setOpenBlog, dispatch } = useContext(BlogContext);
  const { image, title, description } = blog;
  function handleEdit() {
    setOpen(true);
    setOpenBlog(true);
    dispatch({ type: 'setEdit', payload: blog });
    dispatch({ type: 'update' });
    dispatch({ type: 'edit', payload: true });
  }

  function hnadleRemoveBlog() {
    dispatch({ type: 'setEdit', payload: blog });
    dispatch({ type: 'removeBlog' });
  }
  return (
    <div className={Style.newsCard}>
      <div className={Style.imageBox}>
        <img src={image} alt="blog image" />
      </div>
      <div className={Style.imageText} style={pad && { padding: `${pad}rem` }}>
        {/* {children} */}
        {/* <span className={Style.bookmark}>
          <FontAwesomeIcon icon={faBookmark} />
        </span> */}
        <div className={Style.myBlogText}>
          <p>{title}</p>
          <p className={Style.edit}>
            <span onClick={handleEdit}>
              <FontAwesomeIcon icon={faEdit} />
            </span>
            <span onClick={hnadleRemoveBlog}>
              <FontAwesomeIcon icon={faRemove} />
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default NewsCard;
