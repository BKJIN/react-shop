import {Table} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import { changeName, increase } from "./../store/userSlice"
import {addCount} from "../store";
import {memo, useMemo, useState} from "react";

let Child = memo(() => { //꼭 필요할 때만 재렌더링 하려면 memo (props가 변할 때만 재렌더링 해줌. 따라서 단점은 기존 props == 신규 props 계속 비교. 거의 붙이지 않음)
    console.log('재렌더링됨') //Cart 컴포넌트 재렌더링시 자식들도 전부 재렌더링됨
    return <div>자식임</div>
})

// const 함수 = () => {
//     return 반복문 10억번 돌린결과
// }

const Cart = () => {

    // let result = useMemo(()=>{return 함수()}, [state]) // 컴포넌트 재렌더링시 1회만 실행해줌, [] 변화 할때만 실행 (useEffect는 html 렌더링 후 실행, useMemo는 html 렌더링 될때 같이 실행)

    let state = useSelector((state)=>{ return state }) //Redux store 가져와줌
    // let state = useSelector((state)=> state.user ) //Redux store 가져와줌
    // console.log(state)
    // 컴포넌트간 공유가 필요없으면 useState() 써

    let dispatch = useDispatch()
    let [count, setCount] = useState(0)

    return (
        <div>
            <Child count={count}></Child>
            <button onClick={()=>{ setCount(count+1) }}>+</button> {/* 버튼 누를시 Cart 컴포넌트 재렌더링 */}
            <h6>{state.user.name} {state.user.age}의 장바구니</h6>
            <button onClick={()=>{
                dispatch(increase(100))
            }}>버튼</button>
            <Table>
                <thead>
                <tr>
                    <th>#</th>
                    <th>상품명</th>
                    <th>수량</th>
                    <th>변경하기</th>
                </tr>
                </thead>
                <tbody>
                {
                    state.cart.map((a, i)=>
                        <tr key={i}>
                            <td>{a.id}</td>
                            <td>{a.name}</td>
                            <td>{a.count}</td>
                            <td>
                                <button onClick={()=>{
                                    dispatch(addCount(a.id)) //changeName() 실행해달라고 store.js에 부탁
                                }}>+</button>
                            </td>
                        </tr>
                    )
                }
                </tbody>
            </Table>
        </div>
    )
}

export default Cart