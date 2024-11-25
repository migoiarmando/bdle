import { useCallback } from "react";
import { toastError, toastSuccess } from "../utils/toastEmitter";
import { setCurrentUser } from "../redux/user/user.action";
import { useAppDispatch } from "../redux/store.types";
import axiosClient from "../utils/axios.utils";

const useLogout = () => {
  const dispatch = useAppDispatch();

  const handleLogout = useCallback(() => {
    axiosClient
      .post("/auth/logout")
      .then(({ data }) => {
        toastSuccess(data.message);
        dispatch(setCurrentUser(null));
      })
      .catch(({ response: { data } }) => {
        toastError(data.message);
      })
      .finally(() => {});
  }, [dispatch]);

  return { handleLogout };
};

export default useLogout;
