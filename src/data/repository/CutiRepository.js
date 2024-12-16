import {
    collection,
    doc,
    getDoc,
    getDocs,
    updateDoc,
  } from "firebase/firestore";
  import { firestore } from "../..";
  import { AbsenRepository } from "./AbsenRepository";
  import { formatSimpleDate } from "../../util/DateFormatter";
  
  export class CutiRepository {
    async fetchCuti() {
      const snapshot = await getDocs(collection(firestore, "cuti"));
      var data = [];
      snapshot.forEach((doc) => {
        data.push(doc.data());
      });
      return data;
    }
  
    async fetchCutiById(id) {
      const docRef = doc(firestore, "cuti", id);
      const snapshot = await getDoc(docRef);
      if (snapshot.exists()) {
        return snapshot.data();
      } else {
        return null;
      }
    }
  
    async allowCuti(id) {
      const cuti = await this.fetchCutiById(id);
      const absenRepo = new AbsenRepository();
      const start = cuti.startDate.toDate();
      const end = cuti.endDate.toDate();
      console.log(start, end);
      let tempDate = start;
      while (tempDate <= end) {
        await absenRepo.insertAbsen({
          date: tempDate,
          dateString: formatSimpleDate(tempDate),
          userId: cuti.userId,
          username: cuti.username,
          type: "Cuti",
          role: cuti.role,
          uuid: `${formatSimpleDate(tempDate)}-${cuti.userId}`,
        });
        tempDate.setDate(tempDate.getDate() + 1);
      }
      const docRef = doc(firestore, "cuti", id);
      await updateDoc(docRef, {
          status: "Diterima"
      });
    }
  
    async denyCuti(id) {
      const docRef = doc(firestore, "cuti", id);
      await updateDoc(docRef, {
        status: "Ditolak",
      });
    }
  }  