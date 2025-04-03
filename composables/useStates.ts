/**
 * State for AuthUser
 */
export const useAuthUser = () => useState<IAuthUser|undefined>("authUser");
/**
 * State for snackbar message
 */
export const useSnackBarMessage = () => useState<ISnackMessage>("snackBarMessage");

/**
 * State for factures
 */
export const useFactures = () => useState<IFacture[]>("factures");

/**
 * State for facture
 */
export const useFacture = () => useState<IFacture>("facture");

/**
 * State for CAs
 */
export const useCas = () => useState<ICa[]>("cas");

/**
 * State for Clients
 */
export const useClients = () => useState<IClient[]>("clients");

/**
 * State for filter
 */
export const useFilter = () => useState<IFilter>("filter", () => new Filter());

/**
 * State for lignes factures
 */
export const useLignes = () => useState<ILigne[]>("lignes");
