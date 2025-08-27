import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import BlogHeading from '../BlogHead/BlogHeading';
import {
  faChartLine,
  faPhone,
  faPlane,
  faTelevision,
} from '@fortawesome/free-solid-svg-icons';
import Style from './c.module.scss';
import { Form } from 'react-router-dom';
import Join from '../join/Join';
import Footer from '../FooterPage/Footer';

function ContactItem() {
  return (
    <>
      <BlogHeading bg={'../../../public/images/gr-4.avif'}>
        <h2>#Let's_talk</h2>
        <p>Leave a message we love to hear from you</p>
      </BlogHeading>

      <Visit />
      <FormContent />

      <Join />
      <Footer />
    </>
  );
}
function Visit() {
  return (
    <div className={`${Style.Visit} ${Style.contact} `}>
      <div className={Style.content}>
        <p>Get in touch</p>
        <h2>visit one of our agency location or contact us today</h2>
        <div className={Style.actions}>
          <div>
            <span>
              <FontAwesomeIcon icon={faPhone} />
            </span>
            <span>+233 2344443 33, +233 2344443 33,+233 2344443 33,</span>
          </div>
          <div>
            <span>
              <FontAwesomeIcon icon={faPlane} />
            </span>{' '}
            <span>+233 2344443 33, +233 2344443 33,+233 2344443 33,</span>
          </div>
          <div>
            <span>
              <FontAwesomeIcon icon={faTelevision} />
            </span>
            <span>+233 2344443 33, +233 2344443 33,+233 2344443 33,</span>
          </div>
          <div>
            <span>
              <FontAwesomeIcon icon={faChartLine} />
            </span>
            <span>+233 2344443 33, +233 2344443 33,+233 2344443 33,</span>
          </div>
        </div>
      </div>
      <div className={Style.map}>
        <div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63314.25962211077!2d-2.3548951198009083!3d7.338032654237203!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdacf2948671391%3A0xb6cac72b91017af!2sSunyani!5e0!3m2!1sen!2sgh!4v1754958503639!5m2!1sen!2sgh"
            width="600"
            height="500"
            style={{ border: '0' }}
            // allowfullscreen=""
            loading="lazy"
            // referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

function FormContent() {
  return (
    <div className={Style.shield}>
      <div className={Style.containerForm}>
        <Form>
          <div className={Style.head}>
            <p>leave a message</p>
            <h2>We love to hear from you</h2>
          </div>
          <div>
            <input type="text" placeholder="Your name" />
            <input type="email" name="" id="" placeholder="Email" />

            <input type="text" name="" id="" placeholder="subject" />
            <textarea
              placeholder="leave a message"
              className={Style.textArea}
            />
          </div>
          <button type="submit">Submit</button>
        </Form>
      </div>
      <div className={Style.comments}>
        <Comments />
        <Comments />
        <Comments />
        {/* <div>
          <img src="../../../public/images/car10.jpg" alt="" />
          <div>
            <h3>John Doe</h3>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
          </div>
        </div> */}
      </div>
    </div>
  );
}

function Comments() {
  return (
    <div className={Style.imageContainer}>
      <div className={Style.image}>
        <img src="../../../public/images/car10.jpg" alt="" />
      </div>
      <div className={Style.details}>
        <h3>John Doe</h3>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit Lorem ipsum
          dolor sit amet consectetur adipisicing elit. Dolor, totam molestias.
          Eligendi repellat earum, molestias sed, officiis
        </p>
      </div>
    </div>
  );
}

export default ContactItem;
