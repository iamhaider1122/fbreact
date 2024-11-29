
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { collection, doc, setDoc, getDocs, getFirestore } from "firebase/firestore";
import app from './firebase';
function FireStoreDb() {

  const db = getFirestore(app);
  const storeData = async () => {

    const citiesRef = collection(db, "cities");
    console.log('sending data...');
    await setDoc(doc(citiesRef, "SF"), {
      name: "San Francisco", state: "CA", country: "USA",
      capital: false, population: 860000,
      regions: ["west_coast", "norcal"]
    });
    await setDoc(doc(citiesRef, "LA"), {
      name: "Los Angeles", state: "CA", country: "USA",
      capital: false, population: 3900000,
      regions: ["west_coast", "socal"]
    });
    await setDoc(doc(citiesRef, "DC"), {
      name: "Washington, D.C.", state: null, country: "USA",
      capital: true, population: 680000,
      regions: ["east_coast"]
    });
    await setDoc(doc(citiesRef, "TOK"), {
      name: "Tokyo", state: null, country: "Japan",
      capital: true, population: 9000000,
      regions: ["kanto", "honshu"]
    });
    await setDoc(doc(citiesRef, "BJ"), {
      name: "Beijing", state: null, country: "China",
      capital: true, population: 21500000,
      regions: ["jingjinji", "hebei"]
    });
  }

  const getData = async () => {

    console.log('Fetching data...');

    try {
      const querySnapshot = await getDocs(collection(db, "ities"));
      if (querySnapshot.empty) {
        console.error('Error: Collection "ities" does not exist or is empty.');
        return;
      }
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
      });
    } catch (error) {
      console.error('Error Fetching Data:', error);
    }
  }

  return (
    <>

      <button className='btn btn-outline-primary' onClick={storeData}>Store data</button>
      <button className='btn btn-outline-secondary' onClick={getData}>Get Data</button>

    </>
  );
}

export default FireStoreDb;