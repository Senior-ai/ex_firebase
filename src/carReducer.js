export function appReducer(state = {cars: []}, action)
{
    switch (action.type)
    {
        case "LOAD":
            return {...state, cars: action.payload};
        case "ADD":
            return {...state, cars: [...state.cars, action.payload]};
        case "DELETE":
            let arr = [...state.cars];
            let index = arr.findIndex(x => x.id === action.payload.id);            
            if(index >= 0)
            {
                arr.splice(index,1)
            }
            return {...state, cars : arr};
        case "UPDATE":
            let obj = action.payload;
            let arr2 = state.cars;
            let index2 = arr2.findIndex(x => x.id === obj.id);
            if (index >= 0)
            {
                if (obj.status != "NEW")
                    {obj.status = "UPDATED"}
                arr2[index2] = obj;
            }
            return {...state, cars: arr2}

        default:
            return state
    }
}