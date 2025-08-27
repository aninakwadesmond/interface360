import Style from './blog.module.scss';

function BlogHeading({ children, bg }) {
  return (
    <div className={Style.header} style={{ backgroundImage: `url(${bg})` }}>
      <div>{children}</div>
    </div>
  );
}

export default BlogHeading;
