import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import auth from '../firebase/firebase.init';


export const AuthContext = createContext();

const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

   const googleProvider = new GoogleAuthProvider();

    const signInWithGoogle = () => {
        setLoading(true);
      return  signInWithPopup(auth, googleProvider)
      
    }

    const signInWithEmail = (email, password) => {
        setLoading(true);
        return  signInWithEmailAndPassword(auth, email, password)
       
    }
    
    const createUser = (email, password) => {
        setLoading(true);
      return  createUserWithEmailAndPassword(auth, email, password)
     
    }

    const logOut =() =>{
        setLoading(true);
       return signOut(auth)
    }

    const updateUserProfile =(name, photo)=>{
     return updateProfile(auth.currentUser,{
        displayName : name, photoURL : photo
      })
    }



    const authData ={
        user,
        setUser,
        loading,
        signInWithGoogle,
        signInWithEmail,
        createUser,
        logOut,
        updateUserProfile
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