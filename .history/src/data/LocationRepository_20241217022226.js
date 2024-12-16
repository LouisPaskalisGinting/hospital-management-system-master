import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { firestore } from "../..";

export class LocationRepository {
  async fetchLocation() {
    const docRef = await doc(firestore, "location", "zjxfwn1ufRAP1IyN9pTh");
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      return snapshot.data();
    } else {
      return null;
    }
  }

  async setLocation(location) {
    const docRef = doc(firestore, "location", "zjxfwn1ufRAP1IyN9pTh");
    await setDoc(docRef, location);
  }
}
