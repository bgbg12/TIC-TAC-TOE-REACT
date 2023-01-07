import Cell from "./Cell"
import './Board.css'
import { useEffect, useState } from "react";

const patterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
    ];



const Board = (props) =>
{
    const[board, setBoard]=useState(["","","","","","","","",""]);
    const[turn, setTurn] = useState(props.curTurn);
    const [gameEnded, setGameEnded] = useState(false);


    useEffect(()=> 
    {
        winnerCheck();
        

    }, [board])


    const cellClicked = (ind)=>
    {
        if (gameEnded) {
            props.curTurn("")
            return;
        }
        setBoard(board.map((val, index)=> 
        {
            if(ind === index && val === "") 
            {
                return turn;
            }
            else
            { 
                return val;   
            }
        }));

        if(turn === "X")
        {
            setTurn("O")
            props.swapTurn("O")
        }
        else
        {
            setTurn("X")
            props.swapTurn("X")
        }
    }
   
    
    const winnerCheck = () =>
    {
        let isWin= false;
        patterns.forEach((curPat)=>{ 
            const fPlayer = board[curPat[0]];  
            if(fPlayer === "")
            {
                return;
            }
            let win = true
            curPat.forEach((ind)=>
            {
                if(board[ind] !== fPlayer) 
                {
                    win = false;
                }
            });
            if(win)
            {
                isWin = true;

                if(turn === 'X')
                {
                    props.winner("The winner is ............  Player O ! !")
              
                }
                else
                {
                    props.winner("The winner is ............  Player X ! !")
                  
                }
                let tie = true;
                board.map((val)=>
                {
                    if(val === "")
                    {
                        tie = false;
                    }

                })
                if(tie)
                {
                    setGameEnded(true)
                    props.winner("It's a tie!")
                }
            }
        });
        setGameEnded(isWin);
        return isWin;
    }


    
    

    const restartClicked = () =>{

        setBoard(Array(9).fill(""))
        props.swapTurn("X")
        props.winner('')
        props.turn('')

      }

    
    return(
        <div>
            <div className="game-board">
            {board.map((val,index)=>{
                return(<Cell turn={turn} val = {val} ind = {index} clicked={cellClicked}></Cell>)
            })}
            </div><br></br>
            <div><button id="restartButton" onClick={restartClicked}>Restart Here</button></div>
        </div>
        

    );
}

export default Board;