import { useState, useEffect, useRef } from 'react'
import './css/styles.scss'

function App() {

  // Rules for determining winner
  const [rules, setRules] = useState({
    "scissors": { "win": ["paper", "lizard"], "lose": ["rock", "spock"] },
    "paper": { "win": ["rock", "spock"], "lose": ["scissors", "lizard"] },
    "rock": { "win": ["scissors", "lizard"], "lose": ["paper", "spock"] },
    "lizard": { "win": ["paper", "spock"], "lose": ["rock", "scissors"] },
    "spock": { "win": ["scissors", "rock"], "lose": ["lizard", "paper"] }
  });

  // dialog variables
  const dialogRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  // Score
  const [score, setScore] = useState(12);
  const [win, setWin] = useState(false);

  // State
  const [chosen, setChosen] = useState(false);

  // Toggle modal state
  useEffect(() => {
    const dialog = dialogRef.current;

    if (isOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }

    return () => {
      dialog.close();
    };
  }, [isOpen]);

  //how to test if win
  // console.log(rules["scissors"]["win"].includes("paper"))

  // make area outside clickable and check that flag is reset on escape
  // const closeModalClick = (e) => {
  //   const dialog = dialogRef.current;
  //   const rect = dialog.getBoundingClientRect();
  //   if (
  //     e.clientX < rect.left ||
  //     e.clientX > rect.right ||
  //     e.clientY < rect.top ||
  //     e.clientY > rect.bottom
  //   ) {
  //     dialog.close();
  //   }
  // }

  return (
    <>
      <main>
        <section className='game'>
          {/* 

          You Picked
          The House Picked

          You Win
          You Lose

          Play Again */}
          <div className='game__header'>
            <h1>Rock Paper Scissors Lizard Spock</h1>

            <div className='game__score'>
              Score
              <span className='game__score--value'>{score}</span>
            </div>
          </div>

          {/* Choosing Step */}
          <div className={!chosen ? 'game__choice' : 'game__choice hidden'} aria-hidden={chosen} inert={chosen}>

          </div>

          {/* Results */}
          <div className={chosen ? 'game__results' : 'game__results hidden'} aria-hidden={!chosen} inert={!chosen}>
            <div className='results__user'>
              <h2>You Picked</h2>
              <div className='results__display'>
                {/* Results image */}
              </div>
            </div>

            <div className='results__computer'>
              <h2>The House Picked</h2>
              <div className='results__display results__display--house'>
                {/* Results image */}
              </div>
            </div>

            <div className='results__result'>
              <h2>{win ? "You Win" : "You Lose"}</h2>
              <button className='results__reset'>Play Again</button>
            </div>
          </div>


          <button onClick={() => setIsOpen(true)} className='game__rule-btn'>Rules</button>
        </section>


        <dialog className='rules' ref={dialogRef}>
          <button onClick={() => setIsOpen(false)}>Close</button>
        </dialog>

      </main>

      <footer className="attribution">
        Challenge by <a href="https://www.frontendmentor.io?ref=challenge">Frontend Mentor</a>.
        Coded by <a href="https://github.com/Ankia-Fuls">Ankia Fuls</a>.
      </footer>

    </>
  )
}

export default App
