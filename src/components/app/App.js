import { useState, useEffect } from "react";
import {DialogPage, MainPage, StatisticPage, AuthPage} from "../pages";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import useOperatorService from '../../services/OperatorService'
import Header from "../header/Header";

const App = () => {
  const [allMessages, setAllMessages] = useState('');
  const [selectDialog, setSelectDialog] = useState('');
  const [timerId, setTimerId] = useState('');
  const {loading, error, getNewData, isReadMessage, sendMessage, deleteDialog, setOnline} = useOperatorService();
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [isOnline, setIsOnline] = useState(false);
  const [aut, setAut] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('aut') === '1') {
      const timerIdEffect = setInterval(() => onRequest(true), 1000);
      setOnline(localStorage.getItem('login'), false)
    }
    // const timerIdEffect = setInterval(() => onRequest(true), 1000);
    // if (aut) {
    //   const timerIdEffect = setInterval(() => onRequest(true), 1000);
    //   setTimerId(timerIdEffect)
    // } else {
    //   clearInterval(timerId)
    // }
  }, [])

  // useEffect(() => {
  //   if (aut) {
  //     const timerIdEffect = setInterval(() => onRequest(true), 1000);
  //     setTimerId(timerIdEffect)
  //   } else {
  //     clearInterval(timerId)
  //   }
  // }, [aut])
  

  useEffect(() => {
    checkReadMessage()
  }, [selectDialog])


  function onRequest(initial){
    initial ? setNewItemLoading(false) : setNewItemLoading(true);
    getNewData(localStorage.getItem('login'))
      .then(onDataListLoaded)
  }

  const onDataListLoaded = (newDataList) => {
    setAllMessages(allMessages => [...newDataList])
  }

  const onDialogSelectedApp = (id) => {
    setSelectDialog(id)  
  }

  const buttonDeleteDialog = () => {
    deleteDialog(selectDialog, localStorage.getItem('login'))
    setSelectDialog('')
  }

  const checkReadMessage = () => {
    let arr = allMessages
    if (arr.length > 0) {
      arr.forEach((element) => {
        if (element.idChat === selectDialog) {
          // console.log(element)
          element.messages.forEach((el) => {
            if (el.isRead === false) {
              el.isRead = true
              // console.log(el.idMessage)
              isReadMessage(el.idMessage)
            }
            
          })
        }
      })
    }
    setAllMessages(allMessages => [...arr])
  }

  const sendMessageFromOperator = (text, selectDialogidChat) => {
    let arr = allMessages
    const rnd = Math.floor(Math.random() * (999999999 - 100 + 1) + 100)
    const msg = {text: text, isOperator: true, isRead: true, idMessage: rnd}
    arr.forEach((element) => {
        if (element.idChat === selectDialogidChat) {
            element.messages.push(msg)
        }
    })
    sendMessage(text, selectDialogidChat, rnd)
    setAllMessages(allMessages => [...arr])
  }

  const switchClick = () => {
    if (isOnline) {
      setIsOnline(false)
      setOnline(localStorage.getItem('login'), false)
    } else {
      setIsOnline(true)
      setOnline(localStorage.getItem('login'), true)
    } 
  }

  const clickExit = () => {
    setOnline(localStorage.getItem('login'), false)
    localStorage.removeItem('aut')
    localStorage.removeItem('login')
    localStorage.removeItem('name')
    localStorage.removeItem('surname')
    window.location.reload()
}

  // const clickPlus = () => {
  //   console.log('111')
  //   let arr = [{clientName: 'Иван Петров', typeDialog:'telegram', avatarNumber: 1, idChat: 'a1', messages: [{text: 'Привет эт Ваня', isOperator: false, isRead: true, idMessage: 101}, {text: 'Что хотел', isOperator: true, isRead: true, idMessage: 102}, {text: 'новое сооббшение ', isOperator: false, isRead:false, idMessage: 103}]},
  //   {clientName: 'Колян', typeDialog:'telegram', avatarNumber: 1, idChat: 'a2', messages: [{text: 'Привет эт Коля', isOperator: false, isRead: true, idMessage: 201}, {text: 'Что хотел???', isOperator: true, isRead: true, idMessage: 202},  {text: 'Простооооо))))))))', isOperator: false, isRead: true, idMessage: 203},  {text: 'самое новоек', isOperator: false, isRead:false, idMessage: 204}]},
  //   {clientName: 'Владимир Официоз', typeDialog:'telegram', avatarNumber: 1, idChat: 'a3', messages: [{text: 'Привет это Вова', isOperator: false, isRead: true, idMessage: 301}, {text: 'Что вы хотели', isOperator: true, isRead: true, idMessage: 302}, {text: 'Узнать важное', isOperator: false, isRead: false, idMessage: 303},  {text: 'нвсе не узнал ', isOperator: false, isRead:false, idMessage: 404},  {text: 'и еще хочу', isOperator: false, isRead:false, idMessage: 305}]},
  //   ]
  //   setAllMessages(allMessages => [...arr])
  // }

  const clickAut = () => {
    if (aut) {
      setAut(false)
    } else {
      setAut(true)
    }
    if (localStorage.aut) {
      localStorage.aut = false
    } else {
      localStorage.aut = true
    }
     
  }
  const clickAutFalse = () => {
    localStorage.setItem('aut', '0')
    console.log(localStorage.getItem('aut'))
    window.location.reload()
  }
  const clickAutTrue = () => {
    localStorage.setItem('aut', '1')
    console.log(localStorage.getItem('aut'))
    window.location.reload()
  }

  let page = ''
  if (localStorage.getItem('aut') === '1') {
    page = <Router>
            <Routes>
              <Route path='/' element={<MainPage switchClick={switchClick} isOnline={isOnline} clickExit={clickExit}/>}/>
              <Route path='/dialog' element={<DialogPage allMessages={allMessages} 
                                                          onDialogSelectedApp={onDialogSelectedApp} 
                                                          sendMessageFromOperator={sendMessageFromOperator} 
                                                          switchClick={switchClick} 
                                                          isOnline={isOnline} 
                                                          checkReadMessage={checkReadMessage}
                                                          buttonDeleteDialog={buttonDeleteDialog}
                                                          selectDialog={selectDialog}
                                                          clickExit={clickExit}/>}
                                                          />
              <Route path='/statistic' element={<StatisticPage switchClick={switchClick} isOnline={isOnline} clickExit={clickExit}/>}/>
              <Route path='*' element={<h1>Page not found</h1>}/>
            </Routes>
          </Router>
  } else {
    page = <AuthPage/>
  }

  return (
    // <Router>
    //   <Routes>
    //     <Route path='/' element={<MainPage switchClick={switchClick} isOnline={isOnline}/>}/>
    //     <Route path='/dialog' element={<DialogPage allMessages={allMessages} onDialogSelectedApp={onDialogSelectedApp} sendMessageFromOperator={sendMessageFromOperator} switchClick={switchClick} isOnline={isOnline}/>}/>
    //     <Route path='/statistic' element={<StatisticPage switchClick={switchClick} isOnline={isOnline}/>}/>
    //     <Route path='*' element={<h1>Page not found</h1>}/>
    //   </Routes>
    // </Router>
    <>
      {/* <button onClick={()=> clickAut()}>click</button> */}
      {page}
    </>
  );
}

export default App;
