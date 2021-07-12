import React, { useEffect, useState, useRef, useCallback } from "react";
import useFetch from "../../../hoc/useFetch";
import { FaCode } from "react-icons/fa";
import { Card, Icon, Avatar, Col, Typography, Row, Spin } from "antd";
import Axios from "axios";

import moment from "moment"
import { Link } from "react-router-dom";

const { Title } = Typography;
const { Meta } = Card;

function VideoPage() {
    const [query, setQuery] = useState("");
    const [pageNum, setPageNum] = useState(1);
    const { Loading, Error, List, HasMore } = useFetch(query, pageNum);
    const observer = useRef()
    const lastVideoElementRef = useCallback(
        (node) => {
            if (Loading) return;
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && HasMore) {
                    setPageNum((prev) => prev + 1);
                }
            });
            if (node) observer.current.observe(node);

        },
        [Loading, HasMore],
    )

    const [Video, setVideo] = useState([])

    useEffect(() => {
        setPageNum(1);
        // Axios.get('/api/video/getVideos')
        //     .then(response => {
        //         if (response.data.success) {
        //             console.log(response.data.videos)
        //             setVideo(response.data.videos);

        //         } else {
        //             alert("비디오 가져오기 실패")
        //         }
        //     })
    }, [])

    const renderCards = List.map((video, index) => {
        const isLastElement = List.length === index + 1;
        var minutes = Math.floor(video.duration / 60);
        var seconds = Math.floor(video.duration - minutes * 60);
        return (isLastElement ? (
            <Col lg={6} md={8} xs={24} key={index} ref={lastVideoElementRef}>
                <div style={{ position: "relative" }}>
                    <Link to={`/video/${video._id}`}>
                        <div style={{ position: 'relative' }}>
                            <img style={{ width: '100%' }} src={`http://localhost:5000/${video.thumbnail}`} />
                            <div className="duration">
                                <span>{minutes} : {seconds}</span>
                            </div>
                        </div>
                    </Link>
                    <br />
                    <Meta
                        avatar={
                            <Avatar src={video.writer.image}></Avatar>
                        }
                        title={video.title}
                        description=""
                    />
                    <span>{video.writer.name}</span><br />
                    <span style={{ marginLeft: '3rem' }}>{video.views} views</span> - <span>{moment(video.createdAt).format("MMM Do YY")}</span>
                </div>
            </Col>
        ) : (
            <Col lg={6} md={8} xs={24} key={index}>
                <div style={{ position: "relative" }}>
                    <Link to={`/video/${video._id}`}>
                        <div style={{ position: 'relative' }}>
                            <img style={{ width: '100%' }} src={`http://localhost:5000/${video.thumbnail}`} />
                            <div className="duration">
                                <span>{minutes} : {seconds}</span>
                            </div>
                        </div>
                    </Link>
                    <br />
                    <Meta
                        avatar={
                            <Avatar src={video.writer.image}></Avatar>
                        }
                        title={video.title}
                        description=""
                    />
                    <span>{video.writer.name}</span><br />
                    <span style={{ marginLeft: '3rem' }}>{video.views} views</span> - <span>{moment(video.createdAt).format("MMM Do YY")}</span>
                </div>
            </Col>
        )
        )
    })

    return (
        <>
            <Card className="mainTopText" style={{ width: "98%", margin: "1rem auto 4rem" }}>
                <p style={{ fontSize: '30px', marginBottom: '14px'}}>🎅</p>
                <h2 className="title">영상 저장소에 오신 걸 환영합니다.</h2>
                <p className="description">여러분들의 다양한 영상들을 공유해보세요. 이 모든게 무료입니다.</p>
            </Card>
            <div style={{ width: "85%", margin: "3rem auto" }}>
                <Row gutter={[16, 48]}>
                    {renderCards}
                    {Loading && <Spin />}
                    {Error && <Spin />}
                </Row>
            </div>
        </>
    );
}

export default VideoPage;
