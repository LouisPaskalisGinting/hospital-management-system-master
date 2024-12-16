import { query, where, collection, deleteDoc, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { firestore } from "../..";

export class HistoryObatRepository {
  async fetchAllObat() {
    const snapshot = await getDocs(collection(firestore, "obat"));
    var data = [];
    snapshot.forEach((doc) => {
      data.push(doc.data());
    });
    return data;
  }
  async cekSisaObat(value) {
    const q = query(
      collection(firestore, "historyobat"),
      where("name", "==", value)
    );

    const snapshot = await getDocs(q);
    let totalJumlahKeluar = 0;

    // Iterate over the snapshot of documents and sum the jumlah_keluar
    snapshot.forEach((doc) => {
        const data = doc.data();
        let jumlahKeluar = data.jumlah_keluar; // assuming jumlah_keluar could be a string
        
        // Check if jumlahKeluar is a string and convert it to a number
        if (typeof jumlahKeluar === 'string') {
            jumlahKeluar = parseFloat(jumlahKeluar);
        }

        // If jumlahKeluar is a valid number, add it to the total
        if (!isNaN(jumlahKeluar)) {
            totalJumlahKeluar += jumlahKeluar;
        }

      });
      return totalJumlahKeluar;
  }
  async fetchObat(value) {
    const q = query(
      collection(firestore, "historyobat"),
      where("name", "==", value)
    );

    const snapshot = await getDocs(q);
    var data = [];
    snapshot.forEach((doc) => {
      data.push(doc.data());
    });
    return data;
  }

  async setObat(obat) {
    const docRef = doc(firestore, "historyobat", obat.id);
    await setDoc(docRef, obat);
  }

  async deleteObat(id) {
    const docRef = doc(firestore, "obat", id);
    await deleteDoc(docRef);
  }
}