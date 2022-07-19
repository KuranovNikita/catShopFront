import {useHttp} from '../hooks/http.hook';


const useOperatorService = () => {
    const {loading, request, error, clearError, simpleRequest} = useHttp();

    const _apiBase = 'https://cat-shop-back63.herokuapp.com/';
    // const _apiBase = 'http://127.0.0.1:8000/';

    // const getNewData = async (offset = _baseOffset) => {
    //     const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apKey}`);
    //     return _transformOperator(res.data.results[0]);
    // }

    const getNewData = async (login) => {
        // const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`);
        const body = JSON.stringify({login : login});
        const res = await request(`${_apiBase}getDialogs`, 'POST', body);
        
        const result = JSON.parse(res)
        const res1 = [{clientName: 'Иван Петров', typeDialog:'telegram', avatarNumber: 1, idChat: 'a1', messages: [{text: 'Привет эт Ваня', isOperator: false, isRead: true, idMessage: 101}, {text: 'Что хотел', isOperator: true, isRead: true, idMessage: 102}]},
                        {clientName: 'Колян', typeDialog:'telegram', avatarNumber: 1, idChat: 'a2', messages: [{text: 'Привет эт Коля', isOperator: false, isRead: true, idMessage: 201}, {text: 'Что хотел???', isOperator: true, isRead: true, idMessage: 202},  {text: 'Простооооо))))))))', isOperator: false, isRead: true, idMessage: 203}]},
                        {clientName: 'Владимир Официоз', typeDialog:'telegram', avatarNumber: 1, idChat: 'a3', messages: [{text: 'Привет это Вова', isOperator: false, isRead: true, idMessage: 301}, {text: 'Что вы хотели', isOperator: true, isRead: true, idMessage: 302},  {text: 'Узнать важное', isOperator: false, isRead: false, idMessage: 303}]},
                        ]
        return result
    }

    const isReadMessage = (idMessage) => {
        const body = JSON.stringify({idMessage : idMessage});
        const res = simpleRequest(`${_apiBase}isReadMessage`, 'POST', body);
    }

    const sendMessage = (msg, idChat, idMessage) => {
        const body = JSON.stringify({msg : msg, idChat : idChat, idMessage : idMessage});
        const res = simpleRequest(`${_apiBase}getMessageFromOperator`, 'POST', body);
    }

    const deleteDialog = (idChat, login) => {
        const body = JSON.stringify({idChat : idChat, login : login});
        const res = simpleRequest(`${_apiBase}deleteDialog`, 'POST', body);
    }

    const setOnline = (login, online) => {
        const body = JSON.stringify({login : login, online : online});
        const res = simpleRequest(`${_apiBase}setOnline`, 'POST', body);
    }

    const checkAuth = async (login, password) => {
        const body = JSON.stringify({login : login, password: password});
        const res = await request(`${_apiBase}checkAuth`, 'POST', body);
        const result = JSON.parse(res)
        return result
    }

    const getStatistics = async (login) => {
        const body = JSON.stringify({login : login});
        const res = await request(`${_apiBase}getStatistics`, 'POST', body);
        const result = JSON.parse(res)
        return result
    }
    

    return {loading, error, clearError, getNewData, isReadMessage, sendMessage, checkAuth, deleteDialog, setOnline, getStatistics}
}

export default useOperatorService;