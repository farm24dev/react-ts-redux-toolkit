import {
  UserCredential,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { firebaseApp } from "../configs/firebase";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
const auth = getAuth(firebaseApp);

const db = getFirestore(firebaseApp);

export async function registerUser(
  firstName: string,
  lastName: string,
  email: string,
  password: string
) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    //save profile to firestore
    await setDoc(doc(db, "users", userCredential.user.uid), {
      firstName: firstName,
      lastName: lastName,
      email: email,
      photoUrl: "https://codingthailand.com/site/img/nopic.png",
      role: "member",
    });

    return userCredential;
  } catch (error) {
    throw error;
  }
}

export async function login(
  email: string,
  password: string
): Promise<UserCredential> {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    throw error;
  }
}

export async function logout(): Promise<void> {
  return signOut(auth);
}

export async function getCurrentAccount<AccountType>(userId: string) {
  const accountRef = doc(db, "users", userId);
  const docSnap = await getDoc(accountRef);

  if (!docSnap.exists()) {
    return null;
  }

  let accTep = docSnap.data() as AccountType;
  
  let acc = {
    userId,
    ...accTep,
  };
  return acc;
}
