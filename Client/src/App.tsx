
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Channel from "./pages/Channel";
import WorkspacePage from "./pages/WorkspacePage";
import WorkspaceDetails from "./pages/WorkspaceDetails";
import Chat from "./pages/Chat";
import DocumentEditor from "./pages/DocumentEditor";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/workspaces" element={<WorkspacePage />} />
        <Route path="/channels" element={<Channel />} />
        <Route path="/workspaces/:workspaceId" element={<WorkspaceDetails />}/>
        <Route path="/chat/:channelId" element={<Chat />}/>
        <Route path="/documents/:documentId" element={<DocumentEditor />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;