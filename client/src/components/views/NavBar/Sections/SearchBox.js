import React, { useState, useEffect } from 'react'
import { Input, Form } from 'antd';
import { useHistory, withRouter } from "react-router-dom";
import queryString from "query-string";
const { Search } = Input
function SearchBox({ match, location }) {

    const [SearchValue, setSearchValue] = useState('');
    let search_query = queryString.parse(location.search); // 검색어
    search_query = search_query.search_query;

    useEffect(() => {
        setSearchValue(search_query)
    }, [])

    const onSearch = (event) => {
        window.location.href = "/videos?search_query=" + SearchValue;
    }
    const onChangeSearchValue = (e) => {
        setSearchValue(e.target.value)
    }
    return (
        <>
            <Search
                onSearch={onSearch}
                className="searchBox"
                placeholder="검색어를 입력하세요..."
                // loading
                onChange={onChangeSearchValue}
                value={SearchValue}
                enterButton
            />
        </>
    )
}

export default withRouter(SearchBox)
