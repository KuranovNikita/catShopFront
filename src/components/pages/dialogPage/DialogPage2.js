




import Header from '../../header/Header'
import InfoBar from '../../infoBar/InfoBar'
import LeftBar from '../../leftBar/LeftBar'
import ClientList from '../../clientList/ClientList'
import Dialog from '../../dialog/Dialog'
import { useState, useEffect } from "react";
import useOperatorService from '../../../services/OperatorService'


const DialogPage = () => {
    const [allMessages, setAllMessages] = useState('');
    const [selectDialogIdClient, setSelectDialogIdClient] = useState('');
    const {loading, error, getNewData} = useOperatorService();
    const [newItemLoading, setNewItemLoading] = useState(false);
    
    useEffect(() => {
        onRequest(true)
    }, [])

    // useEffect(() => {
    //     onDialogSelected(selectDialogIdClient)
    // }, [allMessages])

    function onRequest(initial){
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getNewData()
            .then(onDataListLoaded)
    }

    const onDataListLoaded = (newDataList) => {
        setAllMessages(allMessages => [...newDataList])
        // onDialogSelected(selectDialogIdClient)
    }

    const onDialogSelected = (id) => {
        setSelectDialogIdClient(id)
        let arr = allMessages
        if (arr.length > 0) {
            arr.forEach((element) => {
                if (element.idClient === id) {
                    console.log(element)
                    element.messages.forEach((el) => {
                        el.isRead = true
                    })
                }
            })
        }
        
        console.log(arr)
        setAllMessages(allMessages => [...arr])
    }

    const sendMessageFromOperator = (text, selectDialogIdClient) => {
        console.log(text)
        let arr = allMessages
        const rnd = Math.floor(Math.random() * (1000 - 100 + 1) + 100)
        const msg = {text: text, isOperator: true, isRead: true, idMessage: rnd}
        arr.forEach((element) => {
            if (element.idClient === selectDialogIdClient) {
                element.messages.push(msg)
            }
        })
        setAllMessages(allMessages => [...arr])
    }
    
    const dialog = selectDialogIdClient ? <Dialog 
                                            selectDialogIdClient={selectDialogIdClient} 
                                            data={allMessages} 
                                            sendMessageFromOperator={sendMessageFromOperator}
                                            onDialogSelected={onDialogSelected}/> : <div className="dialog"> </div>
    let clientList = ''
    if (allMessages.length === 0) {
        clientList = <div className="clientList"><div className="clientList__preview loading">Ожидание активных диалогов</div></div>
    } else {
        clientList = <ClientList data={allMessages} onDialogSelected={onDialogSelected}/>
    }

    const clickPlus = () => {
        console.log('111')
        let arr = [{clientName: 'Иван Петров telegram', avatarNumber: 1, idClient: 'a1', messages: [{text: 'Привет эт Ваня', isOperator: false, isRead: true, idMessage: 101}, {text: 'Что хотел', isOperator: true, isRead: true, idMessage: 102}, {text: 'новое сооббшение ', isOperator: false, isRead:false, idMessage: 103}]},
        {clientName: 'Колян telegram', avatarNumber: 1, idClient: 'a2', messages: [{text: 'Привет эт Коля', isOperator: false, isRead: true, idMessage: 201}, {text: 'Что хотел???', isOperator: true, isRead: true, idMessage: 202},  {text: 'Простооооо))))))))', isOperator: false, isRead: true, idMessage: 203},  {text: 'самое новоек', isOperator: false, isRead:false, idMessage: 204}]},
        {clientName: 'Владимир Официоз telegram', avatarNumber: 1, idClient: 'a3', messages: [{text: 'Привет это Вова', isOperator: false, isRead: true, idMessage: 301}, {text: 'Что вы хотели', isOperator: true, isRead: true, idMessage: 302}, {text: 'Узнать важное', isOperator: false, isRead: false, idMessage: 303},  {text: 'нвсе не узнал ', isOperator: false, isRead:false, idMessage: 404},  {text: 'и еще хочу', isOperator: false, isRead:false, idMessage: 305}]},
        ]
        setAllMessages(allMessages => [...arr])
    }


    return (
        <>
            <Header/>
            <InfoBar text='Сообщения'/>
            <div className="workspace">
                <LeftBar/>
                <button className='redx' onClick={()=> clickPlus()}>s</button>
                <div className="workspace__wrapper">
                    {clientList}
                    {dialog}
                </div>
            </div>
        </>
    )
}

export default DialogPage;