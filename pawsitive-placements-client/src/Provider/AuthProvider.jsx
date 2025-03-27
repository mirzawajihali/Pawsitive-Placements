import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import auth from '../firebase/firebase.init';


export const AuthContext = createContext();

const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

   const googleProvider = new GoogleAuthProvider();

    const signInWithGoogle = () => {
        signInWithPopup(auth, googleProvider)
        .then((result) => {
            const user = result.user;
            setUser(user);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    const signInWithEmail = (email, password) => {
        signInWithEmailAndPassword(auth, email, password)
        .then((result) => {
            const user = result.user;
            setUser(user);
        })
        .catch((error) => {
            console.log(error);
        })
    }
    
    const createUser = (email, password) => {
        createUserWithEmailAndPassword(auth, email, password)
        .then((result) => {
            const user = result.user;
            setUser(user);
        })
        .catch((error) => {
            console.log(error);
        })
    }
    const authData ={
        user,
        loading,
        signInWithGoogle,
        signInWithEmail,
        createUser
    }

   useEffect(() => {
        const unsubscribed = onAuthStateChanged(auth, (currentUser) => {
          setUser(currentUser);
          setLoading(false);
        });
    
        return () => {
          unsubscribed();
        };
      }, []);

    return (
        <div>
            <AuthContext.Provider value={authData}> {children}</AuthContext.Provider>
        </div>
    );
};

export default AuthProvider;