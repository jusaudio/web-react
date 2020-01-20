/**
 * -- UniversalAudioPlayer --
 * Component that plays audio and meant to be mounted on any screen
 * Should get passed the videoId to play sound
 * videoId: String ID
 * expanded: Boolean
 */

import * as React from "react";
import ReactPlayer from "react-player";
import styled from "styled-components";

interface IProps {
  videoId: string;
  expanded: boolean;
}

interface IMinifiedHeadProps {}
interface IExpandedContainerProps {}

export default function UniversalAudioPlayer(props: IProps): any {
  // State and logic should exist at this level, and pasted to MinifiedHead, ExpandedContainer, and AudioPlayer
  const [playing, setPlaying] = React.useState(null);

  return <section>
    <MinifiedHead
      title="Chrono Cross relaxing music: song title that scrolls across or static"
      albumSrc="https://i.ytimg.com/vi/WUDsKai0Yac/hqdefault.jpg?sqp=-oaymwEZCNACELwBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLDMAhgcyJLv9-I0c-RwzC6QPY-QqA"
    />
    <ExpandedContainer
      albumSrc="https://i.ytimg.com/vi/WUDsKai0Yac/hqdefault.jpg?sqp=-oaymwEZCNACELwBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLDMAhgcyJLv9-I0c-RwzC6QPY-QqA"
    />
    <Player />
  </section>
}

function MinifiedHead(props: IMinifiedHeadProps | any): any {
  return <div>
    Minified header...
  </div>
}

function ExpandedContainer(props: IExpandedContainerProps | any): any {
  return <div>
    Expanded contents...
  </div>
}

function Player(props: IPlayerProps | any): any {
  // use ReactPlayer for now
  return <>
    Actual Hidden Audio Player...
  </>
}
