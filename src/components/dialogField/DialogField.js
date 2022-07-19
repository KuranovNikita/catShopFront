import { useState, useEffect } from "react";
import Message from '../message/Message'
import './dialogField.scss'

const DialogField = (props) => {
    const {dialogMessages, checkReadMessage} = props
    // const [messages, setMessages] = useState('Нет новых диалогов');

    useEffect(() => {
        checkReadMessage()
      }, [dialogMessages])

    function renderItems(arr) {
        let items = 'Нет новых диалогов'
        if (arr.length > 0) {
            items = arr.map((item, i) => {
                return (
                    <Message key={item.idMessage} isOperator={item.isOperator} text={item.text}/>
                )
            });
        }  
        return(
            items
        )
    }

    // useEffect(() => {
    //     setMessages(messages => renderItems(dialogMessages));
    //     console.log('dialogField effect')
    // }, [dialogMessages])

    const messages = renderItems(dialogMessages);

    return (
        <div className="dialog__field">
            {messages}
        </div>
    )
    
}


export default DialogField