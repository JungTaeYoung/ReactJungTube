import Axios from 'axios';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import SingleComment from './SingleComment'
import ReplyComment from './ReplyComment'



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
                    setcommentValue("")
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
                    <React.Fragment>
                        <SingleComment refreshFunction={props.refreshFunction} comment={comment} postId={videoId} />
                        <ReplyComment refreshFunction={props.refreshFunction} parentCommentId={comment._id} postId={videoId} commentLists={props.commentLists} />
                    </React.Fragment>
                )
            })}


            {/* Root Comment Form */}
            {user.userData && user.userData.isAuth && (<form style={{ display: 'flex' }} onSubmit={onSubmit}>
                <textarea
                    style={{ width: '100%', borderRadius: '5px' }}
                    onChange={handleClick}
                    value={commentValue}
                    placeholder="코멘트를 작성해 주세요"
                />
                <br />
                <button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>Submit</button>
            </form>)}
            {user.userData && !user.userData.isAuth && (<form style={{ display: 'flex' }} onSubmit={onSubmit}>
                <p>댓글 작성은 로그인 후 이용 가능합니다.</p>
            </form>)}



        </div>
    )
}

export default Comment
