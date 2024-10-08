import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Banner from "./components/banner"
import Home from "./components/home"
import Predict from "./components/predict"
import Retrain from "./components/retrain"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Banner/>
        <div>
          <Routes>
            <Route path="/" element={<Navigate to="/home"/>}/>

            <Route path="/home" element={<Home />}/>
            <Route path="/predict" element={<Predict />}/>
            <Route path="/retrain" element={<Retrain />}/>
          </Routes>
        </div>
      </BrowserRouter>

    </div>
  );
}

export default App;
