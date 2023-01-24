import {
    getDocs as getDocsFirestore,
    getDoc as getDocFirestore,
    addDoc as addDocFirestore,
    setDoc,
    collection,
    doc,
} from "firebase/firestore";
import { db } from '../firebase-config';

export default function useFirestore() {

    async function getDocs(path: string) {
        let data = (await getDocsFirestore(collection(db, path))).docs.map(doc => ({ ...doc.data(), id: doc.id }));
        return data;
    }

    async function getDoc(path: string, pathSegments: string) {
        const docRef = doc(db, path, pathSegments);
        const data = (await getDocFirestore(docRef)).data();
        return data || null;
    }

    async function addDoc(path: string, data: any) {
        await addDocFirestore(collection(db, path), data);
    }

    async function editDoc(path: string, pathSegments: string, data: any) {
        await setDoc(doc(db, path, pathSegments), data, { merge: true });
    }

    return { getDocs, getDoc, addDoc, editDoc };
}
