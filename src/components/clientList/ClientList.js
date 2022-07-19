import { useState, useEffect } from "react";
import ClientPreview from '../clientPreview/ClientPreview'
import './clientList.scss'

const ClientList = (props) => {
    
    const {data} = props
    const [clientList, setClientList] = useState('Нет новых диалогов');

    function renderItems(arr) {
        // let arr1 = arr[0]
        let items = 'Нет новых диалогов'
        if (arr.length > 0) {
            items = arr.map((item, i) => {
                let newMessages = 0
                let lastMessage = ''
                let isOperator = false
                if (item.messages.length > 0) {
                    lastMessage = item.messages[(item.messages.length - 1)].text
                    isOperator = item.messages[(item.messages.length - 1)].isOperator
                    
                    item.messages.forEach((element) => {
                        if (!element.isRead) {
                            newMessages++
                        }
                    })
                }
                
                return (
                    <ClientPreview 
                        key={item.idChat}
                        idChat={item.idChat} 
                        newMessages={newMessages} 
                        lastMessage={lastMessage}
                        isOperator={isOperator} 
                        clientName={item.clientName}
                        onDialogSelectedApp={props.onDialogSelectedApp}/>
                )
            });
        }  
        return(
            items
        )
    }

    useEffect(() => {
        setClientList(clientList => renderItems(data));
    }, [data])
    
    // const items = setTimeout(() => renderItems(data), 3000);

    return (
        <div className='clientList'>
            {clientList}
        </div>   
    )
    
}

export default ClientList