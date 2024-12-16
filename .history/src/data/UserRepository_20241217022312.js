import {
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    query,
    setDoc,
    where,
  } from "firebase/firestore";
  import { firebaseAuth, firestore } from "../..";
  import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
  
  export class UserRepository {
    
    async fetchCurrentUser() {
      const firebaseUser = firebaseAuth.currentUser;
      const docRef = doc(firestore, "user", firebaseUser.uid);
      const snapshot = await getDoc(docRef);
  
      if (snapshot.exists()) {
        return snapshot.data();
      } else {
        return null;
      }
    }
  
    async getUserCount() {
      const snapshot = await getDocs(collection(firestore, "user"));
      return snapshot.size;
    }
  
    async addUser(user) {
      const docRef = doc(firestore, "user", user.id);
      await setDoc(docRef, user);
    }
  
    async deleteUser(userId) {
      const docRef = doc(firestore, "user", userId);
      await deleteDoc(docRef);
    }
  
    async findUser(name) {
      const q = query(
        collection(firestore, "user"),
        where("name", "==", name)
      );
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        const doc = snapshot.docs[0]; // Access the first document
        return doc.data(); // Return its data
      }
      return null;
    }
  
    async countRoles() {
      const snapshot = await getDocs(collection(firestore, "user"));
      const roles = new Set();
  
      snapshot.forEach((doc) => {
        const user = doc.data();
        if (user.role) {
          roles.add(user.role);
        }
      });
  
      return roles.size; // Return the total number of unique roles
    }
  
    async getAllUser() {
      const snapshot = await getDocs(collection(firestore, "user"));
      var data = [];
      snapshot.forEach((doc) => {
        data.push(doc.data());
      });
      return data;
    }
  
    async getUserByEmail(email) {
      const q = query(collection(firestore, "user"), where("email", "==", email));
      const snapshot = await getDocs(q);
      return snapshot.docs.map((doc) => doc.data())[0];
    }
  }  