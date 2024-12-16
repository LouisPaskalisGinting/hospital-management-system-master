import { query, where, collection, doc, getDoc, getDocs, setDoc, updateDoc  } from "firebase/firestore";
import { firestore } from "../..";

export class PayrollRepository {
  async fetchPayroll() {
    const snapshot = await getDocs(collection(firestore, "payroll"));
    var data = [];
    snapshot.forEach((doc) => {
      data.push(doc.data());
    });
    return data;
  }

  async ambilGaji(gaji) {
    const docRef = doc(firestore, "payroll", gaji.id);
    await setDoc(docRef, gaji);
  }

  async  updateStatus(value) {
    // Create the query to fetch documents where "id" matches the value
    const q = query(
        collection(firestore, "payroll"),
        where("name", "==", value.name),
        where("role", "==", value.role),
        where("id", "==", value.id),
        where("month", "==", value.month),
        where("taken", "==", value.taken),
    );

    // Fetch the documents
    const snapshot = await getDocs(q);

    // Check if a document exists and retrieve its status
    if (!snapshot.empty && value.taken === false) {
        // Update the 'taken' field with the new value

        const docRef = snapshot.docs[0].ref;  // Get a reference to the document
        await updateDoc(docRef, {
          taken: true  // Update the 'taken' field
        });
        
        return "DIAMBIL";
    } 
    else {
        // If no document is found with the provided id
        return "GAGAL DIAMBIL";  // Or return false, depending on your use case
    }
}
  async  cekStatus(value) {
    // Create the query to fetch documents where "id" matches the value
    const q = query(
        collection(firestore, "payroll"),
        where("name", "==", value.name),
        where("role", "==", value.role),
        where("id", "==", value.id),
        where("month", "==", value.month),
        where("taken", "==", value.taken),
    );

    // Fetch the documents
    const snapshot = await getDocs(q);
    // Check if a document exists and retrieve its status
    if (!snapshot.empty && value.taken === false) {
        return false;
    } 
    else {
        // If no document is found with the provided id
        return true;  // Or return false, depending on your use case
    }
}

  async getPayrollCount() {
    const snapshot = await getDocs(collection(firestore, "payroll"));
    return snapshot.size;
  }

  async addPayroll(payroll) {
    const docRef = doc(firestore, "payroll", payroll.id);
    await setDoc(docRef, payroll);
  }
}