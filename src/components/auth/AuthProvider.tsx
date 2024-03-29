import { setToken as setAuthToken } from "@/api/instance";
import { getProfile } from "@/api/user/api";
import type { Settings, UserProfileResponse } from "@/api/user/types";
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
  profile?: UserProfileResponse;
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
  const [profile, setProfile] = useState<UserProfileResponse | undefined>();

  const checkIsAuthenticated = useCallback(async () => {
    try {
      const res = await getProfile();
      if (res) {
        setIsAuthenticated(true);
        setProfile(res);
      }
    } catch (error) {
      setIsAuthenticated(false);
      setToken(null);
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
      setProfile(undefined);
    }
  }, [token]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isPending, setToken, profile }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
