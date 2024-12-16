import { collection, deleteDoc, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { firestore } from "../..";

export class ObatRepository {

  async fetchObat() {
    const snapshot = await getDocs(collection(firestore, "obat"));
    var data = [];
    snapshot.forEach((doc) => {
      data.push(doc.data());
    });
    return data;
  }
  async ObatCount() {
    const snapshot = await getDocs(collection(firestore, "obat"));
    const obats = new Set();

    snapshot.forEach((doc) => {
      const obat = doc.data();
      if (obat.name) {
        obats.add(obat.name);
      }
    });

    return obats.size; // Return the total obats of unique name
  }
  
  async setObat(obat) {
    const docRef = doc(firestore, "obat", obat.id);
    await setDoc(docRef, obat);
  }

  async deleteObat(id) {
    const docRef = doc(firestore, "obat", id);
    await deleteDoc(docRef);
  }
}