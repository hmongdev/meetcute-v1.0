// react
import { useNavigate } from "react-router-dom";
import { createContext, useContext, useEffect, useState } from 'react'
// appwrite
import { IUser } from '@/types';
import { getCurrentUser } from '@/lib/appwrite/api';

// define empty user
export const INITIAL_USER = {
  id: "",
  name: "",
  username: "",
  email: "",
  imageUrl: "",
  bio: "",
};

// declare initial Auth state
const INITIAL_STATE = {
  user: INITIAL_USER,
  isLoading: false,
  isAuthenticated: false,
  setUser: () => {},
  setIsAuthenticated: () => {},
  checkAuthUser: async () => false as boolean,
};

// declare context type
type IContextType = {
  user: IUser;
  isLoading: boolean;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  checkAuthUser: () => Promise<boolean>;
};

// declare context
const AuthContext = createContext<IContextType>(INITIAL_STATE);
// declare provider
export function AuthProvider({ children }: { children: React.ReactNode }){
  const navigate = useNavigate();
  
  // declare state from initial Auth state
  const [user, setUser] = useState<IUser>(INITIAL_USER);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // check if User is Authenticated
  const checkAuthUser = async () => {
    setIsLoading(true);
    try {
      // getCurrentUser
      const currentAccount = await getCurrentUser();
      // setCurrentUser
      if (currentAccount) {
        setUser({
          id: currentAccount.id,
          name: currentAccount.name,
          username: currentAccount.username,
          email: currentAccount.email,
          imageUrl: currentAccount.imageUrl,
          bio: currentAccount.bio
        });
        setIsAuthenticated(true);
        
        return true;
      }
      return false;
    } catch (error) {
      // user is not authenticated
      console.log(error);
      return false;
    } finally {
      setIsLoading(false)
    }
  };
  
  // useEffect
  useEffect(() => {
    const cookieFallback = localStorage.getItem("cookieFallback");
    if (
      cookieFallback === "[]" ||
      cookieFallback === null ||
      cookieFallback === undefined
    ) {
        navigate("/sign-in");
    }
    checkAuthUser();
  }, []);

  // passing User Auth Info into AuthContext.Provider
  const value = {
    user,
    setUser,
    isLoading,
    isAuthenticated,
    setIsAuthenticated,
    checkAuthUser
  };
// wrap everything in the AuthContext.Provider  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

// export context
export const useUserContext = () => useContext(AuthContext);

