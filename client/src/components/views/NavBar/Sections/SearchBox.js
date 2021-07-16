import React from 'react'
import { Input, Form } from 'antd';
const { Search } = Input
function SearchBox() {
    const onSearch = () => {
        alert(33)
    }
    return (
        <>
            <Search
                onSearch={onSearch}
                className="searchBox"
                placeholder="검색어를 입력하세요..."
                // loading
                enterButton
            />
        </>
    )
}

export default SearchBox
