import FooterSocial from "./FooterSocial";
import FooterNewsletter from "./FooterNewsletter";

import styles from "./style.module.scss";

const Footer = () => {
  return (
    <footer className={styles.mainFooter}>
      <div className={styles.mainFooterContact}>
        <p>2600 Greenwich St, San Francisco, CA 94123</p>
        <a href="mailto:taskbro@gmail.com">
          <p>taskbro@gmail.com</p>
        </a>
      </div>
      <FooterSocial />
      <FooterNewsletter />
    </footer>
  );
};

export default Footer;
