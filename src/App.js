/* eslint-disable */

import './App.css';
import {createContext, useEffect, useState, lazy, Suspense, useTransition, useDeferredValue} from "react";
import {Button, Navbar, Container, Nav} from 'react-bootstrap';
import bg from './img/bg.png';
// import 작명 from './data';
// import {a, b} from './data.js'; //중괄호안엔 마음대로 작명X
import data from './data.js'; //함수 컴포넌트 export,import 도 가능
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
// import Detail from './routes/Detail.js'
import axios from 'axios'
// import Cart from './routes/Cart.js'
import {useQuery} from "react-query";

const Detail = lazy(() => import('./routes/Detail.js')); //필요해질 때 import 해줌, 사이트 발행할 때도 별도의 js 파일로 분리됨
const Cart = lazy(() => import('./routes/Cart.js'));

export let Context1 = createContext() //context(state 보관함) 만들어 줌 //쓰지마

//ESLint: TypeError: this.libOptions.parse is not a function -> npm install eslint@8.22.0 --save-exact
//react bootstrap 설치
//npm install react-router-dom@6 -> index.js 가서 BrowserRouter로 app 감싸기
//npm install styled-components
//npm install axios
//npm install @reduxjs/toolkit react-redux (package.json 에서 react, react-dom 버전 18.1.x 이상이어야 함) -> store.js 만들고 index.js 설정
//npm install react-query -> index.js에 추가

let a = new Array(10000).fill(0)

