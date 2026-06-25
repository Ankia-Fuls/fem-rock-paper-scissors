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
  const [userChoice, setUserChoice] = useState(null);

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

  // USER CHOOSE
  const choose = (value) => {
    setUserChoice(value);
    // Process other items
    setChosen(true);
  }

  return (
    <>
      <main>
        <section className='game'>
          <div className='game__header'>
            <h1>Rock Paper Scissors Lizard Spock</h1>

            <div className='game__score'>
              Score
              <span className='game__score--value'>{score}</span>
            </div>
          </div>

          {/* Choosing Step */}
          <div className={!chosen ? 'game__choice' : 'game__choice hidden'} aria-hidden={chosen} inert={chosen}>
            {/* SCISSORS */}
            <button className='choice__btn' onClick={() => choose("scissors")} aria-label='Choose scissors' id="scissors">
              <div className='choice__btn--wrapper'>
                <img src="./src/assets/images/icon-scissors.svg" alt="" />
              </div>
            </button>

            {/* PAPER */}
            <button className='choice__btn choice__btn--blue' onClick={() => choose("paper")} aria-label='Choose paper' id="paper">
              <div className='choice__btn--wrapper'>
                <img src="./src/assets/images/icon-paper.svg" alt="" />
              </div>
            </button>

            {/* ROCK */}
            <button className='choice__btn choice__btn--red' onClick={() => choose("rock")} aria-label='Choose rock' id="rock">
              <div className='choice__btn--wrapper'>
                <img src="./src/assets/images/icon-rock.svg" alt="" />
              </div>
            </button>

            {/* LIZARD */}
            <button className='choice__btn choice__btn--purple' onClick={() => choose("lizard")} aria-label='Choose lizard' id="lizard">
              <div className='choice__btn--wrapper'>
                <img src="./src/assets/images/icon-lizard.svg" alt="" />
              </div>
            </button>

            {/* SPOCK */}
            <button className='choice__btn choice__btn--cyan' onClick={() => choose("spock")} aria-label='Choose spock' id="spock">
              <div className='choice__btn--wrapper'>
                <img src="./src/assets/images/icon-spock.svg" alt="" />
              </div>
            </button>
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
