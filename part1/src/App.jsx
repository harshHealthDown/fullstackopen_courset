import {useState} from 'react'

const Hello = ({name,age}) => {
  const bornYear = () => new Date().getFullYear() - age
  return (
    <div>
      <p>
        Hello {name}, you are {age} years old
      </p>
      <p>So you were probably born in {bornYear()}</p>
    </div>
  )
}

const History = (props) => {
  if (props.allClicks.length == 0) {
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  }
  return (
    <div>
      button press history: {props.allClicks.join(' ')}
    </div>
  )
}

const Display = ({counter}) => <div>{counter}</div>

const Button = ({onClick,text}) => <button onClick={onClick}>{text}</button>

const App = () => {
  const [counter, setCounter] = useState({left:0,right:0})
  // setTimeout(()=>setCounter(counter+1),1000)
  // const handleClick = () => {//event handler function
  //   setCounter(counter+1)
  // }
  const [allClicks,setAll] = useState([])
  const [total,setTotal] = useState(0)

  const increasedLeftByOne = () => {
    setAll(allClicks.concat('L'))//concat : create a copy
    setCounter({...counter,left:counter.left+1})
    setTotal(counter.left+counter.right+1)
  }
  const increasedRightByOne = () => {
    setAll(allClicks.concat('R'))//create a copy
    setCounter({...counter,right:counter.right+1})//...counter creates a new object
    setTotal(counter.left+counter.right+1)
  }
  const setToZero = () => {
    setAll([])
    setCounter({left:0,right:0})
    setTotal(0)
  }
  //or you can use two or more state hook's or state function
  //storing all the state in a single state object is a bad choice for this particular application; there's no apparent benefit and the resulting application is a lot more complex. there are benefit to storing in single object but it varies to different situation but not here.
  //there are many others way of conditional rendering you need to see and learn
  //another way to define event handler is by creating a function that returns a function.
  const name = 'Peter'
  const age = 10
  console.log('bara bara bere bara bara bere bara bere bara bere')
  /* debugger-very useful | you can also control execution in source tab with right-hand side options.
  adding breakpoints with debugger by clicking on number on right hand side of source code in source tab.
  inspect the values of the component's variable can be done in the scope section*/
  return (
    <div>
      <h1>Greetings</h1>
      <Hello name="Maya" age={26 + 10} />
      <Hello name={name} age={age} />
      <h2>Counter</h2>
      <Display counter={counter.left}/>
      <Button onClick={increasedLeftByOne} text="left"/>
      <Button onClick={increasedRightByOne} text="right"/>
      <Display counter={counter.right}/>
      <Button onClick={setToZero} text="reset"/>
      <History allClicks={allClicks}/>
      <p>Total {total}</p>
    </div>
  )
}

export default App
//state update happen asynchronously, i.e. not immediately but "at some point" after the current component function is finished.
//The useState function (as well as the useEffect function introduced later on in the course) must not be called from inside of a loop, a conditional expression, or any place that is not a function defining a component.
//defining event handler attribute can be done with using a function that returns a function.

/*
const hello = (who) {
  const handler = () => {
    console.log('hello', who)
  }
}
return (
  <div>
    <button onClick={hello('world')}>button</button>
    <button onClick={hello('shivendra')}>button</button>
  </div>
)

more efficient
const hello = (who) => {
  return () => {
    console.log('hello',who)
  }
}
more efficient
const hello = (who) => () => console.log('hello',who)

const setToValue = () => () => {
  console.log('value now',newValue)
  setValue(newValue)
}
<button onClick={setToValue(value+1)}>increment</button>
if value is 10 then the function assigned to event handler attribute will be this
() => {
  console.log("value now",11)
  setValue(11)
}

or we can simply do this
<button onClick={()=>setToValue(value+1)}>increment</button>
*/

//do not define a new component inside of the App component.
//that because react will treat a component defined inside of another component as a "new component" in every render. This makes it impossible for React to optimize the component.
