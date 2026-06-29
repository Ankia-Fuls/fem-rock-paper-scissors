# Frontend Mentor - Rock, Paper, Scissors solution

This is a solution to the [Rock, Paper, Scissors challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/rock-paper-scissors-game-pTgwgvgH). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the game depending on their device's screen size
- Play Rock, Paper, Scissors against the computer
- Maintain the state of the score after refreshing the browser _(optional)_
- **Bonus**: Play Rock, Paper, Scissors, Lizard, Spock against the computer _(optional)_

### Screenshot

![Completed Screenshot](./design/Completed%20Frontend%20Mentor%20Rock%20Paper%20Scissors.png)

### Links

- Solution URL: [GitHub Repo](https://github.com/Ankia-Fuls/fem-rock-paper-scissors)
- Live Site URL: [GitHub Pages](https://ankia-fuls.github.io/fem-rock-paper-scissors/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- [React](https://reactjs.org/) - JS library
- SASS Styling


### What I learned

I learned how to create the button styling using box shadows instead of borders. The code below shows how I did that.

```css
&__btn {
        --color: var(--gold-500);
        --accent: var(--gold-600);

        width: 6.0625rem;
        height: 6.0625rem;
        border-radius: 50%;
        border: none;
        box-shadow: inset 0 -0.25rem var(--accent), inset 0 0 0 0.75rem var(--color);

        display: flex;
        justify-content: center;
        align-items: center;

        &--wrapper {
            width: calc(100% - 1.5rem);
            height: calc(100% - 1.5rem);
            border-radius: 50%;
            border: none;
            display: flex;
            justify-content: center;
            align-items: center;

            box-shadow: inset 0 0.25rem var(--gray-shadow); //inner shadow

            img {
                width: 45%;
            }
        }
    }
```

I also learned more on how to create accessible modals and screen changes. The main sources I used are listed in the useful resources section.

### Continued development

I want to learn more on aria-live regions and how to make changing website pages more accessible. 
I also want to learn more about animating with css to create more visually interesting reactions.

### Useful resources

- [Dialog tag](https://medium.com/@mevbg/modals-in-html-from-div-overlays-to-the-dialog-element-142715c0799f) - This showed me how to use a dialog tag for the rule pop-up;
- [Dialog in React](https://clhenrick.io/blog/react-a11y-modal-dialog/) - This helped me understand how to use the useRef hook to target the dialog to open and close it properly.
- [Overwrite Dialog width and height](https://til.simonwillison.net/css/dialog-full-height) - This helped me understand why my dialog element wasn't taking up the full page.
- [React Modal Accessibility](https://clhenrick.io/blog/react-a11y-modal-dialog/) - This helped me understand how to use the dialog functions with React.
- [Dialog Accessibility](https://jaredcunha.com/blog/html-dialog-getting-accessibility-and-ux-right) - More information on tweaking dialog tags for accessibility

## Author

- Frontend Mentor - [@Ankia-Fuls](https://www.frontendmentor.io/profile/Ankia-Fuls)
- GitHub - [@Ankia-Fuls](https://github.com/Ankia-Fuls)