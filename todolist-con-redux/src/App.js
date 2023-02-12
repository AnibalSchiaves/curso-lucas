import logo from './logo.svg';
import './App.css';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <TodoList></TodoList>
        <AddTodo></AddTodo>
      </header>
    </div>
  );
}

export default App;
