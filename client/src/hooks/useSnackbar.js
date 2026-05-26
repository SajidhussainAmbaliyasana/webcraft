import { useDispatch } from "react-redux";
import { showSnackbar } from "../redux/slices/uiSlice";
 
const useSnackbar = () => {
  const dispatch = useDispatch();
 
  const notify = (message, severity = "info") => {
    dispatch(showSnackbar({ message, severity }));
  };
 
  return {
    success: (msg) => notify(msg, "success"),
    error: (msg) => notify(msg, "error"),
    warning: (msg) => notify(msg, "warning"),
    info: (msg) => notify(msg, "info"),
  };
};
 
export default useSnackbar;
 

