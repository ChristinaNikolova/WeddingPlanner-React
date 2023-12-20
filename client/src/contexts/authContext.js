import { createContext } from "react";
import { useSessionStorage } from "../hooks/useSessionStorage";
import { emails } from "../utils/constants/global";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useSessionStorage("authToken", "");
  const [email, setEmail] = useSessionStorage("email", "");
  const [id, setId] = useSessionStorage("userId", "");

  const userLogin = (authData) => {
    setAuthToken(authData.accessToken);
    setEmail(authData.email);
    setId(authData._id);
  };

  const userLogout = () => {
    setAuthToken("");
    setEmail("");
    setId("");
  };

  return (
    <AuthContext.Provider
      value={{
        userLogin,
        userLogout,
        isAuthenticated: !!authToken,
        isAdmin: email === emails.ADMIN,
        userId: id,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
