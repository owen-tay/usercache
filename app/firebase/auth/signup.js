import firebase_app from "../../config";
import { createUserWithEmailAndPassword, getAuth, updateProfile } from "firebase/auth";

const auth = getAuth(firebase_app);

export default async function signUp(email, password, displayName) {
    let result = null, error = null;
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName });
        result = userCredential;
    } catch (e) {
        error = e;
    }
    return { result, error };
}