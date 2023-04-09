import {useState} from 'react'
import { useDispatch } from 'react-redux'
const AddCar = () => {
  const dispatch = useDispatch();
  //In the 1st option you don't need the new status
  const [car, setCar] = useState({model: '', year : 1990 , color : '', status: "NEW"})

  const add = () =>
  {
    setCar(car)
   dispatch({type : "ADD", payload : car})
   console.log(car);
   console.log('ADDED')
  }
 
  return (
    <div>
      Mode: <input type="text" onChange={(e) => setCar({...car, model: e.target.value})}/> <br/>
      Year: <input type="number" onChange={(e) => setCar({...car, year: e.target.value})}/> <br/>
      Color: <input type="text" onChange={(e) => setCar({...car, color: e.target.value})}/> <br/>
      <button onClick={add}>Add</button> 
    </div>
  )
}
export default AddCar