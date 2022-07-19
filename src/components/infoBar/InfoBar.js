import './infoBar.scss'

const InfoBar = (props) => {

    const {isOnline, switchClick} = props

    const text = isOnline ? "Онлайн" : "Офлайн"


    return (
        <div className="infoBar">
                <div className="infoBar__name">{props.text}</div>
                <div className="infoBar__toogleBlock">
                    <div className="infoBar__toogleBlock__text">{text}</div>
                    <div className={isOnline ? "infoBar__toogleBlock__toogle switch-on" : "infoBar__toogleBlock__toogle"} onClick={switchClick}></div>
                </div>
            </div>
    )
    
}

export default InfoBar