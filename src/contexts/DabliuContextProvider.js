import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export const LoginContextProvider = React.createContext();

const initialLoginState = {
  user: null,
  token: null,
  isLogged: false,
};
function DabliuContextProvider(props) {
  const [loginState, setLoginState] = useState(initialLoginState);
  const history = useHistory();

  useEffect(() => {
    const loginStateStorage = JSON.parse(localStorage.getItem("loginState"));
    if (!loginStateStorage) return history.push("/auth/login");    
    if (!loginStateStorage.token) return history.push("/auth/login");

    setLoginState(loginStateStorage);


    history.push("/admin/dashboard");
   
  }, []);

    useEffect(() => {
        localStorage.setItem("loginState", JSON.stringify(loginState));
    }, [loginState]);

  return (
    <LoginContextProvider.Provider value={{ loginState, setLoginState }}>
      {props.children}
    </LoginContextProvider.Provider>
  );
}

export default DabliuContextProvider;
