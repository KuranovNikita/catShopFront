import useOperatorService from '../../../services/OperatorService'
import { useState, useEffect} from "react";
import Header from '../../header/Header'
import InfoBar from '../../infoBar/InfoBar'
import LeftBar from '../../leftBar/LeftBar'
import './statisticPage.scss'


const StatisticPage = (props) => {

    const {switchClick, isOnline, clickExit} = props
    const {getStatistics} = useOperatorService();
    const [allDialogsNum, setAllDialogsNum] = useState('');
    const [sendMessageNum, setSendMessageNum] = useState('');
    const [readMessageNum, setReadMessageNum] = useState('');

    useEffect(() => {
        if (localStorage.getItem('aut') === '1') {
            onRequest(true);
        }
      }, [])

    function onRequest(initial){
        getStatistics(localStorage.getItem('login'))
          .then(onStatisticsLoaded)
    }

    const onStatisticsLoaded = (newDataList) => {
        console.log(newDataList)
        setAllDialogsNum(newDataList.allDialogs)
        setSendMessageNum(newDataList.sendMessage)
        setReadMessageNum(newDataList.readMessage)
    }

    const name = localStorage.getItem('name')
    const surname = localStorage.getItem('surname')
    const info = `${name} ${surname}`
    let content = <div className="statisticPage__info">Загрузка статистики</div>
    
    if (allDialogsNum) {
        content = <div className="statisticPage__info">
                    <div className="statisticPage__info__element">Инициировано диалогов: {allDialogsNum}</div>
                    <div className="statisticPage__info__element">Отправлено сообщений: {sendMessageNum}</div>
                    <div className="statisticPage__info__element">Получено сообщений: {readMessageNum}</div>
                </div>
    }

    return (
        <>
            <Header clickExit={clickExit}/>
            <InfoBar text='Статистика' switchClick={switchClick} isOnline={isOnline}/>
            <div className="workspace">
                <LeftBar/>
                <div className="workspace__wrapper">
                    <div className="statisticPage">
                        <h2 className="statisticPage__header">Оператор {info}</h2>
                        {content}
                    </div>
                    
                </div>
            </div>
        </>
    )
}

export default StatisticPage;