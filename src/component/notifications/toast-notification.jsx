import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const showToast = (message, type = "error") => {
  switch (type) {
    case "success":
      toast.success(message);
      break;
    case "info":
      toast.info(message);
      break;
    case "warning":
      toast.warning(message);
      break;
    case "error":
    default:
      toast.error(message);
      break;
  }
};
