import { useSelector } from "react-redux";
import { AppState } from "state";

export const getUser = () => {
    const user = useSelector<AppState, AppState['user']>((state) => state.user)
    return user.userInfor;
}