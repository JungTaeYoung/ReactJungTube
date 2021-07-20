import React, { useEffect, useState, useRef, useCallback } from "react";
import { useHistory } from "react-router-dom";

import useFetch from "../../../hoc/useFetch";
import { FaCode } from "react-icons/fa";
import { Button } from "antd";
import Texty from 'rc-texty';
import QueueAnim from 'rc-queue-anim';
import Axios from "axios";
import './LandingPage.css'

function LandingPage({ match, location }) {
    let history = useHistory();
    const [isVisibleText1, setisVisibleText1] = useState(false)
    const [Loadings, setLoadings] = useState([false])

    const isVisibleText1Show = () => {
        setTimeout(() => {

            setisVisibleText1(true);
        }, 3500)
    }
    const enterLoading = index => {
        setLoadings({
            ...Loadings,
            [index]: true
        })

        setTimeout(() => {
            setLoadings({
                ...Loadings,
                [index]: false
            })
            history.push("/videos")
        }, 2000);
    };

    return (
        <div>
            <div className="fullBox">
                <div className="fullCenter">

                    <Texty
                        type="bottom"
                        mode="smooth"

                        delay={500}
                        duration={500}
                        style={{
                            fontSize: '2.5rem'
                        }}
                    >
                        안녕하세요.
                    </Texty>
                    <Texty
                        type="bottom"
                        mode="smooth"
                        delay={2000}
                        duration={500}
                        style={{
                            fontSize: '1.8rem'
                        }}
                    >
                        제 React프로젝트에 와주셔서 감사합니다.
                    </Texty>
                    <Texty
                        type="bottom"
                        mode="smooth"
                        delay={3500}
                        duration={20}
                        style={{
                            fontSize: '0.8rem'
                        }}
                        onEnd={isVisibleText1Show}
                    >
                        본 프로젝트는 React and nodejs를 습득하기 위해 만들어졌습니다.
                    </Texty>
                    <div className={'buttonSize' + (isVisibleText1 ? ' active' : '')}>
                        {
                            isVisibleText1 ? <QueueAnim
                                type="bottom"
                                delay={1000}
                                duration={300}
                                key="text"
                                leaveReverse
                                ease={['easeOutCubic', 'easeInCubic']}
                            >
                                <Button loading={Loadings[0]} onClick={() => enterLoading(0)}>
                                    Click me!
                                </Button>
                            </QueueAnim> : null
                        }

                    </div>
                </div>
            </div>
        </div >
    )
}

export default LandingPage;
