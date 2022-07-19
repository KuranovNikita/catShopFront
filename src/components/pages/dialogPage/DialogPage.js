import Header from '../../header/Header'
import InfoBar from '../../infoBar/InfoBar'
import LeftBar from '../../leftBar/LeftBar'
import ClientList from '../../clientList/ClientList'
import Dialog from '../../dialog/Dialog'
import { useState} from "react";


const DialogPage = (props) => {
    const {allMessages, onDialogSelectedApp, sendMessageFromOperator, switchClick, isOnline, checkReadMessage, buttonDeleteDialog, selectDialog, clickExit} = props
    // const [selectDialogidChat, setSelectDialogidChat] = useState('');
    
    // const onDialogSelected = (id) => {
    //     setSelectDialogidChat(id)
    //     onDialogSelectedApp(id)
    // }

    
    
    const dialog = selectDialog ? <Dialog 
                                            selectDialog={selectDialog}
                                            // selectDialogidChat={selectDialogidChat} 
                                            data={allMessages} 
                                            sendMessageFromOperator={sendMessageFromOperator}
                                            checkReadMessage={checkReadMessage}
                                            // onDialogSelected={onDialogSelected}
                                            onDialogSelectedApp={onDialogSelectedApp}
                                            buttonDeleteDialog={buttonDeleteDialog}/> : <div className="dialog"> </div>

    let clientList = ''
    if (allMessages.length === 0) {
        clientList = <div className="clientList"><div className="clientList__preview loading">Ожидание активных диалогов</div></div>
    } else {
        clientList = <ClientList data={allMessages} onDialogSelectedApp={onDialogSelectedApp}/>
    }



    return (
        <>
            <Header clickExit={clickExit}/>
            <InfoBar text='Сообщения' switchClick={switchClick} isOnline={isOnline}/>
            <div className="workspace">
                <LeftBar/>
                <div className="workspace__wrapper">
                    {clientList}
                    {dialog}
                    
                    
                </div>
            </div>
        </>
    )
}

export default DialogPage;