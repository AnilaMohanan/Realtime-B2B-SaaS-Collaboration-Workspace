import { useEffect, useState } from "react";
import "./Channel.css";
import ChannelCard from "../components/ChannelCard";

function Channel() {
const Channel = () => {
  return <h1>Channel Page</h1>;
};
const [channels,setChannels]=useState([]);

return(

<div className="channel-page">

<div className="channel-header">

<h1>Channels</h1>

<button>

+ Create Channel

</button>

</div>

<div className="search-bar">

<input

type="text"

placeholder="Search Channel"

/>

</div>

<div className="channel-list">

<ChannelCard/>

<ChannelCard/>

<ChannelCard/>

</div>

</div>

)

}

export default Channel;