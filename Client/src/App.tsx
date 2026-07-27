
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Channel from "./pages/Channel";
import Profile from "./pages/Profile";
import Chat from "./pages/Chat";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
         <Route path="/" element={<Login />} />
         <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/chat/:id" element={<Chat />} />
        
         

        <Route path="/channels" element={<Channel />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;