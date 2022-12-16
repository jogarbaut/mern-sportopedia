import { AthleteContext } from "../context/AthleteContext";
import { useContext } from "react";

export const useAthleteContext = () => {
  const context = useContext(AthleteContext);
  if (!context) {
    throw Error(
      "useAthleteContext must be used inside an AthleteContextProvider"
    );
  }
  return context;
};
