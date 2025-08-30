import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Style from './footer.module.scss';
import {
  faAppleAlt,
  faFileMedical,
  faMarsStroke,
  faVideoSlash,
} from '@fortawesome/free-solid-svg-icons';

function Footer() {
  return (
    <div>
      <div className={Style.grid}>
        <div className={Style.cara}>
          <h1>Cara</h1>
          <div className="">
            <h3>Content</h3>
            <div className="">
              <p>
                <span>Address</span>: Lorem ipsum dolor sit amet consectetur,
              </p>
              <p>
                <span>Phone: </span>: Lorem ipsum dolor sit amet consectetur,
              </p>
              <p>
                <span>Hours: </span>: Lorem ipsum dolor sit amet consectetur,
              </p>
            </div>
            <div className={Style.follow}>
              <p>Follow Us </p>
              {/* <FontAwesomeIcon icon={fabface\\\} */}
              <div className={Style.social}>
                {/* <FontAwesomeIcon icon={faFacebookF} />
                <FontAwesomeIcon icon={faTwitter} />n */}
                <div>
                  <img
                    src="./images/instagram.png
                  "
                    alt=""
                  />
                </div>
                <div>
                  <img
                    src="./images/facebook.png
                  "
                    alt=""
                  />
                </div>
                <div>
                  <img
                    src="./images/telegram.png
                  "
                    alt=""
                  />
                </div>
                <div>
                  <img src="./images/social-media.png" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={Style.about}>
          <h2>About</h2>
          <div>
            <p>Lorem ipsum dolor sit</p>
            <p>Lorem ipsum dolor sit</p>
            <p>Lorem ipsum dolor sit</p>
            <p>Lorem ipsum dolor sit</p>
          </div>
        </div>
        <div className={Style.account}>
          <h2>My Account</h2>
          <div>
            <p>Lorem ipsum dolor sit</p>
            <p>Lorem ipsum dolor sit</p>
            <p>Lorem ipsum dolor sit</p>
            <p>Lorem ipsum dolor sit</p>
          </div>
        </div>
        <div className={Style.contact}>
          <h2>Install App</h2>
          <div>
            <p>From App Store to google</p>
          </div>
          <div className={Style.install}>
            <div className={Style.box}>
              <div>
                <p>
                  <FontAwesomeIcon icon={faAppleAlt} />
                </p>
                <div>
                  <span className={Style.shadow}>Download on the </span>
                  <span>App Store</span>
                </div>
              </div>
              <div>
                <p>
                  <FontAwesomeIcon icon={faMarsStroke} />
                </p>
                <div>
                  <span>Google App</span>
                </div>
              </div>
            </div>
            <div className={Style.payment}>
              <p>Secured Payment Gateway</p>
              <div>
                <div>
                  <img
                    src="./images/payment-service.png
          "
                    alt=""
                  />
                </div>
                <div>
                  <img
                    src="./images/card-payment.png
          "
                    alt=""
                  />
                </div>
                <div>
                  <img
                    src="./images/online-banking.png
          "
                    alt=""
                  />
                </div>
                <div>
                  <img
                    src="./images/payment-gateway.png
          "
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={Style.copy}>
        <p>&copy; copyright Lorem ipsum dolor</p>
      </div>
    </div>
  );
}

export default Footer;
