import NewsNav from '../Components/newsNavigation/newsNav';
import Layout from '../Components/NewsLayout/Layout';
import Main from '../Components/Main/Main';
import Blog from '../Components/Blog/Blog';
import { BlogContext } from '../Components/ContextApr/BlogContext';
import { useReducer, useState, useEffect } from 'react';
import { json, useLoaderData } from 'react-router-dom';

// const [image, setImage] = useState();
// const [title, setTitle] = useState('');
// const [description, setDescription] = useState('');
const initialState = {
  myBlogs: [],
  changeBlog: {},
  index: '',
  editBlog: '',
  edit: false,
  image: '',
  title: '',
  description: '',
  modal: false,
  openBook: false,
  data: [],
  query: '',
  queryInput: '',
  view: {},
  bookmarkList: [],
  checked: false,
  load: false,
};
function reducer(state, action) {
  switch (action.type) {
    case 'addBlog':
      return {
        ...state,
        myBlogs: !state.edit
          ? [...state.myBlogs, action.payload].filter(
              (obj, index, self) =>
                index === self.findIndex((o) => o.title === obj.title)
            )
          : state.myBlogs,
      };
    case 'setImage':
      return { ...state, image: action.payload };
    case 'setTitle':
      return { ...state, title: action.payload };
    case 'setDescription':
      return { ...state, description: action.payload };
    case 'edit':
      return { ...state, edit: action.payload };
    case 'setEdit':
      return { ...state, editBlog: action.payload };

    case 'resetFormField':
      return { ...state, title: '', description: '', image: '' };

    case 'editSelected':
      return {
        ...state,
        changeBlog: state.edit
          ? {
              title: state.title,
              image: state.image,
              description: state.description,
            }
          : state.editBlog,
      };

    case 'resetChangeBlog':
      return { ...state, changeBlog: {} };

    case 'update':
      return {
        ...state,
        index: state.myBlogs.findIndex((o) => o.title === state.editBlog.title),

        myBlogs: state.edit
          ? [...state.myBlogs].map((item, index) =>
              index ===
              state.myBlogs.findIndex((o) => o.title === state.editBlog.title)
                ? { ...item, ...state.changeBlog }
                : item
            )
          : state.myBlogs,
      };

    case 'removeBlog':
      return {
        ...state,
        myBlogs: [...state.myBlogs].filter(
          (el, index) => el.title !== state.editBlog.title
        ),
      };
    case 'setModal':
      return { ...state, modal: action.payload };
    case 'openBook':
      return { ...state, openBook: action.payload };
    case 'queryData':
      return { ...state, query: action.payload };
    case 'queryInput':
      return { ...state, queryInput: action.payload };
    case 'resetQuery':
      return { ...state, queryInput: '' };
    case 'loadData':
      return { ...state, data: action.payload };
    case 'view':
      return { ...state, view: action.payload };
    case 'bookmarkList':
      return {
        ...state,
        bookmarkList: [...state.bookmarkList, action.payload].filter(
          (obj, index, self) => index === self.findIndex((o) => o.id === obj.id)
        ),
      };

    case 'removeBookMArk':
      return {
        ...state,
        bookmarkList: [...state.bookmarkList].filter(
          (obj, index, self) => obj.id !== action.payload.id
        ),
      };
    case 'checked':
      return { ...state, checked: action.payload };
    case 'setLoad':
      return { ...state, load: action.payload };
  }
}
const gnews =
  'https://gnews.io/api/v4/search?q=science&apikey=9430c3128033a6153997af83a0a91e5b';

// const intiaalState = {
//   data: [],
// };

// function reducer(state, action) {
//   switch (action.type) {
//     case 'loadData':
//       return { ...state, data: action.payload };
//   }
// }

function News() {
  const [openBlog, setOpenBlog] = useState(false);
  const [open, setOpen] = useState(false);
  const dataLoader = useLoaderData();

  const [
    {
      myBlogs,
      editBlog,
      edit,
      image,
      title,
      description,
      modal,
      openBook,
      data,
      query,
      view,
      bookmarkList,
      queryInput,
      checked,
      load,
    },
    dispatch,
  ] = useReducer(reducer, initialState);
  // const [editBlog, setEdit] = useState('');

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `https://gnews.io/api/v4/search?q=${query}&apikey=9430c3128033a6153997af83a0a91e5b`
      );
      if (!response.ok) {
        return json({ message: 'Error page' }, { status: 300 });
      } else {
        const responseData = await response.json();
        dispatch({ type: 'loadData', payload: responseData.articles });
      }
    }
    fetchData();
  }, [query]);
  return (
    <Main>
      <BlogContext.Provider
        value={{
          myBlogs,
          setOpenBlog,
          open,
          setOpen,
          dispatch,
          editBlog,
          edit,
          image,
          title,
          description,
          modal,
          openBook,
          data,
          view,
          bookmarkList,
          queryInput,
          load,
        }}
      >
        {openBlog ? (
          <Blog />
        ) : (
          <>
            <NewsNav />
            <Layout />
          </>
        )}
      </BlogContext.Provider>
    </Main>
  );
}

export async function loader() {
  const response = await fetch(
    `https://gnews.io/api/v4/search?q=science&apikey=9430c3128033a6153997af83a0a91e5b`
  );
  if (!response.ok) {
    return json({ message: 'Error messages' }, { status: 202 });
  } else {
    const responseData = await response.json();
    return responseData;
  }
}

export default News;
