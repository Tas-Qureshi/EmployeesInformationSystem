import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Departments from "./Components/Departments";
import Employees from "./Components/Employees";
import Navbar from "./Components/Navbar";

function App() {

  return (

    <article className="App">
      
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Employees />}></Route>
          <Route path="/departsments" element={<Departments />}></Route>
          <Route path="*" element={<h1>Page NotFound!</h1>}></Route>
        </Routes>

      </Router>

    </article>);
   
}

export default App;
