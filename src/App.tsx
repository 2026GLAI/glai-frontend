import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ChatPage from "./pages/ChatPage";
import { SplashScreen } from "./components/SplashScreen";

export default function App() {
  return (
    <div style={{ 
      width: '100%', 
      height: '100vh', // Используем vh для гарантии высоты
      overflow: 'hidden',
      position: 'relative' // Обеспечивает корректное наложение SplashScreen
    }}>
      {/* Заставка управляет своим жизненным циклом самостоятельно */}
      <SplashScreen />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/chat/:mode" element={<ChatPage />} />
      </Routes>
    </div>
  );
}