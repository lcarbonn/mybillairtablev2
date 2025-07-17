import { BaserowClient } from "@watzon/baserow";

/**
 * Sign in user with email and password
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
          const authUser = new AuthUser(tokens.refresh_token, false, email, tokens.access_token)
          resolve(authUser)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

/**
 * Sign out the current user
 * @throws Throws the error
 */
export const signOutUserBr = () :Promise<void> => {
    return new Promise((resolve, reject) => {
        const { $baserow } = useNuxtApp()
        const client = $baserow as BaserowClient
        
        // client.user.logout(refreshToken)
        //   .then(() => {
        //     resolve()
        //   })
        //   .catch((error) => {
        //     reject(error)
        //   })
    })
  }

// /**
//  * Send password change
//  * @param oldPassword - the old password
//  * @param newPassword - the new password
//  * @throws Throws the error
//  */
// export const sendPasswordChangeBr = (oldPassword:string, newPassword:string) :Promise<void> => {
//   return new Promise((resolve, reject) => {
//     const { $baserow } = useNuxtApp()
//     const client = $baserow as BaserowClient
//     client.user.sendPasswordResetEmail(oldPassword, newPassword)
//     .then(() => {
//       resolve()
//     })
//     .catch((error) => {
//       reject(error)
//     })
//   })
// }
