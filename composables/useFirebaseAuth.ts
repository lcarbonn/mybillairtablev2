import {
    signInWithEmailAndPassword,
    onAuthStateChanged,
    getAuth,
    type UserCredential,
    sendPasswordResetEmail,
  } from "firebase/auth";

/**
 * Sign in user in firebase with email and password
 * @param email - the email
 * @param password - the password
 * @returns A Promise that resolve the user credentials
 * @throws Throws the firebase error
 */
export const signInUser = (email:string, password:string) :Promise<UserCredential> => {
    return new Promise((resolve, reject) => {
      const auth = getAuth()

      signInWithEmailAndPassword(auth, email, password)
      .then((credentials) => {
        if(credentials) messageToSnack("Hello " + credentials.user.email)
        resolve(credentials)
      })
      .catch((error) => {
        errorToSnack(error, "Error on login")
        reject(error)
      })
    })
  }

/**
 * Sign out the current user from firebase
 * @throws Throws the firebase error
 */
export const signOutUser = () :Promise<void> => {
    return new Promise((resolve, reject) => {

      getAuth().signOut()
      .then(() => {
        messageToSnack("SignOut")
        resolve()
      })
    })
  }

/**
 * Initialize the firebase listener on auth state change
 */
export const initUser = () => {
  const auth = getAuth()
  const firebaseUser = useFirebaseUser();

  onAuthStateChanged(auth, (user) => {
    firebaseUser.value = user
    if (!user) {
      navigateTo('/')
    }
  })
}

/**
 * Send password reset email
 * @param email - the email
 * @throws Throws the firebase error
 */
export const sendPasswordReset = (email:string) => {
  return new Promise((resolve, reject) => {
    const auth = getAuth()

    sendPasswordResetEmail(auth,email)
    .then(() => {
      messageToSnack("Email sent to "+ email)
    })
    .catch((error) => {
      errorToSnack(error, "Error on sending email to reset password")
    })
  })
}
