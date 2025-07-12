import { BaserowClient } from "@watzon/baserow";

/**
 * Sign in user in firebase with email and password
 * @param email - the email
 * @param password - the password
 * @returns A Promise that resolve the auth user
 */
export const signInUserBr = (email:string, password:string) :Promise<IAuthUser> => {
    return new Promise((resolve, reject) => {
        const { $baserow } = useNuxtApp()
        const client = $baserow as BaserowClient
        client.user.login(email, password)
        .then((tokens) => {
          console.log("tokens:", tokens)
          const authUser = new AuthUser(tokens.refresh_token, false, email)
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
export const signOutUserBr = (refreshToken:string) :Promise<void> => {
    return new Promise((resolve, reject) => {
        const { $baserow } = useNuxtApp()
        const client = $baserow as BaserowClient
        client.user.logout(refreshToken)
          .then(() => {
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
    })
  }

// /**
//  * Initialize the firebase listener on auth state change
//  */
// export const initUser = (callback:any) => {
//   const auth = getAuth()
//   onAuthStateChanged(auth, (user) => {
//     if (user) {
//       const authUser = new AuthUser(user.uid, user.isAnonymous, user.email)
//       callback(authUser)
//     } else {callback(undefined)}
//   })
// }

// /**
//  * Send password reset email
//  * @param email - the email
//  * @throws Throws the firebase error
//  */
// export const sendPasswordReset = (email:string) :Promise<void> => {
//   return new Promise((resolve, reject) => {
//     const auth = getAuth()
//     sendPasswordResetEmail(auth,email)
//     .then(() => {
//       resolve()
//     })
//     .catch((error) => {
//       reject(error)
//     })
//   })
// }
