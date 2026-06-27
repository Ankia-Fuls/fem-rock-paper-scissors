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
  const [score, setScore] = useState(0);
  const [result, setResult] = useState("");

  // State
  const [chosen, setChosen] = useState(false);

  // Choices
  const [userChoice, setUserChoice] = useState("");
  const [computerChoice, setComputerChoice] = useState("");

  // LOCAL STORAGE SCORE INIT
  useEffect(() => {
    const value = JSON.parse(localStorage.getItem("score"));
    if (value) {
      setScore(value);
    }
    else {
      setScore(0);
    }
  }, [])

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

  // USER CHOOSE VALUE
  const choose = (value) => {
    setUserChoice(value);

    // get computer result
    const computerRes = computerChoose();

    // compare
    winner(value, computerRes);

    // Update state for next page
    setChosen(true);
  }

  // COMPUTER RESULT
  const computerChoose = () => {
    const options = ["scissors", "paper", "rock", "lizard", "spock"];

    // random value
    const rand = Math.floor(Math.random() * 5);

    // set computer choice
    const tempResult = options[rand];
    setComputerChoice(tempResult);

    return tempResult;
  }

  // DETERMINE WINNER
  const winner = (user, computer) => {
    if (user === computer) {
      // tie
      setResult("You Tied");
    }
    else if (rules[user]["win"].includes(computer)) {
      // user win
      setResult("You Win");
      // update score
      const tempScore = score + 1;
      setScore(tempScore);
      localStorage.setItem("score", tempScore);
    }
    else {
      setResult("You Lose");
      // update score
      if (score > 0) {
        const tempScore = score - 1;
        setScore(tempScore);
        localStorage.setItem("score", tempScore);
      }
      else {
        setScore(0);
        localStorage.setItem("score", 0);
      }
    }
  }

  // RESET GAME
  const reset = () => {
    setUserChoice("");
    setComputerChoice("");
    setResult("");

    setChosen(false);
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
            <button className='choice__btn' onClick={() => choose("paper")} aria-label='Choose paper' id="paper">
              <div className='choice__btn--wrapper'>
                <img src="./src/assets/images/icon-paper.svg" alt="" />
              </div>
            </button>

            {/* ROCK */}
            <button className='choice__btn' onClick={() => choose("rock")} aria-label='Choose rock' id="rock">
              <div className='choice__btn--wrapper'>
                <img src="./src/assets/images/icon-rock.svg" alt="" />
              </div>
            </button>

            {/* LIZARD */}
            <button className='choice__btn' onClick={() => choose("lizard")} aria-label='Choose lizard' id="lizard">
              <div className='choice__btn--wrapper'>
                <img src="./src/assets/images/icon-lizard.svg" alt="" />
              </div>
            </button>

            {/* SPOCK */}
            <button className='choice__btn' onClick={() => choose("spock")} aria-label='Choose spock' id="spock">
              <div className='choice__btn--wrapper'>
                <img src="./src/assets/images/icon-spock.svg" alt="" />
              </div>
            </button>
          </div>

          {/* Results */}
          <div className={chosen ? 'game__results' : 'game__results hidden'} aria-hidden={!chosen} inert={!chosen}>
            <div className='results__user'>
              <h2>You Picked</h2>
              <p className='sr-only'>{userChoice}</p>
              <div className='results__display'>
                <img src={"./src/assets/images/icon-" + userChoice + ".svg"} alt={userChoice} aria-hidden="true" />
              </div>
            </div>

            <div className='results__computer'>
              <h2>The House Picked</h2>
              <p className='sr-only'>{computerChoice}</p>
              <div className='results__display results__display--house'>
                <img src={"./src/assets/images/icon-" + computerChoice + ".svg"} alt={computerChoice} aria-hidden="true" />
              </div>
            </div>

            <div className='results__result'>
              <h2>{result}</h2>
              <button className='results__reset' onClick={reset}>Play Again</button>
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
