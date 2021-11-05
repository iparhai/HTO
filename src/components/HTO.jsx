import React from 'react';
import './drag.css'
import { Stage, Layer, Text } from 'react-konva';
import { useEffect } from 'react';
// import fishSplash from './assets/sounds/fishSplash.wav'
import './NumberLineMove.css'
import sessionData from '../utils/sessionData';
import useImage from 'use-image';
import { min } from 'moment';
import cartR_H from '../assets/cartR_H.png'
import cartR_T from '../assets/cartR_T.png'
import cartR_O from '../assets/cartR_O.png'

import cartL_H from '../assets/cartL_H.png'
import cartL_T from '../assets/cartL_T.png'
import cartL_O from '../assets/cartL_O.png'
import "./HTO.css"

const HTO = (props) => {
    const [cartLeft, setCartLeft] = React.useState(window.innerWidth / 2 - window.innerWidth / 6)
    const [cartTop, setCartTop] = React.useState(0)
    const [step, setStep] = React.useState(200)
    const [image, setImage] = React.useState(cartR_H)
    const [hto] = React.useState("H")
    const [usedClick, setUsedClicks] = React.useState(0)

    var cartStyle = {
        move: {
            position: "absolute",
            left: cartLeft + "px",
            top: cartTop + "px",
            marginTop: "62vh",
            width: "100%",
            maxWidth: "500px",
        }
    }
    useEffect(() => {
        if (image == cartR_H || image == cartL_H) {
            props.setAnswer(0)
        }
        else if (image == cartR_T || image == cartL_T) {
            props.setAnswer(1)
        }
        else {
            props.setAnswer(2)
        }
    }, [image])

    useEffect(() => {
        setCartLeft(cartLeft)
    }, [step])
    useEffect(() => {

        if (step >= 0 && usedClick == 0) {
            setImage(cartR_H)
        }
        else if (step >= 0 && usedClick == 1) {
            setImage(cartR_T)

        }
        else if (step >= 0 && usedClick == 2) {
            setImage(cartR_O)

        }
        else if (step < 0 && usedClick == 0) {
            setImage(cartL_O)

        }
        else if (step < 0 && usedClick == 1) {
            setImage(cartL_T)

        }
        else if (step < 0 && usedClick == 2) {
            setImage(cartL_H)

        }
    }, [usedClick])

    return (
        <div>
            <div >
                <img alt="cart" src={image} className="Cart " style={cartStyle.move} onClick={() => {

                    if (usedClick > 1) {
                        setStep(step * -1)
                        setUsedClicks(0)
                    }
                    else {
                        setUsedClicks(usedClick + 1)
                        setCartLeft(cartLeft + step)
                    }

                }} />
            </div>
            <button onClick={() => { props.onClick() }}>
                ok
            </button>

        </div>
    );
};

export default HTO;

// <div className="noselect parentDiv" >

// <div className="dropBox"
//     ref={container}
// >
//     <Stage
//         width={stageWidth}
//         height={stageHeight}
//         ref={stageRef}
//     >
//         <Layer>
//             {chSet.map((chObject, index) => {
//                 return <RenderCharacter chObject={chObject} handleClick={() => {
//                     if (blanks.length == 1 && blanks[0] != "?") return;
//                     let temp = [...blanks]
//                     temp[temp.length - 1] = chObject.ch
//                     setAnswer(chObject.ch)
//                     setBlanks(temp)
//                 }} />
//             })}
//         </Layer>
//     </Stage>
// </div>
// <div >
//     {blanks.map((item, index) => {
//         return (
//             <h1 onClick={() => {

//                 setBlanks(
//                     ["?"]
//                 )
//                 setAnswer("")
//             }}>
//                 <u>{item}</u> &nbsp;
//             </h1>
//         )
//     })}
// </div>
// <button className="App-link" onClick={() => {
//     props.onClick()
// }}> <i class="fa fa-paper-plane" aria-hidden="true"></i> </button>
// </div >