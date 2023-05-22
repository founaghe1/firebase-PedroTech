import { auth, provider } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import './login.css';

export const Login = () =>{
    // redirect vers le homePage
    const navigate = useNavigate();

    // Authentification par google
    const signInWithGoogle = async () =>{
        const result = await signInWithPopup(auth, provider);
        console.log(result);
        navigate('/');
    }

    return (
        <div>
            <h3>Sign In with Google to continue</h3>
            <button className="btnLog" onClick={signInWithGoogle}>Sign in</button>
        </div>
    );
}