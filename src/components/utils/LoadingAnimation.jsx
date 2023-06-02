import styles from "./LoadingAnimation.module.sass";

const LoadingAnimation = ({ className, size = 28 }) => {
  return (
    <div className={`${className}`}>
      <svg
        className={styles["spinner"]}
        viewBox="0 0 50 50"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          margin: `-${size / 2}px 0 0 -${size / 2}px`,
        }}
      >
        <circle
          className={styles["path"]}
          cx="25"
          cy="25"
          r="20"
          fill="none"
          strokeWidth="5"
        ></circle>
      </svg>
    </div>
  );
};

export default LoadingAnimation;
