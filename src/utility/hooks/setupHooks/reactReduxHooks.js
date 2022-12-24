import {
  useDispatch as OriginalDispatch,
  useSelector as OriginalSelector,
} from "react-redux";

export const useSelector = (state) => OriginalSelector(state);
export const useDispatch = () => OriginalDispatch();
