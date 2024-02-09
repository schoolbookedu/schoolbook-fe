export const Overlay = (props) => {
  if (props.show) {
    return (
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 backdrop-filter backdrop-blur-[2px]   z-[999999] pointer-events-none">
        {props.children}
      </div>
    );
  }

  return null;
};
