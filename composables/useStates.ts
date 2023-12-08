import type { User } from "firebase/auth";
/**
 * State for firebaseUser
 */
export const useFirebaseUser = () => useState<User>("firebaseUser");
/**
 * State for snackbar message
 */
export const useSnackBarMessage = () => useState<String>("snackBarMessage", () => "");
