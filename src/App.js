import React from 'react';
import { useState } from 'react';
import "./App.css";

const App = () => {

  const [turn, setTurn] = useState("O");
  const [cells, setCells] = useState(Array(9).fill(""));
  const [winner, setWinner] = useState();
  const [scores, setScores] = useState({X: 0, O: 0});
  const [light, setMode] = useState(true); 

  const handleReset = () => {
    setWinner(null);
    setCells(Array(9).fill(""));
  }

  const win = (box) => {
    let opportunities = {
      across: [[0, 1, 2], [3,4,5], [6,7,8]],
      down: [[0,3,6], [1,4,7], [2,5,8]],
      diagonal: [[0, 4, 8], [2,4,6]]
    };

    for (let combination in opportunities){
     opportunities[combination].forEach(pattern => {
        if(box[pattern[0]] === "" || box[pattern[1]] === "" || box[pattern[2]] === ""){
          return;
        }

        else if(box[pattern[0]] === box[pattern[1]] && box[pattern[1]] === box[pattern[2]]){
            setWinner(box[pattern[0]]);
            if(box[pattern[0]] === "X"){
              setScores((previousScore) => {
                return {
                  X: scores.X + 1,
                  O: scores.O
                }
              })

              console.log(scores)
            }

            else{
              setScores((previousScore) => {
                return {
                  X: previousScore.X,
                  O: previousScore.O +  1
                }
              })
            }
        }

        else if(!box.includes("")){
          setWinner("No one ")
        }
     }); 
    }
  }

  const handleClick = (num) =>{
    if(cells[num]){
      alert("Already clicked!");
      return;
    }

    let boxes = [...cells];

    if(turn === "O"){
      boxes[num] = "O";
      setTurn("X");
    }
    else{
      setTurn("O");
      boxes[num] = "X";
    }

    win(boxes);
    setCells(boxes)
  }

  const Cell = (props) => {
    return <div className='cell'
    onClick={() => {
      handleClick(props.num)
    }}
    >
    {cells[props.num]}
    </div>
  }

  const changeMode = () => {
    setMode(!light);

    let body = document.body
    body.classList.toggle("dark-theme");
  } 


  const LightMode = () => {
    return <div className="light"
    onClick={() => {
      changeMode()
    }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><path d="M256,118a22,22,0,0,1-22-22V48a22,22,0,0,1,44,0V96A22,22,0,0,1,256,118Z"/><path d="M256,486a22,22,0,0,1-22-22V416a22,22,0,0,1,44,0v48A22,22,0,0,1,256,486Z"/><path d="M369.14,164.86a22,22,0,0,1-15.56-37.55l33.94-33.94a22,22,0,0,1,31.11,31.11l-33.94,33.94A21.93,21.93,0,0,1,369.14,164.86Z"/><path d="M108.92,425.08a22,22,0,0,1-15.55-37.56l33.94-33.94a22,22,0,1,1,31.11,31.11l-33.94,33.94A21.94,21.94,0,0,1,108.92,425.08Z"/><path d="M464,278H416a22,22,0,0,1,0-44h48a22,22,0,0,1,0,44Z"/><path d="M96,278H48a22,22,0,0,1,0-44H96a22,22,0,0,1,0,44Z"/><path d="M403.08,425.08a21.94,21.94,0,0,1-15.56-6.45l-33.94-33.94a22,22,0,0,1,31.11-31.11l33.94,33.94a22,22,0,0,1-15.55,37.56Z"/><path d="M142.86,164.86a21.89,21.89,0,0,1-15.55-6.44L93.37,124.48a22,22,0,0,1,31.11-31.11l33.94,33.94a22,22,0,0,1-15.56,37.55Z"/><path d="M256,358A102,102,0,1,1,358,256,102.12,102.12,0,0,1,256,358Z"/></svg>
    </div>
  }

  const DarkMode = () => {
    return <div className="dark" 
    onClick={() => {
      changeMode()
    }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><path d="M264,480A232,232,0,0,1,32,248C32,154,86,69.72,169.61,33.33a16,16,0,0,1,21.06,21.06C181.07,76.43,176,104.66,176,136c0,110.28,89.72,200,200,200,31.34,0,59.57-5.07,81.61-14.67a16,16,0,0,1,21.06,21.06C442.28,426,358,480,264,480Z"/></svg>
    </div>
  }

  
  const ScoreBoard = () => {
    return <div className="scoreboard">
      <h3>Scoreboard</h3>
      
      <div className="X">Player X : {scores.X}</div>
      <div className="O">Player O : {scores.O}</div>
    </div>
  }

  return (
    <div className='container'>

      <div className="modes">
        {light ? <DarkMode /> : <LightMode />}
      </div>

      <div className="game">
        <div className="header">
          <h2>Tic-Tac-Toe Game</h2>

          <ScoreBoard />

          <p>Whose turn is it to play? {turn}</p>
        </div>
        <Cell num={0} />
        <Cell num={1} />
        <Cell num={2} />
        <Cell num={3} />
        <Cell num={4} />
        <Cell num={5} />
        <Cell num={6} />
        <Cell num={7} />
        <Cell num={8} />
      </div>

      {
        winner && (
          <div className='result'>
            <p>{winner} is the winner.</p>
            <button onClick={() => {handleReset()}}>We go again!😁</button>
          </div>
        )
      }
      
    </div>
  )
}

export default App;