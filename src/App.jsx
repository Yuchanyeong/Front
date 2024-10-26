import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Main from './page/Main/Main';
import Chat from './page/Chat/Chat';

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/chat" element={<Chat/>}/>
      <Route path="/" element={<Main />} />
    </Routes>
    </Router>
  );
}

export default App;
