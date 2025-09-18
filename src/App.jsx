import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import SamplePage from "./pages/SamplePage"
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sample-page" element={<SamplePage/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
