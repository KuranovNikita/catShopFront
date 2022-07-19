import MainIcon from '../../resources/svg/mainIcon'
import UserIcon from '../../resources/svg/userIcon'
import menuImg from '../../resources/img/menuImg.png'
import avatarOperator from '../../resources/img/avatarOperator.png'

import './header.scss'

const Header = (props) => {

    const {clickExit} = props
    const name = localStorage.getItem('name')
    const surname = localStorage.getItem('surname')
    const info = `${name} ${surname}`
    
    // const clickExit = () => {
    //     localStorage.removeItem('aut')
    //     localStorage.removeItem('name')
    //     localStorage.removeItem('surname')
    //     window.location.reload()
    // }

    return (
        <div className="header">
            <div className="header__company">
                <h1 className="header__company__text">Магазин котов</h1>
            </div>
            <div className="header__emblem">
                <MainIcon/>
            </div>
            <div className="header__name">
                <div className="header__name__wrapper">
                    <div className="header__name__img">
                        <img src={avatarOperator} alt="avatarOperator" />
                    </div>
                    <div className="header__name__info">
                        <UserIcon/>
                    </div>    
                </div>
                <div className="header__name__menu">
                    <div className="header__name__menu__text">{info}</div>
                    <button onClick={()=> clickExit()} className="header__name__menu__btn">Выйти</button>
                </div>
            </div>
        </div>
    )
    
}

export default Header