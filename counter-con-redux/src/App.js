import logo from './logo.svg';
import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, incrementByAmount } from './counterSlice';

function App() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  return (
    <div className="App">
      <header className="App-header">
      <button onClick={() => dispatch(decrement())}>Decrement</button>
      {count}  
      <button onClick={() => dispatch(increment())}>Increment</button>
      <label>Amount</label><input type="number" id="amount"></input>
      <button onClick={() => dispatch(incrementByAmount(document.getElementById("amount").value))}>Increment by Amount</button>
      </header>
    </div>
  );
}

export default App;
