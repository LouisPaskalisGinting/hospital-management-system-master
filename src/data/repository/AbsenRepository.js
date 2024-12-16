import { firestore } from "../..";

import {
  getDocs,
  collection,
  where,
  query,
  setDoc,
  doc,
} from "firebase/firestore";
import { formatSimpleDate } from "../../util/DateFormatter";

export class AbsenRepository {
  async fetchAbsen(d) {
    if (d === null) {
      const snapshot = await getDocs(collection(firestore, "absen"));
      var data = [];
      snapshot.forEach((doc) => {
        data.push(doc.data());
      });
      return data;
    } else {
      const yyyyMMdd = formatSimpleDate(d);
      const q = query(
        collection(firestore, "absen"),
        where("dateString", "==", yyyyMMdd)
      );
      const snapshot = await getDocs(q);
      var data = [];
      snapshot.forEach((doc) => {
        data.push(doc.data());
      });
      return data;
    }
  }

  async insertAbsen(data) {
    const docRef = doc(firestore, "absen", `${data.dateString}-${data.userId}`);
    await setDoc(docRef, data);
    return docRef;
  }
}