import "./loading-hamster.css";

const LoadingHamster = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh]">
      <div
        className="wheel-and-hamster"
        role="img"
        aria-label="Orange and tan hamster running in a metal wheel"
      >
        <div className="wheel"></div>
        <div className="hamster">
          <div className="hamster__body">
            <div className="hamster__head">
              <div className="hamster__ear"></div>
              <div className="hamster__eye"></div>
              <div className="hamster__nose"></div>
            </div>
            <div className="hamster__limb hamster__limb--fr"></div>
            <div className="hamster__limb hamster__limb--fl"></div>
            <div className="hamster__limb hamster__limb--br"></div>
            <div className="hamster__limb hamster__limb--bl"></div>
            <div className="hamster__tail"></div>
          </div>
        </div>
        <div className="spoke"></div>
      </div>
      <div className="mt-2 text-lg font-semibold text-gray-600">Loading...</div>
    </div>
  );
};

export default LoadingHamster;
