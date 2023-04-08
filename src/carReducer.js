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

            return {...state, cars : arr}

        default:
            return state
    }
}