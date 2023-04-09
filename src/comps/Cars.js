import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CarComp from './Car';
import {firestore} from '../firebaseConfig'
import {collection, setDoc, doc, deleteDoc, addDoc} from 'firebase/firestore' 

function CarsComp() {
  const storeData = useSelector(state => state);
  
  const saveAll = () =>
  {
    storeData.cars.forEach(async car => {
      switch (car.status)
      {
        case "NEW":
          let obj = {model: car.model, year: car.year, color: car.color}
          await addDoc(collection(firestore, 'cars'), obj);
          break;

        case "DELETED":
          await deleteDoc(doc(firestore, 'cars', car.id));
          break;

        case "UPDATED":
          let obj2 = {model: car.model, year: car.year, color: car.color}
          await setDoc(collection(firestore, 'cars'), obj2)
          break;

        default:
          break;
      }
    }) 
  }

  return (
    <div className="App">
      <h3>Cars</h3>
      {
        storeData.cars.filter(x => x.status !== "DELETED").map(item => {
          return <CarComp key={item.id} carData={item} />
        })
      }
      <br/>
      <button onClick={saveAll}>Save all</button>
    </div>
  )
}
export default CarsComp;
//Option 2-
// const Cars = (props) => {
//   const style ={border: 'solid 3px black' };
//   const dispatch = useDispatch();
//   const car = props.car
//   const onDelete = () => {
//     console.log('deleted');
//     dispatch({type : "DELETE", payload : car})
//   }
//   return (
//     <div style={style}>
//       Model: {car.model} <br/>
//       Year: {car.year}<br/>
//       Color: {car.color}<br/>
//       <button onClick={onDelete}>Delete Car</button>
//     </div>
//   )
// }

// export default Cars