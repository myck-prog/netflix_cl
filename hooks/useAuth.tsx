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

function useAuth() {
  const [user, setUser] = useState();
  return <div>useAuth</div>;
}

export default useAuth;

// This is a custom hook, usually return the state.
// This will wrap the authentication state to the whole application
