import Axios from 'axios'
import React, { useState, useEffect, useCallback } from 'react'

//페이지 로딩
function useFetch(querys, page) {
    const [Loading, setLoading] = useState(true);
    const [Error, setError] = useState(false);
    const [List, setList] = useState([]);
    const [HasMore, setHasMore] = useState(false)

    const sendQuery = useCallback(async () => {
        try {
            const variable = {
                params: {
                    querys,
                    page
                }
            }
            await setLoading(true);
            await setError(false);
            const res = await Axios.get('/api/video/getVideos', variable)
            console.log(res)
            await setList((prev) => [...new Set([...prev, ...res.data.videos])]); // 기존 리스트에 추가
            await setHasMore(res.data.videos.length > 0);
            setLoading(false);

        } catch (e) {
            console.log("오류남")
            setError(e)
        }
    },
        [querys, page],
    )
    useEffect(() => {
        sendQuery(querys)
    }, [querys, sendQuery, page])

    return { Loading, Error, List, HasMore }
}

export default useFetch
