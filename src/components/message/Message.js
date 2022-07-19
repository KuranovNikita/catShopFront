import avatarUser from '../../resources/img/avatarUser.png'
import avatarOperator from '../../resources/img/avatarOperator.png'
import './message.scss'

const Message = (props) => {
    const {isOperator, text} = props
    const message = isOperator ? <OperatorMessage text={text}/> : <UserMessage text={text}/>
    return (
        <>
            {message}
        </>
    )
    
}

const UserMessage = (props) => {
    const {text} = props
    return (
        <div className="dialog__userMessage">
            <div className="dialog__userMessage__avatar"><img src={avatarUser} alt="avatar" /></div>
            <div className="dialog__userMessage__text">{text}</div>
        </div>
    )
}

const OperatorMessage = (props) => {
    const {text} = props
    return (
        <div className="dialog__operatorMessage">     
            <div className="dialog__operatorMessage__text">{text}</div> 
            <div className="dialog__operatorMessage__avatar"><img src={avatarOperator} alt="avatar" /></div>
        </div>
    )
}

export default Message