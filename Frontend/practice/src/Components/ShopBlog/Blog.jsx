import BlogHeading from '../BlogHead/BlogHeading';
import BlogText from '../BlogTest/BlogText';
import Footer from '../FooterPage/Footer';
import HeaderBlog from '../Imageheader/HeaderBlog';
import Join from '../join/Join';
import Pagination from '../pagination/Pagination';

function Blog() {
  return (
    <>
      <BlogHeading bg={'../../../public/images/gr-2.avif'}>
        <h2>#readmore</h2>
        <p>Record all case studies about our products</p>
      </BlogHeading>
      <BlogText />
      {/* <Pagination /> */}
      <Join />
      <Footer />
    </>
  );
}

export default Blog;
