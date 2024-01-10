import PageLayout from "../components/PageLayout";

import { Auth as AuthWrap } from "../features/auth";

const Auth = () => {
  return (
    <PageLayout>
      <AuthWrap />
    </PageLayout>
  );
};

export default Auth;
