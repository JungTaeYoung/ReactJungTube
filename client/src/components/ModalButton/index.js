
import React, { useState } from 'react'
import { Modal, Button } from 'antd';

function ModalButton(props) {
    const [visible, setvisible] = useState(false);
    const showModal = () => {
        setvisible(true)
    };

    const hideModal = () => {
        setvisible(false)
    };

    const okClick = () => {
        props.onOk() // 부모에서 받오는 실행함수
        hideModal()
    }

    return (
        <>
            <Button type="primary" onClick={showModal}>
                {props.children}
            </Button>
            <Modal
                title={props.title}
                visible={visible}
                onOk={hideModal}
                onCancel={hideModal}
                okText="확인"
                cancelText="취소"
                onOk={okClick}
            >
                {props.modalData}
            </Modal>
        </>
    );

}

export default ModalButton
