import Board  from './Board'
import './MainGame.css'
import {useState} from 'react'

const MainGame = () => 
{
    const[turn, setTurn] = useState("X")
    const [isWinner, setWinner] = useState("")
    


    const changeTurn = (player) =>
    {
        setTurn(player);
    }
    
    const displayWinner= (message) =>
    {
        setWinner(message);
    }




    return(
        <div className="main">
            <h1 className = "title">TIC-TAC-TOE</h1>
            
            <h1>It's {turn} turn!</h1>
            <div>
                <Board curTurn = {turn} swapTurn = {changeTurn} winner={displayWinner}></Board>
            </div>
            <div className = "winner">
            <h2 >{isWinner} </h2>
            </div>
            
        </div>
    );
}

export default MainGame;