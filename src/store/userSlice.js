import {createSlice} from "@reduxjs/toolkit";

let user = createSlice({ //state 하나를 slice라고 부름
    name: 'user',
    initialState: { name : 'kim', age : 20 }, //수정이 편해 문자하나만 필요해도 일부러 { }안에 담기도 함
    reducers : {
        changeName(state) {
            // return { name : 'park', age : 20 }
            state.name = 'park'
        },
        increase(state, action) { //state 변경함수를 action이라고 합니다
            state.age += action.payload
        }
    }
})

export let { changeName, increase } = user.actions

export default user