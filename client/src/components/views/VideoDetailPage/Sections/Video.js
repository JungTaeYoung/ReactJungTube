import React, { useRef, useState, useEffect } from 'react';
import ControlBar from './ControlBar';



function Video(props) {
    const [PlayIng, setPlayIng] = useState(true) // 영상 재생 유무
    const [CurrentTime, setCurrentTime] = useState(0)
    const [TotalTime, setTotalTime] = useState(0)
    const ref = useRef(null);
    let videoElem = ref && ref.current;

    let totalTime = (ref && ref.current && ref.current.duration) || 0;
    const timeUpdate = () => {
        const observedVideoElem = ref && ref.current;
        if (observedVideoElem) {
            observedVideoElem.addEventListener("loadedmetadata", () => {
                setTotalTime((ref && ref.current && ref.current.duration) || 0)
            })
            observedVideoElem.addEventListener("timeupdate", () => {
                setCurrentTime(observedVideoElem.currentTime)
            })
            setPlayIng(false);
            observedVideoElem.pause();
        }
    }

    const onPlayPauseClick = () => {
        if (videoElem) {
            if (PlayIng) {
                setPlayIng(false)
                videoElem.pause()
            } else {
                setPlayIng(true)
                videoElem.play()
            }
        }
    }

    const onTouchStart = (e) => {
        // 컨트롤바 드래그 시작
        console.log(e)
        if (videoElem) {
            videoElem.pause();
            setPlayIng(false);
        }

    }



    const onTouchEnd = (e) => {
        // 컨트롤바 드래그 끝
        videoElem.currentTime = CurrentTime;
        console.log(e)
        videoElem.play();
        setPlayIng(true);
    }

    const onChange = (e) => {
        // 컨트롤바 체인지 이벤트
        setCurrentTime(e.target.value / 100 * TotalTime)
        console.log(e)
    }




    useEffect(() => {
        console.log("ref.current.duration" + ref.current.duration)
        // if(!ref) {
        //     videoElem = ref && ref.current;
        //     totalTime = (ref && ref.current && ref.current.duration) || 0;

        // }
        timeUpdate();
        //최소 실행
        console.log(3)
    }, [])

    return (
        <div className="MPlayer">
            <video style={{ width: '100%' }}
                ref={ref}
            >
                <source src={props.src}></source>
            </video>
            <ControlBar
                playIng={PlayIng} // 재생유무
                currentTime={CurrentTime} // 현재시간
                onPlayPauseClick={onPlayPauseClick} // /재생/정지
                onTouchStart={onTouchStart}
                onTouchEnd={onTouchEnd}
                onChange={onChange}
                totalTime={TotalTime} // 최종시간
            />
        </div>
    )
}

export default Video
