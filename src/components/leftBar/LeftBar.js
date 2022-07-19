import {NavLink} from 'react-router-dom';
import ChatIcon from '../../resources/svg/chatIcon'
import HomeIcon from '../../resources/svg/homeIcon'
import StatisticIcon from '../../resources/svg/statisticIcon'
import './leftBar.scss'

const LeftBar = () => {

    return (
        <div className="workspace__left">
            <div className="workspace__left__icon">
                <NavLink end style={({isActive}) => ({fill: isActive? '#ffffff' : '#8a8a8a'})} to="/"><HomeIcon/></NavLink>
            </div>
            <div className="workspace__left__icon">
                <NavLink end style={({isActive}) => ({fill: isActive? '#ffffff' : '#8a8a8a'})} to="/dialog"><ChatIcon/></NavLink>
            </div>
            <div className="workspace__left__icon">
                <NavLink end style={({isActive}) => ({fill: isActive? '#ffffff' : '#8a8a8a'})} to="/statistic"><StatisticIcon/></NavLink>
            </div>
        </div>
    )
    
}

export default LeftBar