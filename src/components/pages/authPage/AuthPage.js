import {useState} from 'react'
import useOperatorService from '../../../services/OperatorService';
import MainIcon from '../../../resources/svg/mainIcon';
import './authPage.scss'

const AuthPage = (props) => {
    
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const {checkAuth} = useOperatorService()

    const sendAuthData = () => {
        checkAuth(login, password)
            .then(onAuthLoaded)
    }

    const onAuthLoaded = (newResponse) => {
        console.log(newResponse)
        switch (newResponse.response) {
            case 'yes':
                localStorage.setItem('aut', '1')
                localStorage.setItem('login', newResponse.login)
                localStorage.setItem('name', newResponse.name)
                localStorage.setItem('surname', newResponse.surname)
                console.log(localStorage.getItem('aut'))
                window.location.reload()
                break;
            case 'not password':
                console.log(newResponse)
                setError('not password')
              break;
            case 'not login':
                console.log(newResponse)
                setError('not login')
              break;
            default:
                console.log(newResponse)
          }
    }

    let errorDiv = ''

    if (error === 'not password') {
        errorDiv = <div className="auth__workspace__error">Неверный пароль</div>
    } else if (error === 'not login') {
        errorDiv = <div className="auth__workspace__error">Неверный Логин</div>
    }


    return (
        <>  
            <div className="auth">
                <div className="auth__wrapper">
                <div className="auth__info">
                    <div className="auth__info__emblem"><MainIcon/></div>
                    <h2 className="auth__info__header">Магазин котов</h2>
                    <div className="auth__info__line"></div>
                    <div className="auth__info__text">Вы можете воспользоваться двумя аккаунтами для тестирования.</div>
                    <div className="auth__info__text">Логин: nikitakuranov  Пароль: operator1</div>
                    <div className="auth__info__text">Логин: dmitryserov  Пароль: operator2</div>
                </div>
                <div className="auth__workspace">
                    <h2 className="auth__workspace__header">Вход в аккаунт оператора</h2>
                    <div className="auth__workspace__line"></div>
                    {errorDiv}
                    <div className="auth__workspace__title">Логин</div>
                    <input type="text" className="auth__workspace__input" onChange={event => setLogin(event.target.value.replace(/\s/g, ''))}/>
                    <div className="auth__workspace__title">Пароль</div>
                    <input type="password" className="auth__workspace__input" onChange={event => setPassword(event.target.value.replace(/\s/g, ''))}/>
                    <button className="auth__workspace__btn" onClick={()=> sendAuthData()}>Продолжить</button>
                </div>  
                </div>
                   
            </div>
            
        </>
    )
}

export default AuthPage;