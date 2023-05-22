import 'bootstrap/dist/css/bootstrap.css'; 
import { Post as InterfPost } from "./main-page"
import { addDoc, getDocs, collection, query, where, doc, deleteDoc } from 'firebase/firestore';
import { auth, db } from '../../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect, useState } from 'react';



interface Props{
    post: InterfPost
}

interface like{
    likeId: string;
    userId: string;
}

export const Post = (props: Props) =>{

    // destructor 
    const { post } = props;

    // partie pour Liker
    const likesRef = collection(db, "likes");

    const [likes, setLikes] = useState<like[] | null>(null)

    const likesDoc = query(likesRef, where("postId", '==', post.id));

    const getLikes = async () =>{
        const data = await getDocs(likesDoc);
        setLikes(data.docs.map((doc) => ({ userId: doc.data().userId, likeId: doc.id})));
    }

    const addLike = async () =>{
        try{

            const newDoc = await addDoc(likesRef, {
                userId: user?.uid,
                postId: post.id 
            });
    
            // Actualisation auto lors du click sur like ou dislike icon
            if (user) {
                setLikes((prev) => prev ? [...prev, {userId: user.uid, likeId: newDoc.id}] : [{userId: user.uid, likeId: newDoc.id}]);  
            }
        }catch(err){
            console.log(err);
        }
    };

    const removeLike = async () =>{
        try{
            const likeToDeleteQuery = query(likesRef, where("postId", '==', post.id), where("userId", "==", user?.uid));

            const likeToDeleteData = await getDocs(likeToDeleteQuery);

            const likeId = likeToDeleteData.docs[0].id

            const likeToDelete = doc(db, "likes", likeId)
            await deleteDoc(likeToDelete);
    
            // Actualisation auto lors du click sur like ou dislike icon
            if (user) {
                setLikes((prev) => prev && prev.filter((like) => like.likeId !== likeId));  
            }
        }catch(err){
            console.log(err);
        }
    };

    

    useEffect(() =>{
        getLikes();
    }, [] );


    const [ user ] = useAuthState(auth);

    const hasUserLike = likes?.find((like) => like.userId === user?.uid);

    return (
        <div>
            <div className="title">
                <h2>{post.title}</h2>
            </div>
            <div className="description">
                <p>{post.description}</p>
            </div>
            <div className="footer">
                <p > @{post.username} </p>
                <button onClick={hasUserLike ? removeLike : addLike } className="me-2 btn"> {hasUserLike ? <> &#128078;</> : <>&#128077;</>} </button>
                {likes && <p>Likes: {likes?.length} </p>}
            </div>

        </div>
    )
}