import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ChatPage from "./pages/ChatPage";

export default function App() {
  return (
    /* Глобальный контейнер блокирует системные жесты свайпа "назад/вперед" в браузере,
      которые часто мешают работе чата на мобильных устройствах.
    */
    <div style={{ 
      width: '100%', 
      height: '100%', 
      overflow: 'hidden', 
      touchAction: 'none' 
    }}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* Добавляем ChatPage как основной интерфейс */}
        <Route path="/chat/:mode" element={<ChatPage />} />
      </Routes>
    </div>
  );
}