function App() {

    //Q. 모든 state를 localStorage에 자동 저장? redux-persist
    //Jotai, Zustand 리덕스와 비슷하고 더 쉬움
    useEffect(()=>{
        localStorage.setItem('watched', JSON.stringify([]))
        // 이미 watched 항목이 있으면 setItem() 하지말아줘
    },[])

    // let obj = {name : 'kim'}
    // localStorage.setItem('data', JSON.stringify(obj))
    // let 꺼낸거 = localStorage.getItem('data')
    // console.log(JSON.parse(꺼낸거).name)

    let [shoes, setShoes] = useState(data);
    let [재고] = useState([10, 11, 12])

    let navigate = useNavigate(); //훅(유용한것들이 들어있는 함수)

    /*
    장점4. ajax로 가져온 결과는 state 공유 필요없음
    지금 App 컴포넌트에서 유저이름 가져오는 ajax 요청을 날리고 있습니다.
    근데 그 유저이름 결과가 Detail 컴포넌트에도 필요하면 어쩌죠?
    - 유저이름을 props 전송하면 됩니다.
    근데 실은 props 전송 필요없습니다.
    Detail 컴포넌트에다가 유저이름 ajax 요청하는 코드 똑같이 또 적으면 됩니다.
    react-query는 스마트하기 때문에 ajax 요청이 2개나 있으면 1개만 날려주고
    캐싱기능이 있기 때문에 이미 같은 ajax 요청을 한 적이 있으면 그걸 우선 가져와서 씁니다.
     */
    let result = useQuery('작명', ()=>{
        return axios.get('https://codingapple1.github.io/userdata.json').then((a)=>{
            console.log('요청됨')
            return a.data
        }),
            { staleTime : 2000 }
    })

    // result.data
    // result.isLoading
    // result.error

    let [name, setName] = useState('')
    let [isPending, startTransition] = useTransition()
    let state1 = useDeferredValue(name) //여기 넣은게 변동사항이 생기면 늦게 처리해줌

    return (
        <div className="App">
            {name}
            <input onChange={(e)=>{
                startTransition(()=>{ //성능저하 함수 감싸기 (감싼 함수를 지연 시작) -> 성능 개선
                    setName(e.target.value)
                })
            }}/>
            {
                isPending ? '로딩중' :
                a.map(()=>{
                    return <div>{state1}</div>
                })
            }
            {/*<Button variant="primary">Primary</Button> /!* 대문자는 component -> import 필수 *!/*/}
            <Navbar bg="light" variant="light">
                <Container>
                    <Navbar.Brand href="#home">ShoeShop</Navbar.Brand>
                    <Nav className="me-auto">
                        {/*<Nav.Link onClick={()=>{ navigate(1) }}>앞으로가기</Nav.Link>*/}
                        {/*<Nav.Link onClick={()=>{ navigate(-1) }}>뒤로가기</Nav.Link>*/}
                        <Nav.Link onClick={()=>{ navigate('/') }}>Home</Nav.Link>
                        <Nav.Link onClick={()=>{ navigate('/detail') }}>Detail</Nav.Link>
                        <Nav.Link onClick={()=>{ navigate('/cart') }}>Cart</Nav.Link>
                        {/*<Link to="/">홈</Link>*/}
                        {/*<Link to="/detail">상세페이지</Link>*/}
                    </Nav>
                    <Nav className="ms-auto">
                        {/*{ result.isLoading ? '로딩중' : result.data.name }*/}
                        { result.isLoading && '로딩중' }
                        { result.error && '에러남' }
                        { result.data && result.data.name }
                    </Nav>
                </Container>
            </Navbar>

            <Suspense fallback={ <div>로딩중임</div> } >
            <Routes>
                <Route path="/" element={
                    <>
                        <div className="main-bg" style={{backgroundImage: 'url(' + bg + ')'}}></div>

                        {/*React-Bootstrap 가서 복붙해야 조금 더 용량절략가능(이건 오리지널 BootStrap 코드)*/}
                        <div className="container">
                            <div className="row">
                                {/*<div className="col-md-4">
                                    <img src={process.env.PUBLIC_URL + '/logo192.png'}/> public 폴더에 넣었을때 권장 방식
                                    <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="80%"/> 외부에 호스팅해둔
                                    이미지라면 이미지 절대주소
                                    <h4>{shoes[0].title}</h4>
                                    <p>{shoes[0].price}</p>
                                </div>
                                <div className="col-md-4">
                                    <img src="https://codingapple1.github.io/shop/shoes2.jpg" width="80%"/> 외부에 호스팅해둔
                                    이미지라면 이미지 절대주소
                                    <h4>{shoes[1].title}</h4>
                                    <p>{shoes[1].price}</p>
                                </div>
                                <div className="col-md-4">
                                    <img src="https://codingapple1.github.io/shop/shoes3.jpg" width="80%"/> 외부에 호스팅해둔
                                    이미지라면 이미지 절대주소
                                    <h4>{shoes[2].title}</h4>
                                    <p>{shoes[2].price}</p>
                                </div>*/}
                                {
                                    shoes.map((shoe, i) => {
                                        return (
                                            <Card key={i} shoe={shoe} i={i}></Card>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <button onClick={()=>{
                            //로딩중UI 띄우기
                            axios.get('https://codingapple1.github.io/shop/data2.json')
                                .then((result)=>{
                                    console.log(result.data);
                                    let copy = [...shoes, ...result.data]; //json으로 받아옴(axios가 array로 자동으로 바꿔줌)
                                    setShoes(copy);
                                    //로딩중UI 숨기기
                                })
                                .catch(()=>{
                                    console.log('실패함ㅅㄱ')
                                    //로딩중UI 숨기기
                                })

                            // fetch('https://codingapple1.github.io/shop/data2.json')
                            //     .then(result => result.json()) //json -> array/object 변환과정 필요
                            //     .then(data => {})

                            // axios.post('/safdfs', {name : 'kim'})

                            // Promise.all([ axios.get('url1'), axios.get('/url2') ])
                            //     .then(()=>{
                            //
                            //     })
                        }}>더보기</button>
                    </>
                }/>
                {/*<Route path="/detail" element={<Detail shoes={shoes} />}/>*/}

                {/*URL파라미터*/}
                <Route path="/detail/:id" element={
                    <Context1.Provider value={{ 재고, shoes }}> {/* props 전송없이 사용 가능 */}
                        <Detail shoes={shoes} />
                    </Context1.Provider>
                } />

                <Route path="/cart" element={ <Cart/> } />


                {/* 이런 식으로 UI 만들면 뒤로가기 버튼 이용가능*/}
                {/* 페이지 이동이 쉬움(UI 스위치 조작 쉬움)*/}
                <Route path="/about" element={<About/>}>
                    <Route path="member" element={<div>멤버임</div>}/> {/* Nested Routes -> 장점: nested route 접속시엔 element 2개나 보임 */}
                    <Route path="location" element={<div>위치정보임</div>}/>
                </Route>

                <Route path="/event" element={<EventPage/>}>
                    <Route path="one" element={<p>첫 주문시 양배추즙 서비스</p>}/>
                    <Route path="two" element={<p>생일기념 쿠폰받기</p>}/>
                </Route>

                {/*<Route path="/about/member" element={<About/>}/>*/}
                {/*<Route path="/about/location" element={<About/>}/>*/}
                <Route path="*" element={<div>없는페이지요</div>}/> {/*404 페이지*/}
            </Routes>
            </Suspense>

        </div>
    );
}

const EventPage = () => {
    return (
        <div>
            <h4>오늘의 이벤트</h4>
            <Outlet></Outlet>
        </div>
    )
}


const About = () => {
    return (
        <div>
            <h4>회사정보임</h4>
            <Outlet></Outlet> {/* Nested Routes 보여줄 자리 */}
        </div>
    )
}

const Card = (props) => {

    let navigate = useNavigate();

    return (
        <div className="col-md-4">
            <img onClick={()=>{ navigate(`/detail/${props.i}`) }} src={`https://codingapple1.github.io/shop/shoes${props.i + 1}.jpg`}
                 width="80%"/> {/* {} 감싸서 자바스크립트 입력란으로 만들어 줘야 백틱 쓰지 */}
            <h4>{props.shoe.title}</h4>
            <p>{props.shoe.price}</p>
        </div>
    )
}

export default App;
