
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Channel from "./pages/Channel";
import WorkspacePage from "./pages/WorkspacePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
         <Route path="/" element={<Login />} />
         <Route path="/register" element={<Register />} />
        
          <Route path="/workspaces" element={<WorkspacePage />} />
      
        <Route path="/channels" element={<Channel />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;