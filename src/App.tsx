import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ChatPage from "./pages/ChatPage";
import { SplashScreen } from "./components/SplashScreen"; // Подключаем твой новый файл

export default function App() {
  return (
    <div style={{ 
      width: '100%', 
      height: '100%', 
      overflow: 'hidden', 
      touchAction: 'none' 
    }}>
      {/* Заставка парит над всем приложением при загрузке */}
      <SplashScreen />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/chat/:mode" element={<ChatPage />} />
      </Routes>
    </div>
  );
}