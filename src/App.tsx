import { Routes, Route } from "react-router-dom";
// Используем default import для страниц
import HomePage from "./pages/HomePage"; 
import ChatPage from "./pages/ChatPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/chat/:mode" element={<ChatPage />} /> 
    </Routes>
  );
}

export default App;