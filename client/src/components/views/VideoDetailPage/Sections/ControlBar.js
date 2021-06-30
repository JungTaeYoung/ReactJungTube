import React from 'react'
import toTimeStr from './toTimeStr'
import { CaretRightOutlined, PauseOutlined } from '@ant-design/icons';
import ProgressBar from './ProgressBar';
import './video.css'






function controlBar(props) {
    return (
        <div className="controlBox">
            <div className="controlBar">
                <ProgressBar
                    // onchange={onChange}
                    totalTime={props.totalTime}
                    currentTime={props.currentTime}
                    onTouchStart={props.onTouchStart}
                    onTouchEnd={props.onTouchEnd}
                    onChange={props.onChange}
                    // onTouchEnd={props.onTouchEnd}
                />
                {!props.playIng ? <CaretRightOutlined onClick={props.onPlayPauseClick} /> : <PauseOutlined onClick={props.onPlayPauseClick} />}

                <div className="times">
                    <span>{toTimeStr(props.currentTime)}</span>/
                    <span>{toTimeStr(props.totalTime)}</span>
                </div>

            </div>
        </div>
    )
}

export default controlBar
