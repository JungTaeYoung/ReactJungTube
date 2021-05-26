import Axios from 'axios';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import SingleComment from './SingleComment'


function Comment(props) {
    const videoId = props.postId
    console.log(videoId)
    const user = useSelector(state => state.user)
    const [commentValue, setcommentValue] = useState("");

    const handleClick = (e) => {
        setcommentValue(e.currentTarget.value)
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const variables = {
            content: commentValue,
            writer: user.userData._id,
            postid: videoId
        }

        Axios.post('/api/comment/saveComment', variables)
            .then(response => {
                if (response.data.success) {
                    props.refreshFunction(response.data.result)
                } else {
                    alert('커멘트를 저장하지 못했습니다.')
                }
            })
    }

    return (
        <div>
            <br />
            <p>Replies</p>
            <hr />

            {/* Comment List */}

            {props.commentLists && props.commentLists.map((comment, index) => {
                return (!comment.responseTo &&
                    <SingleComment refreshFunction={refreshFunction} comment={comment} postId={videoId} />
                )
            })}


            {/* Root Comment Form */}

            <form style={{ display: 'flex' }} onSubmit={onSubmit}>
                <textarea
                    style={{ width: '100%', borderRadius: '5px' }}
                    onChange={handleClick}
                    value={commentValue}
                    placeholder="코멘트를 작성해 주세요"
                />
                <br />
                <button style={{ width: '20%', height: '52px' }} onClick>Submit</button>
            </form>

        </div>
    )
}

export default Comment
