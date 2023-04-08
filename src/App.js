import './App.css';
import {firestore} from './firebaseConfig'
import {query, collection, where, getDocs, doc, deleteDoc, addDoc} from 'firebase/firestore' 
//You can use 'where' to filter out the fetched data in line 15
import AddCarsComp from './comps/AddCar'
import CarsComp from './comps/Cars'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from "react";
function App() {
  const storeData = useSelector(state => state);
  const dispatch = useDispatch();
  const [reduxCars, setReduxCars] = useState([]);
  let carsData = [];
  
  const fetchData = async () => {
    const q = query(collection(firestore, 'cars'))
    const querySnapshot = await getDocs(q); //Source: updated Firebase's documentation
    querySnapshot.forEach(doc =>
     {
       let obj = { id : doc.id, model : doc.data().model, year : doc.data().year, color : doc.data().color};
       console.log(obj)
       carsData.push(obj);
     })
    dispatch({type: "LOAD", payload: carsData})
    setReduxCars(carsData);

    console.log("🚀 ~ file: App.js:27 ~ fetchData ~ reduxCars:", reduxCars)
  }

  useEffect(() => {
    fetchData();
  }, []); //This is only to call fetchData only once all comps are mounted.
  
  const firebaseSync = async () => {
    
    const newCars = storeData.cars.filter(car => !reduxCars.some(c => c.id === car.id));
    console.log("🚀 ~ file: App.js:33 ~ firebaseSync~ storeData:", storeData)
    console.log("🚀 ~ file: App.js:33 ~ firebaseSync~ reduxCars:", reduxCars)
    console.log("🚀 ~ file: App.js:33 ~ firebaseSync adding~ newCars:", newCars)
    if (newCars.length > 0) {
      newCars.forEach(async car => {
        await addDoc(collection(firestore, 'cars'), car);
      })
    }

    let deletedCars = reduxCars.filter(car => !storeData.cars.some(c => c.id === car.id));
    console.log("🚀 ~ file: App.js:38 ~ firebaseSync deleting~ deletedCars:", deletedCars);
    if (deletedCars.length > 0) {
      deletedCars.forEach(async car => {
        const tempId = car.id; 
        await deleteDoc(doc(firestore, 'cars', tempId));
        deletedCars = 0;
      })
    }
  }
  return (
    <div className="App">
      <AddCarsComp cars={storeData.cars}></AddCarsComp>
      {storeData.cars?
      storeData.cars.map((car, index) => {
        const tempId = car.id? car.id : index
        return(
          <CarsComp key={tempId} car={car}/>
        )
        }):''}<br/>
      <button onClick={firebaseSync}>Save changes</button>
    </div>
  );
}

export default App;
