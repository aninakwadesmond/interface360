import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Style from './Blog.module.scss';
import { Form, Link } from 'react-router-dom';
import {
  faArrowAltCircleRight,
  faFileImage,
  faFileUpload,
} from '@fortawesome/free-solid-svg-icons';
import Button from '../Button/Button';
import { useContext, useState } from 'react';
import { BlogContext } from '../ContextApr/BlogContext';
import Overlay from '../overlay/Overlay';

function Blog() {
  const { setOpenBlog, open, setOpen } = useContext(BlogContext);

  function handleCloseBlog() {
    if (open) {
      return setOpen(false);
    }
    setOpenBlog(false);
  }
  return (
    <>
      <div className={Style.blog}>
        <div className={Style.background}></div>
        <div className={Style.create}>
          <div className={Style.back}>
            <span onClick={handleCloseBlog}>
              Back
              <span>
                <FontAwesomeIcon
                  icon={faArrowAltCircleRight}
                  Style={{ color: '#fff' }}
                />
              </span>
            </span>
          </div>
          {open ? <AddPost /> : <CreateBlog setOpen={setOpen} />}
          <div className={Style.imageCenter}>
            <img src="../../../public/images/car10.jpg" alt="" />
          </div>
        </div>
      </div>
    </>
  );
}
function CreateBlog({ setOpen }) {
  return (
    <div className={Style.button}>
      <Button>
        <span className={Style.blogStyle} onClick={() => setOpen(true)}>
          Create New Blog
        </span>
      </Button>
    </div>
  );
}

function AddPost() {
  // const [image, setImage] = useState();
  // const [title, setTitle] = useState('');
  // const [description, setDescription] = useState('');
  const { dispatch, setOpenBlog, editBlog, image, title, description } =
    useContext(BlogContext);
  if (editBlog) {
    console.log(editBlog);
  }

  function handleSubmit() {
    if (!title) return;
    dispatch({
      type: 'addBlog',
      payload: { image, title, description },
    });
    setOpenBlog(false);
    dispatch({ type: 'editSelected' });
    dispatch({ type: 'update' });
    dispatch({ type: 'resetChangeBlog' });
  }

  function handleChange(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // setImage(reader.result);
        dispatch({ type: 'setImage', payload: reader.result });
      };
      reader.readAsDataURL(file);
    }
  }
  return (
    <Form className={Style.addPost} encType="multipart/form-data">
      <h2 className={Style.header}>New Post</h2>
      <div className={Style.setImage}>
        <span className={Style.imageUpload}>
          <input
            type="file"
            name="fileImage"
            accept="image/*"
            onChange={(e) => handleChange(e)}
            className={Style.input}
            id="fileInput"
            // defaultValue={editBlog ? editBlog.image : ''}
          />

          {/* <span className={Style.icon}> */}
          <label htmlFor="fileInput" style={{ cursor: 'pointer' }}>
            <FontAwesomeIcon icon={faFileUpload} />
          </label>
          {/* </span> */}
        </span>
        <span>add Image</span>
      </div>
      <InputText maxC={20}>
        <input
          type="input"
          placeholder="Add title (Max 20 characters)"
          maxLength={20}
          defaultValue={editBlog && title ? editBlog.title : title}
          // defaultValue={'hello'}
          onChange={(e) =>
            dispatch({ type: 'setTitle', payload: e.target.value })
          }
        />
      </InputText>
      <InputText>
        <textarea
          placeholder="Add text"
          className={Style.textArea}
          defaultValue={
            editBlog && description ? editBlog.description : description
          }
          onChange={(e) =>
            dispatch({ type: 'setDescription', payload: e.target.value })
          }
        />
      </InputText>
      <Button>
        <button type="submit" className={Style.submit} onClick={handleSubmit}>
          Submit
        </button>
      </Button>
    </Form>
  );
}

function InputText({ children, maxC = '', type = 'text' }) {
  return <div className={Style.title}>{children}</div>;
}
export default Blog;
