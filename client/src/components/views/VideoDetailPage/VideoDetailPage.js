import React, {useEffect, useState} from 'react'
import {Row, Col, List, Avatar} from 'antd'
import Axios from 'axios'


function VideoDetailPage(props) {

    const videoId = props.match.params.videoId
    const variable = {
        videoId,

    }

    const [VideoDetail, setVideoDetail] = useState([])


    useEffect(() => {
        Axios.post('/api/video/getVideoDetail', variable)
        .then(response=>{
            if(response.data.success) {
                console.log(response.data.videoDetail.writer.image)
                setVideoDetail(response.data.videoDetail)

            } else {
                alert('비디오 가져오기를 실패 하였습니다.')
            }
        })
    }, [])
    if(VideoDetail.writer) {
        return (
            <Row gutter={[16, 16]}>
                <Col lg={18} xs={24}>
                    <div style={{width:'100%', padding:'3rem 4rem'}}>
                        <video style={{ width:'100%'}} src={`http://localhost:5000/${VideoDetail.filepath}`} controls />
                        <List.Item
                            actions
                        >
                            <List.Item.Meta
                                avatar={<Avatar src={VideoDetail.writer.image} />}
                                title={VideoDetail.writer.name}
                                description={VideoDetail.description}
                            />
                        </List.Item>
                    </div>
                </Col>
                <Col lg={6} xs={24}>
                    
                </Col>
            </Row>
        )
    } else {
        return <div>...loading</div>
    }
}

export default VideoDetailPage
