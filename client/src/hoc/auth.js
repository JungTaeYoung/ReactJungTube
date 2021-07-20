/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { auth, myInfo } from '../_actions/user_actions';
import { useSelector, useDispatch } from "react-redux";

export default function (SpecificComponent, option, adminRoute = null) {
    function AuthenticationCheck(props) {

        let user = useSelector(state => state.user);
        const dispatch = useDispatch();

        useEffect(() => {
            // 현재 내 로그인 상태 확인
            dispatch(auth()).then(response => {
                // 로그인 하지 않았을 때
                if (!response.payload.isAuth) {
                    // 로그인 전용 페이지 option 으로 구분
                    if (option) {
                        props.history.push('/login')
                    }
                    // 화면보기 가능
                } else {
                    // 어드민 전용 체크
                    if (adminRoute && !response.payload.isAdmin) {
                        props.history.push('/videos')
                    }
                    // 로그인한 유저는 보면 안되는 페이지
                    else {
                        if (option === false) {
                            props.history.push('/videos')
                        }
                    }
                }
            })
            dispatch(myInfo())
        }, [])

        return (
            <SpecificComponent {...props} user={user} />
        )
    }
    return AuthenticationCheck
}


