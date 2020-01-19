import * as React from "react";
import PlayerScreen from "../shell/PlayerScreen";
import { MuiThemeProvider } from "@material-ui/core/styles";
import Theme from "../../utils/Theme";
import ReactPlayer from "react-player";

import AlbumCollage from "./AlbumCollage";
import PlayerControls from "./PlayerControls";

import * as qs from "query-string"
import { combineActions } from "redux-zero/utils";
import { connect } from "redux-zero/react";
import playerActions from "../player/actions";
import { IMusicPlayerSettings } from "../../store";
import placeholderRecord from "./images/record-placeholder.png";
import { withRouter } from "react-router";
import { curatedList } from "src/constants/curatedList";
import { getYoutubeAudio } from "src/services/storage";
import { getAudioDetails } from "src/services/audio";
import styled from "styled-components";

const mapToProps = ({
  musicPlayerSettings,
}: any) => ({
  musicPlayerSettings,
});

interface IProps {
  history: any;
  match: any;
  musicPlayerSettings: IMusicPlayerSettings;
}

const curatedListMapped = {};
curatedList.forEach((elem: any) => {
  curatedListMapped[elem.id] = elem;
});

interface IState {
  videoId: string;
  currentSongMeta: any;
  currentURL: null | string;
  trackIsPlaying: boolean;
  duration: number;
  loop: boolean;
  played: number;
  loaded: number;
  playedSeconds: number;
  loadedSeconds: number;
  title: string;
  artist: string;
  hostedAudioURL: null | string;
  streamError: boolean;
  videoMode: boolean;
}

class MusicPlayer extends React.Component<IProps, IState> {
  public state = {
    videoId: "",
    currentSongMeta: {
      cover: placeholderRecord
    },
    currentURL: null,
    trackIsPlaying: false,
    duration: 0,
    played: 0,
    loaded: 0,
    loop: true,
    isReady: false,
    playedSeconds: 0,
    loadedSeconds: 0,
    title: "-",
    artist: "-",
    hostedAudioURL: null,
    streamError: false,
    videoMode: false,
  };

  constructor(props: IProps) {
    super(props);
  }

  public componentDidMount() {
    this.queryAudioMappings();
  }

  public async queryAudioMappings() {
    const videoId = this.props.match.params.vidId;
    const results = await getAudioDetails(videoId);
    if (results && results.storageRef) {
      this.searchAudioStorage(results.storageRef, videoId);
      return;
    }
    this.streamFromProxy(videoId);
  }

  public async searchAudioStorage(ref: string, videoId: string) {
    this.setState({
      videoId,
      hostedAudioURL: await getYoutubeAudio(ref),
      trackIsPlaying: true,
    });
  }

  public async streamFromProxy(vidId: string) {
    console.log('Stream from proxy server with ', vidId);
    let streamUrl = '/stream/'
    if (location.hostname === 'localhost') {
      streamUrl = 'https://jus-audio.herokuapp.com/stream/';
    }
    this.setState({
      videoId: vidId,
      currentURL: streamUrl + vidId,
      trackIsPlaying: true,
    });
  }

  public getYoutubeUrl = (youtubeId: string) =>
    // ?start=1 insures that music stream always starts at the beginning and not affected by youtube
    // cookies or other state issues
    `https://www.youtube.com/watch?v=${youtubeId}?start=1`;

  public handleStreamError = (error: any) => {
    console.log('There was an error.. ', error);
    this.setState({
      streamError: true,
    });
  }

  public loadVideoMode = () => {
    this.setState({
      streamError: false,
      videoMode: true,
    });
  }

  public render() {
    const {
      played,
      trackIsPlaying,
      currentURL,
      hostedAudioURL,
      loop,
      loadedSeconds,
      videoId,
      duration,
      streamError,
      videoMode
    } = this.state;
    console.log('videoId >> ', videoId);

    return (
      <MuiThemeProvider theme={Theme}>
        <PlayerScreen>
          {!streamError ? <AlbumCollage
            togglePausePlay={this.togglePausePlay}
            emotionesRating={null}
            title={curatedListMapped[videoId] ? curatedListMapped[videoId].title : "Unknown Title"}
            artist={curatedListMapped[videoId] ? curatedListMapped[videoId].secondary : "Unknown Artist"}
            albumSrc={curatedListMapped[videoId] ? curatedListMapped[videoId].cover : "https://img.icons8.com/cotton/2x/record.png"}
            preloading={loadedSeconds < 10}
          />: <StreamErrorOptions loadVideoMode={this.loadVideoMode} videoId={videoId} />}
          {!streamError ? <PlayerControls
            duration={duration}
            played={played}
            togglePausePlay={this.togglePausePlay}
            trackIsPlaying={trackIsPlaying}
            metrics={null}
          /> : null}
          {!streamError ? <YoutubeStreamPlayer
            loop={loop}
            videoId={videoId}
            videoMode={videoMode}
            current={hostedAudioURL ? hostedAudioURL : currentURL}
            played={played}
            trackIsPlaying={trackIsPlaying}
            onDuration={this.onDuration}
            onProgress={this.onProgress}
            handleStreamError={this.handleStreamError}
          /> : null}
        </PlayerScreen>
      </MuiThemeProvider>
    );
  }

  protected togglePausePlay = () =>
    this.setState({ trackIsPlaying: !this.state.trackIsPlaying });

  protected stopPlaying = () => {
    this.setState({
      currentURL: null,
      trackIsPlaying: false
    });
  };

  protected onDuration = (duration: any) => this.setState({ duration });

  protected onProgress = (progress: {
    playedSeconds: number;
    played: number;
    loaded: number;
    loadedSeconds: number;
  }) => {
    this.setState({
      ...progress
    });
  };
}

const YoutubeStreamPlayer = withRouter(({
  videoId,
  videoMode,
  handleStreamError,
  onDuration,
  onProgress,
  trackIsPlaying,
  current,
  restart,
  loop,
  location
}: any) => {
  const params = qs.parse(location.search);
  const streamUrl = videoMode ? `https://www.youtube.com/watch?v=${videoId}` : current;
  return (
    <React.Fragment>
      <ReactPlayer
        onError={handleStreamError}
        loop={loop}
        style={{
          // @note: this is so hacky to do, but just use for now
          visibility: params.dev ? "visible" : "hidden",
          pointerEvents: params.dev ? "auto" : "none",
          position: "absolute"
        }}
        width="90vw"
        height="50vh"
        playing={trackIsPlaying}
        volume={1}
        muted={false}
        controls={false}
        playsinline={false}
        url={streamUrl}
        onEnded={restart}
        onDuration={onDuration}
        onProgress={onProgress}
        onReady={() => null}
      />
    </React.Fragment>
  );
});

const StreamErrorOptions = ({videoId, loadVideoMode}: any) => {
  return (
    <StreamErrorBox>
      <a href={`https://youtube.com/watch?v=${videoId}`} target='_blank'>
        <ErrorOptionButton>Open video in Youtube</ErrorOptionButton>
      </a>
      <ErrorOptionButton onClick={() => loadVideoMode(videoId)}>Try another version</ErrorOptionButton>
    </StreamErrorBox>
  )
}

export default withRouter(
  connect(
    mapToProps,
    combineActions(playerActions)
  )(MusicPlayer)
);

const StreamErrorBox = styled.div`
  padding-top: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const ErrorOptionButton = styled.button`
  padding: .8rem;
  border-radius: 4px;
  background: transparent;
  color: #f1f2f3;
  font-family: Roboto, sans-serif;
  font-size: 1rem;
  margin-bottom: 1rem;
  width: 220px;
`;