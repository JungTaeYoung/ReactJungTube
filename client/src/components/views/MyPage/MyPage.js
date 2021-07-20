
import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { FaCode } from "react-icons/fa";
import { Popconfirm, Card, Icon, Avatar, Col, Typography, Row, Table, Button } from "antd";
import CardBox from '../../CardBox'
import ModalButton from '../../ModalButton'
import { myInfo } from '../../../_actions/user_actions'; //엑션가져왔거든요?네넹 어케뿌려줘요?
import { useSelector, useDispatch } from "react-redux";
import Axios from "axios";
import LoadMoreList from './LoadMoreList'

import './index.css'

import moment from "moment"
import { Link } from "react-router-dom";

const { Title } = Typography;
const { Meta } = Card;


const videoUpdate = () => {
    console.log(2)
}

// 비디오 삭제
function videoDelete(id) {
    Axios.delete('/api/video/videos/' + id)
        .then(response => {
            if (response.data.success) {
                alert("삭제 성공")
            } else {
                alert("삭제 실패 하였습니다.")
            }
        })
}

const videoUpdateData = (
    <div>
        <h2>데이트를 수정하세요</h2>
    </div>
)

const videoDeleteData = (
    <div>
        <p>삭제 후 영상은 복구 할 수 없습니다.</p>
    </div>
)


function MyPage() {
    const user = useSelector(state => state.user)
    // const [TableData, setTableData] = useState([])
    const [MySubscribeCount, setMySubscribeCount] = useState(0)
    const [Video, setVideo] = useState([])
    const [Page, setPage] = useState(1)
    const dispatch = useDispatch();
    useEffect(() => {

        console.log("user.myInfo")
        console.log(user)
        const subscriptionVariables = {
            userTo: localStorage.getItem('userId')
        }
        // ㄴㄴ이렇게할려다가
        //         Axios.post('/api/subscribe/subscribeNumber', subscriptionVariables)
        //             .then(response => {
        //                 if(response.data.success) {
        //                     setMySubscribeCount(response.data.subscribeNumber);
        //                 } else {
        //                     alert("구독자 수 를 받아오지 못했습니다.")
        //                 }
        //             })
    }, [])

    // useEffect(() => {
    //     Axios.get('/api/video/getMyVideos')
    //         .then(response => {
    //             if (response.data.success) {
    //                 console.log(response.data.videos);

    //                 // 테이블 데이터로 가공
    //                 let tableTemp = response.data.videos; // 비디오 데이터 가공전
    //                 tableTemp.map((row, index) => {
    //                     row.key = index
    //                     row.button = (
    //                         <div>
    //                             <ModalButton modalData="테스트입니다." onOk={videoUpdate}>수정</ModalButton>
    //                             <ModalButton title="영상을 삭제하시겠습니까?" modalData={videoDeleteData} onOk={(e) => { videoDelete(row._id) }}>삭제</ModalButton>

    //                         </div>
    //                     )
    //                 })
    //                 setTableData(response.data.videos);
    //             } else {
    //                 alert("비디오 가져오기 실패")
    //             }
    //         })
    // }, [])

    return (
        <div style={{ width: "100%", padding: "2rem 2rem" }}>
            <div className="myPageTop">
                <Row gutter={[32, 16]} type="flex" justify="space-between">
                    <Col lg={16}>
                        <CardBox title="프로필">
                            <Meta
                                avatar={<Avatar src={localStorage.getItem("userImage")} />}
                                title={localStorage.getItem("userFullName")}
                                description={"반갑습니다."}
                            />
                            <hr />
                            <br />
                            <p>구독자 : {}명</p>
                            <p>회원가입 날짜 : 2021년 5월 8일</p>
                            <p>내 영상 : {user.myInfo && user.myInfo.user_name}개</p>
                        </CardBox>
                    </Col>
                    <Col lg={8}>
                        <CardBox title="미정입니다">
                            프로필 공간입니다.
                        </CardBox>
                    </Col>
                    <Col lg={24} sm={24} md={24} xs={24}>
                        <CardBox title="내 영상">
                            {/* <Table columns={columns} dataSource={TableData} scroll={{ y: 240 }} /> */}
                            <div className="myVideoHead">
                                <li>
                                    동영상
                                </li>
                                <li>
                                    정보
                                </li>
                                <li>
                                    업로드 날짜
                                </li>
                                <li>
                                    조희수
                                </li>
                                <li>
                                    관리
                                </li>
                            </div>
                            <div className="myVideoBody">
                                <LoadMoreList count={4} />
                            </div>
                        </CardBox>
                    </Col>
                </Row>


            </div>

        </div>
    );
}

export default (MyPage);
