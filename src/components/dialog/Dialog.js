import { useState, useEffect } from "react";
import avatarUser from '../../resources/img/avatarUser.png'
import avatarOperator from '../../resources/img/avatarOperator.png'
import DialogField from '../dialogField/DialogField'
import DialogInput from '../dialogInput/DialogInput'
import './dialog.scss'

const Dialog = (props) => {
    const {data, sendMessageFromOperator, checkReadMessage, buttonDeleteDialog, selectDialog} = props
    const [name, setName] = useState('');
    const [dialogMessages, setDialogMessages] = useState([]);

    useEffect(() => {
        let nameFunction = ''
        if (data.length > 0) {
            data.forEach((element) => {
                if (element.idChat === selectDialog) {
                    nameFunction = `${element.clientName}_${element.typeDialog}`
                    setDialogMessages(dialogMessages => element.messages);
                }
            })
            setName(name => nameFunction);
        }
        props.onDialogSelectedApp(selectDialog)
        // console.log('dialog effect')  
    }, [selectDialog, data])
    
    return (
        <div className="dialog">
            <div className="dialog__title">
                <div className="dialog__title__info">
                    <div className="dialog__title__avatar"><img src={avatarUser} alt="avatar" /></div>
                    <div className="dialog__title__name">{name}</div>
                </div>
                <div className="dialog__title__buttons">
                    <button onClick={() => buttonDeleteDialog()} className='dialog__title__buttons__decline'>Закончить разговор</button>
                </div>
            </div>
            <DialogField dialogMessages={dialogMessages} checkReadMessage={checkReadMessage}/>
            <DialogInput sendMessageFromOperator={sendMessageFromOperator} selectDialog={selectDialog}/>   
        </div>
    )
    
}





export default Dialog