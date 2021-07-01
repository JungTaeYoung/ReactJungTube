import React, { useRef, useState, useEffect } from 'react';
import ControlBar from './ControlBar';



function Video(props) {
    const [PlayIng, setPlayIng] = useState(true) // 영상 재생 유무
    const [CurrentTime, setCurrentTime] = useState(0)
    const [TotalTime, setTotalTime] = useState(0)
    const ref = useRef(null);
    let videoElem = ref && ref.current;

    let timeUpdateOnOff = true;
    const timeUpdate = () => {
        const observedVideoElem = ref && ref.current;
        if (observedVideoElem) {
            observedVideoElem.addEventListener("loadedmetadata", () => {
                setTotalTime((ref && ref.current && ref.current.duration) || 0)
            })
            observedVideoElem.addEventListener("timeupdate", () => {
                if (timeUpdateOnOff) {
                    setCurrentTime(observedVideoElem.currentTime)
                }
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
        timeUpdateOnOff = false;
        if (videoElem) {
            videoElem.pause();
            setPlayIng(false);
        }

    }

    const onTouchEnd = async (e) => {
        // 컨트롤바 드래그 끝
        console.log("onTouchEnd" + e.target.value)
        try {
            videoElem.play();
        } catch(e) {
            setTimeout(()=>{
                videoElem.play();
            },10)
        }
        timeUpdateOnOff = true;
        setPlayIng(true);
        
    }
    
    const onChange = (e) => {
        console.log("onChange")
        // 컨트롤바 체인지 이벤트

        console.log(e.target.value / 100 * TotalTime)
        videoElem.currentTime = e.target.value / 100 * TotalTime;
        setCurrentTime(e.target.value / 100 * TotalTime)

    }




    useEffect(() => {
        console.log("ref.current.duration" + ref.current.duration)

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
