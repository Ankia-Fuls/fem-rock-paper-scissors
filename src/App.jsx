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

  // Animate display
  const [displayUser, setDisplayUser] = useState(false);
  const [displayComputer, setDisplayComputer] = useState(false);
  const [displayResult, setDisplayResult] = useState(false);

  // Focus management
  const choiceStage = useRef(null);
  const resultStage = useRef(null);

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
      if (dialog && !dialog.open) {
        dialog.showModal();
      }
    } else {
      dialog.close();
    }

    return () => {
      dialog.close();
    };
  }, [isOpen]);


  // Close events
  useEffect(() => {
    const dialog = dialogRef.current;

    /** function that runs when we intercept a close event */
    function handleClose(event) {

      event.preventDefault();
      event.stopPropagation();

      setIsOpen(false);


    }

    /** function that runs when the user presses the Escape key when the Modal is open */
    function closeOnEscape(event) {
      if (event.code === "Escape") {
        handleClose(event);
      }
    }

    // we add a keydown event listener to intercept the Escape key press
    dialog.addEventListener("keydown", closeOnEscape);

    // our clean up function removes the event listeners to prevent memory leaks
    return () => {
      dialog.removeEventListener("keydown", closeOnEscape);
    };
  }, [setIsOpen]);


  // USER CHOOSE VALUE
  const choose = (value) => {
    setUserChoice(value);

    // get computer result
    const computerRes = computerChoose();

    // compare
    winner(value, computerRes);

    // Update state for next page
    setChosen(true);
    resultStage.current.focus();

    // Animate
    setTimeout(() => {
      setDisplayUser(true);
    }, 200);

    setTimeout(() => {
      setDisplayComputer(true);
    }, 900);

    setTimeout(() => {
      setDisplayResult(true);
    }, 1600);

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
    setDisplayUser(false);
    setDisplayComputer(false);
    setDisplayResult(false);

    choiceStage.current.focus();
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
          <div className={!chosen ? 'game__choice' : 'game__choice hidden'} aria-hidden={chosen} inert={chosen} ref={choiceStage}>
            {/* SCISSORS */}
            <button className='choice__btn' onClick={() => choose("scissors")} aria-label='Choose scissors' id="scissors">
              <div className='choice__btn--wrapper'>
                <img src="./assets/images/icon-scissors.svg" alt="" />
              </div>
            </button>

            {/* PAPER */}
            <button className='choice__btn' onClick={() => choose("paper")} aria-label='Choose paper' id="paper">
              <div className='choice__btn--wrapper'>
                <img src="./assets/images/icon-paper.svg" alt="" />
              </div>
            </button>

            {/* ROCK */}
            <button className='choice__btn' onClick={() => choose("rock")} aria-label='Choose rock' id="rock">
              <div className='choice__btn--wrapper'>
                <img src="./assets/images/icon-rock.svg" alt="" />
              </div>
            </button>

            {/* LIZARD */}
            <button className='choice__btn' onClick={() => choose("lizard")} aria-label='Choose lizard' id="lizard">
              <div className='choice__btn--wrapper'>
                <img src="./assets/images/icon-lizard.svg" alt="" />
              </div>
            </button>

            {/* SPOCK */}
            <button className='choice__btn' onClick={() => choose("spock")} aria-label='Choose spock' id="spock">
              <div className='choice__btn--wrapper'>
                <img src="./assets/images/icon-spock.svg" alt="" />
              </div>
            </button>
          </div>

          {/* Results */}
          <div className={chosen ? 'game__results' : 'game__results hidden'} aria-hidden={!chosen} inert={!chosen} ref={resultStage}>
            <div className='results__user'>
              <h2>You Picked</h2>
              <p className='sr-only'>{userChoice}</p>
              <div className={displayResult && (result === "You Win") ? 'results__display results__winner' : 'results__display'}>
                <div className={!displayUser ? 'results__display--container' : 'results__display--shown results__display--container'}>
                  <div className='results__display--wrapper'>
                    <img src={"./assets/images/icon-" + userChoice + ".svg"} alt={userChoice} aria-hidden="true" />
                  </div>
                </div>
              </div>
            </div>

            <div className='results__computer'>
              <h2>The House Picked</h2>
              <p className='sr-only'>{computerChoice}</p>
              <div className={displayResult && (result === "You Lose") ? 'results__display results__winner' : 'results__display'}>
                <div className={!displayComputer ? 'results__display--container' : 'results__display--shown results__display--container'}>
                  <div className='results__display--wrapper'>
                    <img src={"./assets/images/icon-" + computerChoice + ".svg"} alt={computerChoice} aria-hidden="true" />
                  </div>
                </div>
              </div>
            </div>

            <div className={!displayResult ? 'results__result' : 'results__result--shown results__result'}>
              <h2>{result}</h2>
              <button className='results__reset' onClick={reset}>Play Again</button>
            </div>
          </div>

          <button onClick={() => setIsOpen(true)} className='game__rule-btn'>Rules</button>
        </section>


        <dialog className={isOpen ? 'rules dismiss' : "hidden"} ref={dialogRef} aria-hidden={!isOpen} inert={!isOpen}
          onClick={(event) => {
            if (event.target.classList.contains("dismiss")) {
              setIsOpen(false);
            }
          }
          }>
          <div className='rules__container'>
            <h2 className='rules__heading'>Rules</h2>
            <img src="./assets/images/image-rules-bonus.svg" alt="Scissors beats paper and lizard. Paper beats rock and spock. Rock beats scissors and lizard. Lizard beats paper and spock. Spock beats scissors and rock." className='rules__img' />
            <button onClick={() => setIsOpen(false)} className='rules__close-btn dismiss'>
              <p className='sr-only'>Close</p>
              <img src="./assets/images/icon-close.svg" alt="" />
            </button>
          </div>
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
