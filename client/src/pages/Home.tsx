import PageLayout from "../components/PageLayout";

import SideNav from "../features/sideNav/SideNav";
import Projects from "../features/projects/components/Projects";

const Home = () => {
  return (
    <PageLayout style={{ display: "flex" }}>
      <SideNav />
      <Projects />
    </PageLayout>
  );
};

export default Home;
