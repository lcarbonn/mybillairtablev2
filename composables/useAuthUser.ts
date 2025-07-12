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
      const refresh_token = useAuthUser().value?.uid
      if(!refresh_token) resolve()
      else {
        signOutUserBr(refresh_token)
        .then(() => {
          useAuthUser().value = undefined
          messageToSnack("SignOut")
          resolve()
        })
        .catch((error) => {
          errorToSnack("Error on signOut", error)
          reject(error)
        })
      }
    })
  }

// /**
//  * Initialize the authUser listener on auth state change
//  */
// export const initUser = () => {
//     const callback = async (authUser:IAuthUser) => {
//         useAuthUser().value = authUser
//         if(!authUser) {
//           await navigateTo('/')
//         }
//     }
//     initUserFirebase(callback)
// }

/**
 * Send password reset email
 * @param email - the email
 */
export const sendPasswordReset = (email:string) :Promise<void> => {
  return new Promise((resolve, reject) => {
    sendPasswordResetFirebase(email)
    .then(() => {
      messageToSnack("Reset password email sent to "+ email)
      resolve()
    })
    .catch((error) => {
      errorToSnack("Error on sending email to reset password", error)
      reject(error)
    })
  })
}
