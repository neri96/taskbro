import Input from "../Input";
import Button from "../Button";

import styles from "./FooterNewsletter.module.scss";

// Functionality is to be implemented in the future //

const FooterNewsletter = () => {
  return (
    <form className={styles.mfNewsletter}>
      <Input
        name="email"
        placeholder="Your email"
        parentStyle={{ padding: "0" }}
        style={{ height: "30px", margin: "0", padding: "0", borderRadius: "0" }}
      />
      <Button style={{ height: "30px", borderRadius: "0" }}>Subscribe</Button>
    </form>
  );
};

export default FooterNewsletter;
