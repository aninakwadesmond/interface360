import Style from './b.module.scss';

function BlogInfo({ children, image, timer }) {
  return (
    <div className={Style.blogContent}>
      <div className={Style.image}>
        <img src={image} alt="" />
      </div>
      <div className={Style.imageContent}>{children}</div>
      {timer && <p className={Style.timmer}>{timer}</p>}
    </div>
  );
}

export default BlogInfo;
