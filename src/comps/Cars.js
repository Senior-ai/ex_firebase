import React from 'react'
import { useDispatch } from 'react-redux'
const Cars = (props) => {
  const style ={border: 'solid 3px black' };
  const dispatch = useDispatch();
  const car = props.car
  const onDelete = () => {
    console.log('deleted');
    dispatch({type : "DELETE", payload : car})
  }
  return (
    <div style={style}>
      Model: {car.model} <br/>
      Year: {car.year}<br/>
      Color: {car.color}<br/>
      <button onClick={onDelete}>Delete Car</button>
    </div>
  )
}

export default Cars