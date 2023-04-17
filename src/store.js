import {configureStore, createSlice} from '@reduxjs/toolkit'
import user from './store/userSlice'

// let user = createSlice({ //state 하나를 slice라고 부름
//     name: 'user',
//     initialState: 'kim',
//     reducers : {
//         changeName(state) {
//             return 'john ' + state
//         },
//         func() {
//
//         }
//     }
// })

let stock = createSlice({ //state 하나를 slice라고 부름
    name: 'stock',
    initialState: [10, 11, 12]
})

let cart = createSlice({
    name: 'cart',
    initialState: [
        {id : 0, name : 'White and Black', count : 2},
        {id : 2, name : 'Grey Yordan', count : 1}
    ],
    reducers : {
        addCount(state, action) {
            let idx = state.findIndex((a)=>{
                return a.id === action.payload
            })
            state[idx].count++
        },
        addItem(state, action) {
            state.push(action.payload)
        }
    }
})

export default configureStore({
    reducer: {
        user : user.reducer,
        stock : stock.reducer,
        cart : cart.reducer
    }
})

export let { addCount, addItem } = cart.actions