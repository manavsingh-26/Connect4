import './App.css';
import Appbar from './components/Appbar/Appbar';
import Board from './components/Board/Board';
import Start from './components/Start/Start';


function App() {
  return (
    <div className="App">
      <Start />
      <Appbar />
      <Board />


    </div>
  );
}

export default App;
