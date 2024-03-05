import { setToken as setAuthToken } from "@/api/instance";
import { getProfile } from "@/api/user/api";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type AuthContextValue = {
  isAuthenticated: boolean;
  isPending: boolean;
  setToken: (token: string | null) => void;
};

export const AuthContext = createContext<AuthContextValue>({
  isAuthenticated: false,
  isPending: true,
  setToken: () => {},
});

const TOKEN_KEY = "authToken";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(() => {
    return sessionStorage.getItem(TOKEN_KEY);
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isPending, setIsPending] = useState<boolean>(true);

  const checkIsAuthenticated = useCallback(async () => {
    try {
      const res = await getProfile();
      if (res) {
        setIsAuthenticated(true);
      }
    } catch (error) {
      setIsAuthenticated(false);
    } finally {
      setIsPending(false);
    }
  }, []);

  useEffect(() => {
    setAuthToken(token);

    if (token) {
      checkIsAuthenticated();
      sessionStorage.setItem(TOKEN_KEY, token);
    } else {
      sessionStorage.removeItem(TOKEN_KEY);
      setIsAuthenticated(false);
      setIsPending(false);
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, isPending, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
