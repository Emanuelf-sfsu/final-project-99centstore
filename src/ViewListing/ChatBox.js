import React, { useEffect } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { handlTextChange, submitMessage, updateMessages } from '../redux/actions/messageActions';
import axios from 'axios';

const ChatBox = ({ productId, productName }) => {

    const { text, chatData } = useSelector(state => state.messageReducer);
    const dispatch = useDispatch();
    const isAdmin = useSelector(state => state.userReducer.isAdmin);


    const onClickSend = () => {
        dispatch(submitMessage());
    }
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            onClickSend();
        }
    };

    useEffect(() => {
        if (productId) {
            axios.get('/messanger/getMessages', {
                params: {
                    id: productId
                }
            }).then(data => {
                dispatch(updateMessages(data.data))
            }).catch(err => console.log(err));
        }

    }, [productId])

    useEffect(() => {
        console.log(isAdmin)
    }, [isAdmin])

    return (
        <div>
            <Card body style={{ height: '572px' }}>
                <Card body style={{ height: '484px', marginBottom: '12px' }} className="chat-box-card">
                    {chatData.messages && chatData.messages.map((data, index) => <div key={index} className={((data.sender === 'USER' && !isAdmin) || (data.sender === 'ADMIN' && isAdmin)) ? "chat-box" : "chat-box-self"}>
                        {((data.sender === 'USER' && isAdmin) || (data.sender === 'ADMIN' && !isAdmin)) && <div className="arrow-right"></div>}<Card body bg={((data.sender === 'USER' && !isAdmin)) ? 'primary' : 'success'} className="mt-2 padding-four">{data.message}</Card>{((data.sender === 'USER' && !isAdmin) || (data.sender === 'ADMIN' && isAdmin)) && <div className="arrow-left"></div>}
                    </div>)}
                </Card>
                <div style={{ display: 'flex' }}>
                    <Form.Control size="md" type="text" placeholder="Enter Message" value={text} onChange={(e) => dispatch(handlTextChange(e.target.value))} onKeyDown={handleKeyDown} /> <Button onClick={onClickSend}>Send</Button>
                </div>
            </Card>
        </div>
    )
}

export default ChatBox
