import { useSelector } from "react-redux";
import { AppState } from "state";

export const GetDataPreview = () => {
    const dataPreview = useSelector<AppState, AppState["preview"]>(
      (state) => state.preview)
    return dataPreview;
};