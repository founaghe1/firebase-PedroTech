import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import './form.css';

// typescript
interface CreateFormData{
    title: string;
    description: string;
}

export const Form = () =>{

    // recuperation de l'utilisateur
    const [ user ] = useAuthState(auth)

    const shema = yup.object().shape({
        title: yup.string().required('Le titre est obligatoire'),
        description: yup.string().required('La description est obligatoire')
    });

    const { register, handleSubmit, formState: { errors } }= useForm <CreateFormData>({
        resolver: yupResolver(shema)
    });

    const postsRef = collection(db, "poste");

    const onCreatePost = async (data: CreateFormData) =>{
        await addDoc(postsRef, {
            title: data.title,
            description: data.description,
            username: user?.displayName,
            userId: user?.uid,
        })
        
    }

    return (
        <form className="formuler" onSubmit={handleSubmit(onCreatePost)}>

            <div className="divForm">
            <h1 className="h1">Créer un poste</h1>

            <div>
                <input className="input" placeholder="Title..." {...register("title")} />
                <p style={{color: "red"}}> {errors.title?.message} </p>
            </div>

            <div>
                <textarea  className="textarea" placeholder="Description..." {...register("description")} />
                <p style={{color: "red"}}> {errors.description?.message} </p>
            </div>

            <input className="btnForm" type="submit" />
            </div>

        </form>
    )
}