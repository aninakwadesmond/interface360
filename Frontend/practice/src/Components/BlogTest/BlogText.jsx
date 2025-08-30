import BlogInfo from '../BlogInfo/BlogInfo';
import Bottton from '../ButtonS/Bottton';
import Style from './blog.module.scss';

function BlogText({ count = 5 }) {
  return (
    <>
      <div className={Style.blog}>
        {Array.from({ length: count }, (_, i) => i).map((el) => (
          <BlogInfo image={'./images/sh-3.avif'} timer="13/14">
            <h2>The Cotton-jersey Zip-zip-Up handle</h2>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Atque
              ullam rerum quod corporis deserunt, cum est maxime labore libero
              esse, veniam ex ducimus! Vero neque quo ex, eius commodi cumque?
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam
              modi libero dolores quibusdam vero corporis quo officiis saepe
              minima illo, eius facilis culpa nemo inventore nesciunt. Hic illum
              tenetur explicabo.
            </p>
            <span>continue reading</span>
          </BlogInfo>
        ))}
      </div>
      {/* <div className={Style.pa}>
        {Array.from({ length: 3 }, (_, i) => i + 1).map((el) => (
          <Bottton>{el === 3 ? '>' : el}</Bottton>
        ))}
      </div> */}
    </>
  );
}

// function BlogInfo({ children, image, timer }) {
//   return (
//     <div className={Style.blogContent}>
//       <div className={Style.image}>
//         <img src={image} alt="" />
//       </div>
//       <div className={Style.imageContent}>{children}</div>
//       {timer && <p className={Style.timmer}>{timer}</p>}
//     </div>
//   );
// }

export default BlogText;
