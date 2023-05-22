import { Link } from 'react-router-dom';
import { auth } from '../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import './Navbar.css';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export const Navbar = ()=>{
    // reactualisation automatique du profile 
    const [ user ] = useAuthState(auth);
    const navigate = useNavigate();

    const signUserOut = async ()=>{
        await signOut(auth);
        navigate('/login');
    }

    return( 
        <div className="navbar">
            <div className="link"> 
                <Link to='/' className='home'>Home</Link>
                {user ? (<Link to='/post' className='home'>Create Posts</Link>) : (
                <Link to='/login' className='login'>Login</Link>
                )}
                <button className='login' onClick={signUserOut}>Log Out</button>
            </div>
            

            {/* Affichage du profil */}
            <div className='profil'>
                {/* delete the image if we logout */}
                { user && ( 
                    <>
                        <p>{user?.displayName}</p>
                        <img src={user?.photoURL || ""} alt='imgProfil' width="100" height="100" />
                    </>
                )

                }
                
            </div>
        </div>
    );
}