import React from 'react';
import { formatMoney } from '../../helper/money';
import Cards from '../cards';
import "./styles.scss";
import {isMobile} from 'react-device-detect';

function Player({isYou, index, name, cash, cashSended, isOpened, cards, isMaster, onSend, socketId}) {
    if(isYou) {
        localStorage.setItem("cash2", cash);
    }
    
    const handleBorder = () => {
        if(isYou) {
            return "2px solid #F7C600";
        }

        if(isMaster) {
            return "2px solid #F70000"
        }

        return "2px solid #9880E9";
    }
    const handlePosPc = (index) => {
        switch(index) {
            case 1: 
                return {top: 100, left: -80}
            case 2: 
                return {top: -36, left: 48}
            case 3: 
                return {top: -56, left: 240}
            case 4: 
                return {top: -56, right: 240}
            case 5:
                return {top: -36, right: 48}
            case 6: 
                return {top: 100, right: -80}
            case 7: 
                return {bottom: 100, right: -80}
            case 8: 
                return {bottom: -36, right: 48}
            case 9:
                return {bottom: -56, right: 240}
            case 10:
                return {bottom: -56, left: 240}
            case 11: 
                return {bottom: -36, left: 48}
            case 12: 
                return {bottom: 100, left: -80}
        }
    }
    const handlePosMobile = (index) => {
        switch(index) {
            case 1: 
                return {top: 42, left: -52}
            case 2: 
                return {top: -38, left: 24}
            case 3: 
                return {top: -44, left: 136}
            case 4: 
                return {top: -44, right: 136}
            case 5:
                return {top: -38, right: 24}
            case 6: 
                return {top: 42, right: -52}
            case 7: 
                return {bottom: 42, right: -52}
            case 8: 
                return {bottom: -38, right: 24}
            case 9:
                return {bottom: -44, right: 136}
            case 10:
                return {bottom: -44, left: 136}
            case 11: 
                return {bottom: -38, left: 24}
            case 12: 
                return {bottom: 42, left: -52}
        }
    }

    const handlePos = (isMobile, pos) => {
        if(isMobile) {
            return handlePosMobile(pos);
        } else {
            return handlePosPc(pos)
        }
    }

    const handlePosCard = (index) => {
        if(index === 1 || index === 12) {
            return "right";
        }

        if(index >=2 && index <=5) {
            return "bottom";
        }
        if(index >=6 && index <=7) {
            return "left";
        }
        if(index >=8 && index <=11) {
            return "top";
        }    
    }

    const handleSend = () => {
        let money = prompt("Số tiền muốn tặng cho " + name, 0);

        if (Number(money) >= 1000) {
            onSend(socketId, Number(money));
        }
    }

    return (
        <div className='player' style={{...handlePos(isMobile, index), border:  handleBorder()}} onClick={!isYou && handleSend}>
            <div className='player-header'>
                <p className='player-header-name'>{name} {isMaster && "(nhà cái)"}</p>
                <p className='player-header-cash'>{formatMoney(cash)}đ</p>
                {!isMaster && <p className='player-header-cash'>Đặt: {formatMoney(cashSended)}đ</p>}
            </div>
            {isOpened && <Cards pos={handlePosCard(index)} cards={cards}/>}
        </div>
    );
}

export default Player;