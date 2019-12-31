import * as React from "react";
import { IconButton } from "@material-ui/core";

const iconProps: any = {
  style: {
    height: "100%",
    width: "10vh",
    padding: "1rem",
  },
  className: "playbar-button",
};

const Pause = ({ togglePausePlay }: any) =>
  <svg
    fill="#fff"
    onClick={togglePausePlay}
    xmlns="http://www.w3.org/2000/svg"
    width="80"
    height="80"
    viewBox="0 0 24 24">
    <path
      d="M9 16h2V8H9v8zm3-14C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm1-4h2V8h-2v8z"/>
  </svg>

const PlayArrow = ({ togglePausePlay }: any) =>
  <svg
    id="play-icon"
    fill="#fff"
    onClick={togglePausePlay}
    xmlns="http://www.w3.org/2000/svg"
    width="80"
    height="80"
    viewBox="0 0 24 24">
    <path
      d="M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
  </svg>

interface IPausePlayProps {
  togglePausePlay: () => void;
  playing: boolean;
};

export const PausePlay = ({
  togglePausePlay,
  playing = false }: IPausePlayProps) => playing
    ? <Pause togglePausePlay={togglePausePlay} />
    : <PlayArrow togglePausePlay={togglePausePlay} />

export const NextIcon = (props: any) => {
  iconProps.onClick = props.onClick;
  return (
    <IconButton {...iconProps}>
      <svg
        fill={props.disabled ? "#808080" : "#fff"}
        xmlns="http://www.w3.org/2000/svg"
        width="45"
        height="45"
        viewBox="0 0 24 24"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
      </svg>
    </IconButton>
  );
};

export const PreviousIcon = (props: any) => {
  iconProps.onClick = props.onClick;
  return (
    <IconButton {...iconProps}>
      <svg
        fill={props.disabled ? "#808080" : "#fff"}
        xmlns="http://www.w3.org/2000/svg"
        width="45"
        height="45"
        viewBox="0 0 24 24"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
      </svg>
    </IconButton>
  );
};

export const ThreeDotsIcon = ({ handleClick, dark }: any) => {
  return (
    <svg
      onClick={handleClick}
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      viewBox="0 0 24 24">
        <path
          d="M0 0h24v24H0z"
          fill="none"/>
        <path
          fill={dark ? "#808080" : "#eee"}
          d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
    </svg>
  );
};