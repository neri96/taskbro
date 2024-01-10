import { useState } from "react";

import Login from "./Login";
import Register from "./Register";

import classnames from "classnames";

import { AuthType } from "../types";

import styles from "./Auth.module.scss";

export const Auth = () => {
  const [authType, setAuthType] = useState<AuthType>(AuthType.Login);

  const handleAuthLogin = () => setAuthType(AuthType.Login);
  const handleAuthRegister = () => setAuthType(AuthType.Register);

  return (
    <div className={styles.auth}>
      <div className={styles.authHeader}>
        <div
          style={{
            height: "60px",
            width: "150px",
            display: "flex",
            alignItems: "center",
            position: "relative",
          }}
        >
          <div className={styles.authTitle} onClick={handleAuthLogin}>
            <h4>Login</h4>
          </div>
          <div className={styles.authTitle} onClick={handleAuthRegister}>
            <h4>Register</h4>
          </div>
          <div
            className={classnames(styles.underline, {
              [styles.register]: authType === AuthType.Register,
            })}
          />
        </div>
      </div>
      {authType === AuthType.Login ? <Login /> : <Register />}
    </div>
  );
};
