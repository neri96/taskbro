import styles from "./ProjectHeaderUnderline.module.scss";

const ProjectHeaderUnderline = ({
  currentIndex,
  navLength,
}: {
  currentIndex: number;
  navLength: number;
}) => {
  const lineWidth = 100 / navLength;

  return (
    <div
      className={styles.phUnderline}
      style={{
        width: `${lineWidth}%`,
        transform: `translateX(${currentIndex * lineWidth * navLength}%)`,
      }}
    />
  );
};

export default ProjectHeaderUnderline;
