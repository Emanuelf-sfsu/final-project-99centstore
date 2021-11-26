import React, { useEffect } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { handlTextChange, insertMessage,updateMessages } from '../redux/actions/messageActions';
import axios from 'axios';

// const MOCK_RESPONSE = {
//     productId: '619de37d142b07d2495270e7',
//     messages: [{ message: 'Hi, Is this Available', sender: 'USER' }, {
//         message: 'Yes, It is available',
//         sender: 'ADMIN'
//     }]
// }

const ChatBox = ({ productId, productName }) => {

    // const returnArrow = (user) => {
    //     if (user === 'USER') {
    //         return <div class="arrow-left"></div>
    //     } else return <div class="arrow-right"></div>
    // }
    const { text, chatData } = useSelector(state => state.messageReducer);
    const dispatch = useDispatch();

    // const [chatData, setChatData] = useState(MOCK_RESPONSE);
    // const [chatMessage, setChatMessage] = useState("");

    const onClickSend = () => {
        
        const newMessages = [...chatData.messages || [], { message: text, sender: 'USER' }]
        dispatch(insertMessage({ message: text, sender: 'USER' }));
        // setChatData({ ...chatData, messages: newMessages });
        axios.post('/messanger/postMessage', { message: { productId, productName, messages: newMessages } })
        dispatch(handlTextChange(''));
    }
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            onClickSend();
        }
    };

    useEffect(() => {
        axios.get('/messanger/getMessages', {
            params: {
                id: productId
            }
        }).then(data => {
            dispatch(updateMessages(data.data))
        }).catch(err => console.log(err));
    }, [])

    useEffect(() => {
        console.log(chatData)
    }, [chatData])

    return (
        <div>
            <Card body style={{ height: '572px' }}>
                <Card body style={{ height: '484px', marginBottom: '12px' }} className="chat-box-card">
                    {chatData.messages && chatData.messages.map((data, index) => <div key={index} className={data.sender === 'USER' ? "chat-box" : "chat-box-self"}>
                        {data.sender === 'ADMIN' && <div className="arrow-right"></div>}<Card body bg={data.sender === 'USER' ? 'primary' : 'success'} className="mt-2 padding-four">{data.message}</Card>{data.sender === 'USER' && <div className="arrow-left"></div>}
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
