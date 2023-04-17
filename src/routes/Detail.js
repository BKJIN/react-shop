/* eslint-disable */

import React, {useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import styled from 'styled-components';
import { Nav } from 'react-bootstrap';

import {Context1} from './../App.js'
import {addItem} from "../store";
import {useDispatch} from "react-redux";


//Styled-Component -> 스타일이 다른 js파일로 오염되지 않음, 페이징 로딩시간 단축 // 중복스타일은 컴포넌트간 import할텐데 css와 다를 바 없음
//src에 css파일 만들 때, App.module.css 라고 만들면 App.js에 종속
// let YellowBtn = styled.button`
//     background : ${ props => props.bg };
//     color : ${ props => props.bg == 'blue' ? 'white' : 'black' };
//     padding: 10px;
// `

// let Box = styled.div`
//     background : grey;
//     padding: 20px;
// `

// let NewBtn = styled.button(YellowBtn)`
//
// `

// class Detail2 extends React.Component {
//     componentDidMount() {
//
//     }
//     componentDidUpdate() {
//
//     }
//     componentWillUnmount() {
//
//     }
// }

const Detail = (props) => {

    let {재고, shoes} = useContext(Context1) //보관함 해체해줌

    let {id} = useParams(); //URL 만들 때 parameter 여러개 사용 가능
    let findShoes = props.shoes.find((x)=>x.id==id);
    let [count, setCount] = useState(0);
    let [alertEvent, setAlertEvent] = useState(true);
    let [num, setNum] = useState('');
    let [tab, setTab] = useState(0);
    let [fade2, setFade2] = useState('')
    let dispatch = useDispatch();

    useEffect(()=>{

        let 꺼낸거 = localStorage.getItem('watched')
        꺼낸거  = JSON.parse(꺼낸거)
        꺼낸거.push(findShoes.id)
        꺼낸거 = new Set(꺼낸거)
        꺼낸거 = Array.from(꺼낸거)
        localStorage.setItem('watched', JSON.stringify(꺼낸거))

    },[])

    useEffect(()=>{ //mount, update 시 코드 실행해줌(userEffect안에 있는 코드는 html 렌더링 후에 동작)

        //어려운 연산
        //서버에서 데이터가져오는 작업
        //타이머 장착하는거

        let a = setTimeout(()=>{ setAlertEvent(false) }, 2000);
        console.log(2)

        return () => { //clean up function : mount 시 실행안됨 unmount시 실행됨
            console.log(1)
            //useEffect가 실행 되기전 실행
            //기존타이머는 제거해주세요
            clearTimeout(a)
            //기존 데이터요청은 제거해주세요

        }
    }, []) // mount시, []안 변수, state가 변할 때 실행됨 // 그냥 [] 이렇게 하면 mount시 1회만 실행

    useEffect(()=> {
        if(isNaN(num) == true) {
            alert('그러지망');
        }
    }, [num]);

    useEffect(()=>{
        setFade2('end')
        return ()=>{
            setFade2('')
        }
    }, [])

    if(findShoes==null) return (
        <div>상품없는데용</div>
    )

    return (
        <div className={`container start ${fade2}`}>
            {/*<Box>
                <YellowBtn>버튼</YellowBtn>
            </Box>*/}
            {/*<YellowBtn bg="blue">버튼</YellowBtn>*/}
            {/*<YellowBtn bg="orange">버튼</YellowBtn>*/}
            {
                alertEvent == true ? <div className="alert alert-warning">
                                    2초이내 구매시 할인
                                </div>
                                : null
            }
            {count}
            <button onClick={()=>{ setCount(count+1) }}>버튼</button>
            <div className="row">
                <div className="col-md-6">
                    <img src={`https://codingapple1.github.io/shop/shoes${Number(id)+1}.jpg`} width="100%" />
                </div>
                {/*<input onChange={(e)=>{ setNum(e.target.value)}}/>*/}
                <div className="col-md-6">
                    <h4 className="pt-5">{findShoes.title}</h4>
                    <p>{findShoes.content}</p>
                    <p>{findShoes.price}원</p>
                    <button className="btn btn-danger" onClick={()=>{
                        dispatch(addItem( {id : 1, name : 'Red Knit', count : 1} ))
                    }}>주문하기</button>
                </div>
            </div>

            <Nav variant="tabs" defaultActiveKey="link0">
                <Nav.Item>
                    <Nav.Link onClick={()=>{setTab(0)}} eventKey="link0">버튼0</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={()=>{setTab(1)}} eventKey="link1">버튼1</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={()=>{setTab(2)}} eventKey="link2">버튼2</Nav.Link>
                </Nav.Item>
            </Nav>
            {/*{
                tab == 0 ? <div>내용0</div> : null //삼항연산자는 한 번 밖에 못씀
            } */}
            <TabContent tab={tab}/>
        </div>
    )
}

const TabContent = ({tab}) => { //{tab, props2} 으로 쓸 수 있음
    // if (tab == 0) {
    //     return <div>내용0</div>
    // }
    // if (tab == 1) {
    //     return <div>내용1</div>
    // }
    // if (tab == 2) {
    //     return <div>내용2</div>
    // }

    let [fade, setFade] = useState('')
    let {재고} = useContext(Context1)

    useEffect(()=>{
        let a = setTimeout(()=>{ setFade('end') }, 10) //리액트의 automatic batching 기능 -> state 변경 함수들이 근처에 있으면 맨마지막만 재렌더링
        return ()=>{
            clearTimeout(a)
            setFade('')
        }
    }, [tab])

    return (<div className={`start ${fade}`}>
        { [<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][tab] }
    </div>)
}

export default Detail;