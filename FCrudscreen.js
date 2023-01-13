import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Button,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { TextInput } from "react-native-paper";
import {
  collection,
  doc,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  getDocs,
  where,
  query,
} from "firebase/firestore";
import { db } from "../firebase";

const FCrudscreen = () => {
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");

  function createDcumt() {
    setDoc(doc(db, "users", "LA"), {
      username: username,
      email: email,
    })
      .then(() => {
        // Data saved successfully!
        console.log("data submitted");
      })
      .catch((error) => {
        // The write failed...
        console.log(error);
      });
  }
  //add new document
  function addDcumt() {
    addDoc(collection(db, "users"), {
      username: username,
      email: email,
    })
      .then(() => {
        // Data saved successfully!
        console.log("data submitted");
      })
      .catch((error) => {
        // The write failed...
        console.log(error);
      });
  }
  //update document
  function updateDcumt() {
    updateDoc(doc(db, "users", "LA"), {
      username: username,
      email: email,
    })
      .then(() => {
        // Data saved successfully!
        console.log("data submitted");
      })
      .catch((error) => {
        // The write failed...
        console.log(error);
      });
  }

  //delete document
  function deleteDcumt() {
    deleteDoc(doc(db, "users", "1xqbg9DP0mLsNPHXK9jG"));
  }
  //Read document
  function readDcumt() {
    const docRef = doc(db, "users", "LA");
    getDoc(docRef)
      .then((docData) => {
        if (docData.exists()) {
          // console.log("Document data:", docData.data());
          setName(docData.data().username);
          setEmail(docData.data().email);
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }
  //Read all documents
  function readAllDcumt() {
    const q = collection(db, "users");
    getDocs(q).then((docSnap) => {
      let users = [];
      docSnap.forEach((doc) => {
        users.push({ ...doc.data(), id: doc.id });
      });
      console.log("Document data: ", users);
    });
  }

  //get data using a query
  function readDcumtUsingQuery() {
    getDocs(
      query(collection(db, "users"), where("email", "==", "user123@gmail.com"))
    ).then((docSnap) => {
      let users = [];
      docSnap.forEach((doc) => {
        users.push({ ...doc.data(), id: doc.id });
      });
      console.log("Document data: ", users[0].username);
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Firebase crud!</Text>

      <TextInput
        value={username}
        onChangeText={(text) => setName(text)}
        placeholder="Username"
        style={styles.textBoxes}
      />
      <TextInput
        value={email}
        onChangeText={(text) => setEmail(text)}
        placeholder="Email"
        style={styles.textBoxes}
      />

      <TouchableOpacity style={styles.selectButton} onPress={deleteDcumt}>
        <Text style={styles.buttonText}>Submit Data</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.selectButton}
        onPress={readDcumtUsingQuery}
      >
        <Text style={styles.buttonText}>Fetch Data</Text>
      </TouchableOpacity>
      {/* <button onPress={create}>Submit Data </button> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
  },
  textBoxes: {
    width: "80%",
    fontSize: 18,
    padding: 4,
    // borderColor: "Gray",
    // borderWidth: 0.2,
    // borderRadius: 10,
    marginBottom: 10,
    marginTop: 10,
  },
  selectButton: {
    borderRadius: 5,
    width: 150,
    height: 50,
    backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default FCrudscreen;
