import BlogHeading from '../BlogHead/BlogHeading';
import BlogInfo from '../BlogInfo/BlogInfo';
import Features from '../FeaturesShop/Features';
import Footer from '../FooterPage/Footer';
import Join from '../join/Join';
import Style from './About.module.scss';

function About() {
  return (
    <div className={Style.about}>
      <BlogHeading bg={'../../../public/images/gr-3.avif'}>
        <h2>#AboutUs</h2>
      </BlogHeading>
      <div className={Style.content}>
        <BlogInfo image={'../../../public/images/bg-1.jpg'}>
          <h2>Who We Are ? </h2>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Atque
            ullam rerum quod corporis deserunt, cum est maxime labore libero
            esse, veniam ex ducimus! Vero neque quo ex, eius commodi cumque?
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam
            modi libero dolores quibusdam vero corporis quo officiis saepe
            minima illo, eius facilis culpa nemo inventore nesciunt. Hic illum
            tenetur explicabo. Lorem ipsum dolor sit amet, consectetur
            adipisicing elit. Nulla facere ad omnis? Odio commodi consequuntur
            ea ullam exercitationem minus? Nostrum laudantium fuga aut quas modi
            iure unde id incidunt velit? Mollitia facere quaerat nemo nulla?
            Pariatur repellat voluptatibus illum placeat porro voluptas rem quas
            officia omnis expedita? Suscipit, nemo dolorem
          </p>
        </BlogInfo>
        <Download />
      </div>
      <div style={{}} className={Style.below}>
        <Features />
        <Join />
        <Footer />
      </div>
    </div>
  );
}

//<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63314.25962211077!2d-2.3548951198009083!3d7.338032654237203!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdacf2948671391%3A0xb6cac72b91017af!2sSunyani!5e0!3m2!1sen!2sgh!4v1754958503639!5m2!1sen!2sgh" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>

function Download() {
  return (
    <div className={Style.play}>
      <div className={Style.content}>
        <h1>
          Download the <span>App</span>
        </h1>
        <div className={Style.video}>
          <video
            autoPlay
            // controls
            loop
            src="../../../public/images/nature.mp4"
          ></video>
        </div>
      </div>
    </div>
  );
}

export default About;
