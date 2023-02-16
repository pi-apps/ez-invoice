import { useSelector } from "react-redux";
import { AppDispatch, AppState } from "state";

export const getAccessTokenAuth = () => {
  const accessTokenAuth = useSelector<AppState, AppState["loginGoogle"]>(
    (state) => state.loginGoogle
  );
  return accessTokenAuth.accessTokenAuth;
};
