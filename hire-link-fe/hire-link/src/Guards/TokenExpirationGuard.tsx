import { useTokenExpirationChecker } from "../Services/Utilities";


const TokenExpirationGuard = () => {
    useTokenExpirationChecker();
    return null; // không render gì
};

export default TokenExpirationGuard;