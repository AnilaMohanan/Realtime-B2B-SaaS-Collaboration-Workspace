import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import ChannelCard from "../components/ChannelCard";
import "../styles/Channel.css";

function Channel() {
  const [search, setSearch] = useState("");

  return (
    <div className="dashboard-container">
      <Sidebar />

      <div className="main-content">
        <Navbar  title="Channels"
          search={search}
          setSearch={setSearch}
          placeholder="Search channels..."/>

        <div className="channel-page">
          <div className="channel-header">
            <h2>Channels</h2>

            <button className="create-btn">
              + Create Channel
            </button>
          </div>

          <div className="search-bar">
            <input
              type="text"
              placeholder="Search channels..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="channel-list">
            <ChannelCard />
            <ChannelCard />
            <ChannelCard />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Channel;