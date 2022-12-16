import { createContext, useReducer } from "react";

export const AthleteContext = createContext();

export const athleteReducer = (state, action) => {
  switch (action.type) {
    case "SET_ATHLETES":
      return {
        athletes: action.payload,
      };
    case "CREATE_ATHLETE":
      return {
        athletes: [action.payload, ...state.athletes],
      };
    case "UPDATE_ATHLETE":
      const updatedAthlete = action.payload;
      const updatedAthletes = state.athletes.map((athlete) => {
        if (athlete._id === updatedAthlete._id) {
          return updatedAthlete;
        }
        return athlete;
      });
      return {
        ...state,
        athletes: updatedAthletes,
      };
    case "DELETE_ATHLETE":
      return {
        athletes: state.athletes.filter(
          (athlete) => athlete._id !== action.payload._id
        ),
      };
    default:
      return state;
  }
};

export const AthleteContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(athleteReducer, {
    athletes: null,
  });

  return (
    <AthleteContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AthleteContext.Provider>
  );
};
