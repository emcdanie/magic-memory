import { useState } from 'react'
import './App.css'
import SingleCard from './components/SingleCard'

const cardImages = [
  {"src": "/img/helmet-1.png"},
  {"src": "/img/potion-1.png"},
  {"src": "/img/ring-1.png"},
  {"src": "/img/scroll-1.png"},
  {"src": "/img/shield-1.png"},
  {"src": "/img/sword-1.png"},
]


 // create state to store cards for game
function App() {
  const [cards, setCards] =useState([])
  const [turns, setTurns] = useState(0)

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

    setCards(shuffledCards)
  }
// need on click to call shufflecards function
// create div( with key) with class to style and map card state  {}
console.log(cards, turns)
  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffledCards}>New Game</button>
      <div className="card-grid">
        {cards.map(card => (
         <SingleCard key={card.id} card={card}/>
        ))}


      </div>
    </div>
  );
}

export default App