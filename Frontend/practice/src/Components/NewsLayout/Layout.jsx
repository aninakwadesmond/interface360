import Style from './Layout.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRemove, faSearch } from '@fortawesome/free-solid-svg-icons';
import { faFileArchive } from '@fortawesome/free-solid-svg-icons';
import { faBookBookmark } from '@fortawesome/free-solid-svg-icons';
import NewsCard from '../NewsCard/NewsCard';
import { NewsCard2 } from '../NewsCard/NewsCard';
import { faBookmark } from '@fortawesome/free-solid-svg-icons/faBookmark';
import { faEdit } from '@fortawesome/free-solid-svg-icons/faEdit';
import Weather from '../Weather/Weather';
import Calender from '../Calender/Calender';
import { useContext } from 'react';
import { BlogContext } from '../ContextApr/BlogContext';
import Overlay from '../overlay/Overlay';
import Readmore from '../ReadMore/Readmore';
import CartItems from '../ChartItems/CartItems';
import Bookmark from '../Bookmarks/Bookmark';
import { useLoaderData } from 'react-router-dom';
import { dataLoader } from '../hardCodedData';

const SeachBy = [
  'general',
  'world',
  'business',
  'technology',
  'entertainment',
  'sports',
  'science',
  'health',
  'nation',
  'history',
];

function Layout() {
  const {
    myBlogs,
    setOpen,
    setOpenBlog,
    modal,
    openBook,
    data,
    view,
    bookmarkList,
    checked,
    dispatch,
  } = useContext(BlogContext);

  console.log(dataLoader);

  console.log(data);
  console.log(bookmarkList);

  function handleBookMark(el) {
    console.log(el);
    dispatch({ type: 'bookmarkList', payload: el });
    dispatch({ type: 'checked', payload: true });
    // dispatch({ type: 'setModal', payload: false });
  }
  const check = data.length > 0 ? data[0] : dataLoader.articles[0];

  return (
    <div
      style={{ width: '100vw', height: '100vh - 120px' }}
      className={Style.parent}
    >
      {openBook && <Overlay />}
      {modal && <Readmore />}
      {openBook && <Bookmark carsSelelcted={bookmarkList} />}
      <div className={Style.layout}>
        <div className={Style.sideBar}>
          <div className={Style.create}>
            <CreateBlog />
          </div>
          <div className={Style.category}>
            <Categories />
          </div>
        </div>
        <div className={Style.main}>
          <div className={Style.mainPage}>
            <NewsCard data={data.length > 0 ? data[0] : dataLoader.articles[0]}>
              <p>{check.title}</p>
              {/* <span
                className={Style.bookmark}
                onClick={() =>
                  handleBookMark(
                    data.length > 0 ? data[0] : dataLoader.articles[0]
                  )
                }
              >
                <FontAwesomeIcon icon={faBookmark} className={Style.bookmark} />
              </span> */}
            </NewsCard>
          </div>
          <div className={Style.related}>
            <div className={Style.relatedContent}>
              <div className={Style.gridContainer}>
                {(data.length > 0 ? data.slice(1, 8) : dataLoader.articles)
                  .slice(1, 7)
                  .map((el) => (
                    <div
                      style={{
                        width: '100%',
                        height: '80%',
                        overflow: 'hidden',
                        filter: 'brightness(0.9)',
                      }}
                      onClick={() => handleBookMark(el)}
                    >
                      <NewsCard pad={0.5} data={el}>
                        <p>{el.title.split(' ').slice(1, 6).join(' ')}</p>
                        {/* <span
                          className={`${Style.bookmark} ${
                            checked ? `${Style.clear}` : ''
                          }`}
                          onClick={() => handleBookMark(el)}
                        >
                          <FontAwesomeIcon icon={faBookmark} />
                        </span> */}
                      </NewsCard>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
        <div className={Style.myBlog}>
          <div className={Style.createBlog}>
            {myBlogs.map((blog) => (
              <NewsCard2 pad={0.2} blog={blog} />
            ))}
          </div>
        </div>
        <div className={Style.weatherApp}>
          <div className={Style.weather}>
            <Weather />
          </div>
          <div className={Style.calender}>
            <Calender />
          </div>
        </div>
      </div>
      <div className={Style.footer}>
        <div className={Style.foot}>
          <span>
            <FontAwesomeIcon icon={faSearch} />
          </span>
          <span>News & blog</span>
        </div>
        <div className={Style.copyright}>Footer copyRight</div>
      </div>
    </div>
  );
}

function CreateBlog() {
  const { setOpenBlog, dispatch } = useContext(BlogContext);
  function handleOpenBlog() {
    setOpenBlog(true);
    dispatch({ type: 'edit', payload: false });
    dispatch({ type: 'resetFormField' });
  }
  return (
    <>
      <div className={Style.createContainer}>
        <div className={Style.imageAdd}>
          <img src="./images/car10.jpg" alt="image circle" />
        </div>
        <div className={Style.create}>
          <span>Create</span>
          <span className={Style.addBlog} onClick={handleOpenBlog}>
            <FontAwesomeIcon icon={faFileArchive} />
          </span>
        </div>
      </div>
    </>
  );
}

function Categories() {
  const { dispatch } = useContext(BlogContext);

  function handleOpenBook() {
    dispatch({ type: 'openBook', payload: true });
  }
  return (
    <>
      <h3>Categories</h3>
      <div className={Style.categories}>
        {SeachBy.map((el) => (
          <div
            value={el}
            onClick={(e) => {
              // console.log();
              dispatch({
                type: 'queryData',
                payload: e.target.innerText,
              });
            }}
          >
            {el.toUpperCase()}
          </div>
        ))}
        <div className={Style.Bookmark}>
          <span>Bookmark</span>
          <span className={Style.book} onClick={handleOpenBook}>
            <FontAwesomeIcon icon={faBookmark} />
          </span>
          <span></span>
        </div>
      </div>
    </>
  );
}

function ImageContainer() {
  return (
    <div className={Style.imageContain}>
      <div className={Style.image1}>
        <img src="./images/car10.jpg" alt="imageContent" />
      </div>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
    </div>
  );
}

// function NewsCard() {
//   return (
//     <div className={Style.newsCard}>
//       <div className={Style.imageBox}>
//         <img src="./images/car2.jpg" alt="" />
//       </div>
//       <div className={Style.imageText}>
//         <p>
//           Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto maxime,
//           ab autem culpa placeat non
//         </p>
//         <span>
//           <FontAwesomeIcon icon={faFileArchive} />
//         </span>
//       </div>
//     </div>
//   );
// }

export default Layout;
