import React from 'react'
import { Card } from 'antd'
import './index.less'


function CardBox(props) {
    return (
        <Card className={props.className} title={props.title}>
            {props.children}
        </Card>
    )
}

export default CardBox
