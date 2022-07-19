import avatarUser from '../../resources/img/avatarUser.png'
import avatarOperator from '../../resources/img/avatarOperator.png'
import './clientPreview.scss'

const ClientPreview = (props) => {
    let {newMessages, isOperator, lastMessage, clientName, idChat} = props
    newMessages = Number(newMessages)
    const haveNewMessages = newMessages ? <div className="clientList__preview__info__newMessages">{newMessages}</div> : null
    const haveOperatorMessages = isOperator ? <img src={avatarOperator} alt="avatar" /> : null
    lastMessage = (isOperator ? lastMessage.slice(0, 20) : lastMessage.slice(0, 25))
    if (isOperator && lastMessage.length === 20) {
        lastMessage = lastMessage + '...'
    } else if (lastMessage.length === 25) {
        lastMessage = lastMessage + '...'
    }
    return (
            <div className="clientList__preview" onClick={() => {props.onDialogSelectedApp(idChat);}} >
                <div className="clientList__preview__avatar">
                    <img src={avatarUser} alt="avatar" />
                </div>
                <div className="clientList__preview__info">
                    <div className="clientList__preview__wrapper">
                        <div className="clientList__preview__info__name">{clientName}</div>
                        {haveNewMessages}
                    </div>
                    <div className="clientList__preview__wrapperMessage">
                        {haveOperatorMessages}
                        <div className="clientList__preview__info__preview">{lastMessage}</div>
                    </div>
                    
                </div>
            </div>            
    )
    
}

export default ClientPreview