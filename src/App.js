import { useEffect, useState } from 'react'
import './App.css'
import SingleCard from './components/SingleCard'

const cardImages = [
  {"src": "/img/helmet-1.png",matched: false},
  {"src": "/img/potion-1.png",matched: false},
  {"src": "/img/ring-1.png",matched: false},
  {"src": "/img/scroll-1.png",matched: false},
  {"src": "/img/shield-1.png",matched: false},
  {"src": "/img/sword-1.png",matched: false},
]


 // create state to store cards for game
function App() {
  const [cards, setCards] =useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled ] = useState(false)

  // shuffle cards : creat a fucntion inside the component to do 3 things. Duplicate cards array of
  // 12 instead of 6 use spread syntax ...in array six ...in array
  // random card using sort method .sort fires a function for each item in the array.inside function if return # <0 the order will be same if return #>0 its mixed up
  // somtimes math.random -# the items are same order when + switch order to create shuffled array 
  //random id to each 12 card to use as key to output later in list or grid
  //.map method to fire function for each item in sorted array and ad on id property
 

  const shuffledCards = () => {
    const shuffledCards =[...cardImages, ...cardImages]
    .sort(() => Math.random() -0.5)
    .map((card) => ({...card, id: Math.random()}))

    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards)
    setTurns(0)
  }
// need on click to call shufflecards function
// create div( with key) with class to style and map card state  {}


//handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)

  }
//compare 2 selected cards

useEffect(() => {
  if (choiceOne && choiceTwo){
    setDisabled(true)

   if (choiceOne.src === choiceTwo.src){
     setCards(prevCards => {
       return prevCards.map (card => {
         if (card.src === choiceOne.src){
           return{...card, matched: true}
         } else {
           return card
         }
       })
     })
      resetTurn()
    } else {
     setTimeout(() => resetTurn(), 1000)
    }
  }
}, [choiceTwo, choiceTwo])
  console.log(cards)



// reset choices & increase turns
 const resetTurn = () =>{
  setChoiceOne(null)
  setChoiceTwo(null)
  setTurns(prevTurns => prevTurns +1 )
  setDisabled(false)
}

//start a new game automatically
useEffect(() => {
  shuffledCards()
}, [])

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffledCards}>New Game</button>
      <div className="card-grid">
        {cards.map(card => (
         <SingleCard
          key={card.id} 
          card={card}
          handleChoice={handleChoice}
          flipped = {card === choiceOne || card === choiceTwo || card.matched}
          disabled={disabled}
          />
        ))}


      </div>
      <p>Turns: {turns} </p>
    </div>
  );
}

export default App
