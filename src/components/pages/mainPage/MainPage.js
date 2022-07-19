import Header from '../../header/Header'
import InfoBar from '../../infoBar/InfoBar'
import LeftBar from '../../leftBar/LeftBar'
import { useState} from "react";
import './mainPage.scss'
import qrViber from '../../../resources/img/information/qrViber.png'
import online from '../../../resources/img/information/online.jpg'
import messagesOperator from '../../../resources/img/information/messagesOperator.png'
import endDialog from '../../../resources/img/information/endDialog.png'
import exit from '../../../resources/img/information/exit.png'


const MainPage = (props) => {
    const {switchClick, isOnline, clickExit} = props

    return (
        <>
            <Header clickExit={clickExit}/>
            <InfoBar text='Информация' switchClick={switchClick} isOnline={isOnline}/>
            <div className="workspace">
                <LeftBar/>
                <div className="mainPage">
                    <div className="mainPage__header">Общая информация о проекте.</div>
                    <div className="mainPage__info">Проект представляет собой платформу для омниканальных коммуникаций с клиентами. Все обращения клиентов из разных каналов, 
                    мессенджеров будут в одном окне. Выбор оператора осуществляется в зависимости от нагрузки. Все обращения находятся в единой базе данных.</div>
                    <div className="mainPage__info">Выполнена интеграция с telegram и viber. Возможны интеграции с любыми открытыми API.</div>
                    <div className="mainPage__info">Frontend разработан на React. Backend часть на Django.</div>
                    <div className="mainPage__info">Оптимизации под мобильные устройства не предусмотрено на данный момент, предполагается, что операторы используют ПК.</div>
                    <div className="mainPage__header">С чего начать.</div>
                    <div className="mainPage__info">Для проверки работы можно написать <a href="https://t.me/testOmnichannelTelegramNBot" target="_blank">боту в Telegram</a>. </div>
                    <div className="mainPage__info">Или сканируйте QR код для доступа к боту в Viber. Это можно сделать через приложение Viber.</div>
                    <img src={qrViber} alt="qrViber" />
                    <div className="mainPage__header">Использование операторского канала.</div>
                    <div className="mainPage__info">Для начала работы переведите тумблер из положения офлайн в онлайн. 
                    Находясь офлайн, оператор не может принимать новые диалоги от клиентов. Но при этом может вести переписку в уже инициированных диалогах.
                    Это сделано, чтобы оператор мог заблокировать получение новых диалогов, но закончить старые, и после уйти на обед или закончить рабочий день.
                    Если все операторы будут офлайн, то клиент получит сообщение: "В данный момент нет операторов онлайн, обратитесь в часы работы операторов."</div>
                    <img className="mainPage__img" src={online} alt="online" />
                    <div className="mainPage__info">Слева во вкладке сообщения отображаются активные диалоги. Имя формируется из заполненых данных клиента, т.е. как в мессенджере
                    клиент заполнил информацию о себе(например только имя без фамилии), на каком языке и т.д.
                    Если в списке диалогов возле сообщения маленькая аватарка оператора, то значит последнее сообщение от оператора клиенту в диалоге.
                    Если нет аватарки, то сообщение от клиента к оператору. Так же есть счетчик непрочитанных сообщений в диалоге. Внутри диалога около имени клиента ставится
                    приписка, откуда клиент пишет сообщения.</div>
                    <img className="mainPage__img" src={messagesOperator} alt="messagesOperator" />
                    <div className="mainPage__info">В диалоге есть кнопка "Закончить разговор". При ее нажатии диалог завершается, и если клиент через некоторое время напишет,
                    то попадет к оператору согласно распределению онлайн операторов. В данный момент подсчитывается количество активных диалогов, и отправляется тому оператору,
                    у которого меньше активных диалогов.</div>
                    <img className="mainPage__img" src={endDialog} alt="endDialog" />
                    <div className="mainPage__info">После завершения работы требуется выйти из своего аккаунта. В таком случае на сервере будет пометка, что оператор офлайн.</div>
                    <img className="mainPage__img" src={exit} alt="exit" />
                    <div className="mainPage__header">Планы на будущее.</div>
                    <ul className="mainPage__list">
                        <li className="mainPage__listItem">Использование менеджера состояний в приложении, например Redux.</li>
                        <li className="mainPage__listItem">Применение WebSocket для получения информации от сервера.</li>
                        <li className="mainPage__listItem">Авторизация посредством JWT(JSON Web Token).</li>
                        <li className="mainPage__listItem">Расширение статистики.</li>
                        <li className="mainPage__listItem">Просмотр закрытых диалогов.</li>
                        <li className="mainPage__listItem">Добавление уникальных аватарок операторам и клиентам.</li>
                        <li className="mainPage__listItem">Прием и передача файлов в диалоге.</li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default MainPage;