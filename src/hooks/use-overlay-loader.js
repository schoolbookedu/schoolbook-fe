import { useState } from "react";

export const useOverlayLoader = () => {
  const [showing, setShowing] = useState(false);

  return {
    showing,
    show() {
      setShowing(true);
    },
    hide() {
      setShowing(false);
    },
  };
};
