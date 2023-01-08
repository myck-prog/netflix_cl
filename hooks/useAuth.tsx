import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";

import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { auth } from "../firebase";

interface IAuth {
    user: User | null
    signUp: (email: string, password: string) => Promise<void>
    signIn: (email: string, password: string) => Promise<void>
    logout: () => Promise<void>
    error: string | null
    loading: boolean
  }

const AuthContext = createContext<IAuth>({
    user: null,
    signUp: async () => {},
    signIn: async () => {},
    logout: async () => {},
    error: null,
    loading: false,
  })

interface AuthProviderProps{
    children: React.ReactNode
}

export const AuthProvider = ({children}: AuthProviderProps) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState(null)
  const [initialLoading, setInitialLoading]=useState(true)
  const router = useRouter();

  // Persisting the changes of the users
  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // Logged in...
          setUser(user)
          setLoading(false)
        } else {
          // If there is no users, push back to login
          setUser(null)
          setLoading(true)
          router.push('/login')
        }

        setInitialLoading(false)
      }),
    [auth]
  )

  const signUp = async (email: string, password: string) => {
    setLoading(true);

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
        router.push("/");
        setLoading(false);
      })
      .catch((error) => alert(error.message))
      .finally(() => setLoading(false));
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);

    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
        router.push("/");
        setLoading(false);
      })
      .catch((error) => alert(error.message))
      .finally(() => setLoading(false));
  };

  const logout = async () => {
    setLoading(true);

    signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((error) => alert(error.message))
      .finally(() => setLoading(false));
  };

  const memoedValue = useMemo(()=>({
    user, signUp, signIn, loading, logout,error, 
  }), [user, loading, ])


  return (
  <AuthContext.Provider  value = {memoedValue}>
    {!initialLoading && children}
  </AuthContext.Provider>
  )
  
}
export default function useAuth() {
    return useContext(AuthContext)
  }


// This is a custom hook, usually return the state.
// This will wrap the authentication state to the whole application
// useMemo is a hook similar to useEffect, only recompute the memonized value when deps changed
// Type of children in the Typescript is React.ReactNode StackOverflow
// Type missing, in AuthContext.Provider, we need to provide value (better performance if use memoed Value)
// useMemo, using the memoed Value, only recompute if either user or loading changed 
// useEffect used to make the page persist if you log-on 
// Creating a custom hook on AuthContext.Provider