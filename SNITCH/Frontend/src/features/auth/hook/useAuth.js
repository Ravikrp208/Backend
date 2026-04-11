import { setError, setLoading, setUser } from "../state/auth.slice";
import { registerUser } from "../service/auth.api"; 
import { useDispatch } from "react-redux";

export function useAuth() {
    
    const

    async function handleRegister({email , contact, password, fullname}) {
        

        const data = await registerUser({email , contact, password, fullname});
        setUser(data.user);
    }
    return { handleRegister };
}