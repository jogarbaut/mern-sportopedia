import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

import axios from "axios";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    const loginParameters = {
      email,
      password
    }

    axios.post("http://localhost:8000/api/user/login", loginParameters)
      .then((res) => {
      // Save user to local storage
      localStorage.setItem("user", JSON.stringify(res.data));
      dispatch({ type: "LOGIN", payload: res.data })
      setIsLoading(false);
      })
      .catch((err) => console.log(err))
  };
  return { login, isLoading, error };
};
