import type { User } from "firebase/auth";
/**
 * State for firebaseUser
 */
export const useFirebaseUser = () => useState<User|null>("firebaseUser");
/**
 * State for snackbar message
 */
export const useSnackBarMessage = () => useState<String>("snackBarMessage", () => "");

/**
 * State for factures
 */
export const useFactures = () => useState<IFacture[]>("factures");

/**
 * State for CAs
 */
export const useCas = () => useState<ICa[]>("cas");
