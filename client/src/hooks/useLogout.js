import { useAuthContext } from "./useAuthContext";
// import { useAthleteContext } from "./useAthleteContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  // const { dispatch: athleteDispatch } = useAthleteContext();
  const logout = () => {
    // Remove user from storage
    localStorage.removeItem("user");

    // Dispatch logout action
    dispatch({ type: "LOGOUT" });
    // athleteDispatch({ type: "SET_ATHLETES", payload: null });
  };

  return { logout };
};
