import * as React from "react";
import styled from "styled-components";

import Slider from '@material-ui/lab/Slider';
import { withStyles } from "@material-ui/core";
import {
  flagSong
} from "src/services/metrics";

import {
  // NextIcon,
  // PreviousIcon,
  PausePlay,
} from './assets';

interface IProps {
  classes: any;
  trackIsPlaying: boolean;
  next: () => void;
  prev: () => void;
  played: number;
  duration: number;
  onSeekPlay?: (e: any) => void;
  togglePausePlay: () => void;
  currentTrackIndex: number;
  discogsMetaDataLength: number;
  metrics: any;
}

class PlayerControls extends React.Component<IProps> {

  public state = {
    flagSaving: false,
  };

  public handleFlagSong = async () => {
    const confirmed = confirm("Flag this song as not relevant? You will not see this song again in your list.");
    if (!confirmed) {
      return;
    }

    const { residentId, songTrackId } = this.props.metrics;
    this.setState({
      flagSaving: true,
    });

    await flagSong(residentId, songTrackId);
    this.setState({
      flagSaving: false,
    }, () => {
      this.props.next();
    });
  }

  public render() {
    const {
      classes,
      trackIsPlaying,
      played,
      duration,
      togglePausePlay,
      currentTrackIndex,
      discogsMetaDataLength,
    } = this.props;

    return(
      <section>
        <ProgressBar>
          <TrackTimes>
            <span>{this.getTimeFromSeconds(Math.round(duration * played))}</span>
            <span>-{this.getTimeFromSeconds(Math.round(duration - (duration * played)))}</span>
          </TrackTimes>
          <div>
            <Slider
              style={{ cursor: "default" }}
              disabled={true}
              classes={{
                track: classes.track,
                thumb: classes.thumb,
              }}
              min={0}
              max={1}
              value={played}
              aria-labelledby="label"
            />
          </div>
        </ProgressBar>
        <PlayerBar>
          {/* <PreviousIcon
            disabled={currentTrackIndex === 0}
            className="play-controls"
            onClick={this.props.prev} /> */}
          <PausePlay
            togglePausePlay={togglePausePlay}
            playing={trackIsPlaying} />
          {/* <NextIcon
            disabled={currentTrackIndex === discogsMetaDataLength}
            className="play-controls"
            onClick={this.props.next} /> */}
        </PlayerBar>
      </section>
    )
  }

  protected getTimeFromSeconds = (seconds: number) => {
    let minutes;
    let secs;
    if (seconds < 60) {
      minutes = 0;
      secs = seconds;
    } else {
      minutes = Math.round(seconds/60);
      secs = (seconds % 60);
    }

    return `${minutes > 9 ? minutes : "0" + minutes}:${secs > 9 ? secs : "0" + secs}`;
  }
}

const PlayerBar = styled.section`
  display: flex;
  flex-direction: row no-wrap;
  justify-content: center;
  margin-bottom: 1rem;
`;

const TrackTimes = styled.div`
  width: 95%;
  margin: 0 auto;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  color: #ddd;
  font-size: .9rem;
  font-family: 'Roboto';
`;

const ProgressBar = styled.section`
  width: 100%;
`

const styles = {
  thumb: {
    backgroundColor: "white",
    width: "10px",
    height: "10px",
  },
  track: {
    background: "white",
  },
};

export default withStyles(styles)(PlayerControls);