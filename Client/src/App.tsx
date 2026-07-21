import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Channel from "./pages/Channel";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/channels" element={<Channel />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;