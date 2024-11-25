/** Google Sign in */
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../utils/firebase.util";
import { useCallback } from "react";
import axiosClient from "../utils/axios.utils";
import { toastError, toastSuccess } from "../utils/toastEmitter";
import { useAppDispatch } from "../redux/store.types";
import { setCurrentUser } from "../redux/user/user.action";

const useGoogleSignIn = ({ role }: { role: string }) => {
  const dispatch = useAppDispatch();

  const signInWithGooglePopUp = useCallback(() => {
    if (!auth || !provider) {
      console.error("Firebase auth or provider is not initialized.");
      return;
    }
    signInWithPopup(auth, provider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;
        const formData = {
          ...user,
          role,
        };

        // Send to server
        axiosClient
          .post("/auth/google", formData)
          .then(({ data }) => {
            toastSuccess("Successfully logged in.");
            dispatch(setCurrentUser(data));
          })
          .catch(({ response: { data } }) => {
            toastError(data.message);
          })
          .finally(() => {});
      })
      .catch((error) => {
        console.error("Error signing in with Google:", error);
      });
  }, [dispatch, role]);

  return { signInWithGooglePopUp };
};

export default useGoogleSignIn;
