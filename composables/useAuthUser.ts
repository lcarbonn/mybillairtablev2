/**
 * Sign in user with email and password
 * @param email - the email
 * @param password - the password
 * @returns A Promise that resolve the auth user
 */
export const signInUser = (email:string, password:string) :Promise<IAuthUser> => {
    return new Promise((resolve, reject) => {
        signInUserBr(email,password)
        .then((authUser) => {
            messageToSnack("Hello " + authUser.email)
            useAuthUser().value = authUser
            resolve(authUser)
        })
        .catch((error) => {
            errorToSnack("Error on login", error)
            reject(error)
        })
    })
  }

/**
 * Sign out the current user
 */
export const signOutUser = () :Promise<void> => {
    return new Promise((resolve, reject) => {
        useAuthUser().value = undefined
        messageToSnack("SignOut")
        resolve()
    })
  }

// /**
//  * Send password change
//  * @param oldPassword - the old password
//  * @param newPassword - the new password
//  */
// export const sendPasswordReset = (oldPassword:string, newPassword:string) :Promise<void> => {
//   return new Promise((resolve, reject) => {
//     sendPasswordChangeBr(oldPassword, newPassword)
//     .then(() => {
//       messageToSnack("Passwor changed")
//       resolve()
//     })
//     .catch((error) => {
//       errorToSnack("Error Password change", error)
//       reject(error)
//     })
//   })
// }
