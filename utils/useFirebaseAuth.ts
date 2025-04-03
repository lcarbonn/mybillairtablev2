import {
    signInWithEmailAndPassword,
    onAuthStateChanged,
    getAuth,
    sendPasswordResetEmail,
  } from "firebase/auth";

/**
 * Sign in user in firebase with email and password
 * @param email - the email
 * @param password - the password
 * @returns A Promise that resolve the auth user
 */
export const signInUserFirebase = (email:string, password:string) :Promise<IAuthUser> => {
    return new Promise((resolve, reject) => {
      const auth = getAuth()
      signInWithEmailAndPassword(auth, email, password)
      .then((credentials) => {
        const authUser = new AuthUser(credentials.user.uid, credentials.user.isAnonymous, credentials.user.email)
        resolve(authUser)
      })
      .catch((error) => {
        reject(error)
      })
    })
  }

/**
 * Sign out the current user from firebase
 * @throws Throws the firebase error
 */
export const signOutUserFirebase = () :Promise<void> => {
    return new Promise((resolve, reject) => {
      getAuth().signOut()
      .then(() => {
        resolve()
      })
    })
  }

/**
 * Initialize the firebase listener on auth state change
 */
export const initUserFirebase = (callback:any) => {
  const auth = getAuth()
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const authUser = new AuthUser(user.uid, user.isAnonymous, user.email)
      callback(authUser)
    } else {callback(undefined)}
  })
}

/**
 * Send password reset email
 * @param email - the email
 * @throws Throws the firebase error
 */
export const sendPasswordResetFirebase = (email:string) :Promise<void> => {
  return new Promise((resolve, reject) => {
    const auth = getAuth()
    sendPasswordResetEmail(auth,email)
    .then(() => {
      resolve()
    })
    .catch((error) => {
      reject(error)
    })
  })
}
