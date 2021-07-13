import React, { useEffect, useState, useRef, useCallback } from "react";
import useFetch from "../../../hoc/useFetch";
import { FaCode } from "react-icons/fa";
import { Card, Icon, Avatar, Col, Typography, Row, Spin, Layout } from "antd";
import Texty from 'rc-texty';

import Axios from "axios";
import './LandingPage.css'

function LandingPage() {
    return (

        <div>
            <div className="fullBox">
                <Texty 
                className="fullCenter"
                delay={100}
                duration={3000}
                style={{
                    fontSize: '2rem'
                }}
                >
                    안녕하세요. 여러분
                    </Texty>
            </div>
        </div>
    )
}

export default LandingPage
