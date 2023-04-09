import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


function CarComp(props) {
    const storeData = useSelector(state => state);
    const dispatch = useDispatch();

    const [car, setCar] = useState({status: '', id: '', model: '', color: '', year: 0})

    useEffect(() => {
        setCar(props.carData)
    }, []);

    return (
        <div className="App" style={{width: '300px', border: '3px solid red'}}>
            <h3>Car Data</h3>
            
            Model: {car.model} <br/>
            Color: {car.color} <br/>
            Year: {car.year} <br/><br/>
            <button onClick={() => dispatch({type: "UPDATE", payload: car})}>Update</button>
            <button onClick={() => dispatch({type: "DELETE", payload: car})}>Delete</button>
        </div>
    );
}

export default CarComp