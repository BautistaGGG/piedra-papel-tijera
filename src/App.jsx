import { useState, useEffect } from 'react';
import paper from "./assets/icon-paper.svg"
import rock from "./assets/icon-rock.svg"
import scissors from "./assets/icon-scissors.svg"


function Game() {
  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  
  const [score, setScore] = useState({
    user: 0,
    computer: 0,
  });

  const [gameResult, setGameResult] = useState(null);
  const [gameOver, setGameOver] = useState(false);


  useEffect(() => {
    const storedScore = localStorage.getItem('score');
    if (storedScore) {
      setScore(JSON.parse(storedScore));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('score', JSON.stringify(score));
  }, [score]);

  // TERMINA el juego

  useEffect(() => {
    if (score.user === 10 || score.computer === 10) {
      setGameOver(true);
    }
  }, [score]);


  console.log("USER: " + userChoice, "PC: " + computerChoice);

  // Pick del USER

  function handleUserChoice(choice) {
    if (!gameOver) {
      setUserChoice(choice);
      generateComputerChoice();
    }
  }

  // Pick de la PC

  function generateComputerChoice() {
    const choices = ['piedra', 'papel', 'tijera'];
    const randomChoice = choices[Math.floor(Math.random() * choices.length)];
    //DELAY al display del
    // setTimeout(() => {
      setComputerChoice(randomChoice);
      determineGameResult();
    // }, 2000)
  }

  // Resultado de la mano

  function determineGameResult() {
    if (userChoice === computerChoice) {
      setGameResult('Empate! Se mantiene el resultado');
    } else if (
      (userChoice === 'piedra' && computerChoice === 'tijera') ||
      (userChoice === 'papel' && computerChoice === 'piedra') ||
      (userChoice === 'tijera' && computerChoice === 'papel')
    ) {
      setGameResult('Ganaste la mano!');
      setScore((prevScore) => ({...prevScore, user: prevScore.user + 1 }));
    } else {
      setGameResult('PC ganó la mano!');
      setScore((prevScore) => ({...prevScore, computer: prevScore.computer + 1 }));
    }
  }

  // REINICIO del juego

  function restartGame() {
    setScore({ user: 0, computer: 0 });
    setGameOver(false);
  }

  return (
    <main className="bg-gradient-to-b from-[#1F3756] to-[#141539] p-4 pt-6 md:p-6 lg:p-12">
      <aside className='flex justify-between p-4 border-2 border-gray-400 rounded-lg'>
        <div>
          <h1 className="text-left text-white text-3xl font-bold">
            ROCK
          </h1>
          <h1 className="text-left text-white text-3xl font-bold">
            PAPER
          </h1>
          <h1 className="text-left text-white text-3xl font-bold">
            SCISSORS
          </h1>
        </div>

        <div className='bg-white rounded-md p-4'>
          <p className='font-bold text-xl text-center text-blue-800'>
            SCORE           
          </p>
          <h2 className='font-bold text-xl text-center text-gray-800'>
            {score.user}
          </h2>
        </div>
      </aside>

      {/* ICONOS A JUGAR */}

      <div className="flex justify-center gap-12 my-8">
        <button
          className="justify-self-end bg-gray-100 hover:bg-gray-300 py-2 px-4 rounded-full border-4 border-red-600 mr-2 mb-2"
          onClick={() => handleUserChoice('piedra')}
          disabled={gameOver}
        >
          <img src={rock} alt="piedra-icon" />
        </button>
        <button
          className="justify-self-start bg-gray-100 hover:bg-gray-300 py-2 px-4 rounded-full border-4 border-blue-800 mr-2 mb-2"
          onClick={() => handleUserChoice('papel')}
          disabled={gameOver}
        >
          <img src={paper} alt="papel-icon" />
        </button>
      </div>
      <button
        className="block my-0 mx-auto justify-center bg-gray-100 hover:bg-gray-300 py-2 px-4 rounded-full border-4 border-yellow-400 mb-2"
        onClick={() => handleUserChoice('tijera')}
        disabled={gameOver}
      >
        <img src={scissors} alt="scissors-icon" />
      </button>

      {/* TEXTO RESULTADOS */}
      
      {userChoice && computerChoice && (
        <div className="flex flex-col flex-wrap justify-center mb-4 text-white">
          <p className="text-lg mb-2">Elegiste: {userChoice}</p>
          <p className="text-lg mb-2">PC eligió: {computerChoice}</p>
          <p className="text-lg font-bold">Resultado de la mano: {gameResult}</p>
        </div>
      )}
      <div className="flex flex-col flex-wrap justify-center mb-4 text-white  ">
        <p className="text-lg mb-2">Score:</p>
        <p className="text-lg mb-2">Vos: {score.user}</p>
        <p className="text-lg mb-2">PC: {score.computer}</p>
      </div>
      {/* BUTTON DE REINICIO if llega a 10 el SCORE */}
      {gameOver && (
        <button
          className="block my-0 mx-auto justify-center bg-gray-100 hover:bg-gray-300 py-2 px-4 rounded-full border-4 border-blue-800 mb-2"
          onClick={restartGame}
        >
          <p className='font-bold text-xl text-center text-black'>
            Reiniciar Juego           
          </p>
        </button>
      )}
    </main>
  );
}

export default Game;