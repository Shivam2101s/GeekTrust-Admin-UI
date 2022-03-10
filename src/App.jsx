import './App.css';
import {Navbar} from "./components/Navbar";
import {Home} from "./components/Home";
import {Route,Routes} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </div>
    
  );
}

export default App;
