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
  };

  constructor(props: IProps) {
    super(props);
  }

  public componentDidMount() {
    // window.setTimeout(() => this.setDirectYoutube(videoId), 100);
    this.queryAudioMappings();
  }

  public async queryAudioMappings() {
    const videoId = this.props.match.params.vidId;
    const results = await getAudioDetails(videoId);
    if (results && results.storageRef) {
      this.searchAudioStorage(results.storageRef);
      return;
    }
    this.streamFromProxy(videoId);
  }

  public async searchAudioStorage(ref: string) {
    this.setState({
      hostedAudioURL: await getYoutubeAudio(ref),
      trackIsPlaying: true,
    });
  }

  public async streamFromProxy(vidId: string) {
    console.log('Stream from proxy server with ', vidId);
    this.setState({
      currentURL: '/stream/' + vidId,
      trackIsPlaying: true,
    });
  }

  public setDirectYoutube(youtubeId: string): void {
    console.log('here youtubeUd >> ', youtubeId);
    if (youtubeId) {
      this.setState({
        videoId: youtubeId,
        currentURL: this.getYoutubeUrl(youtubeId),
        trackIsPlaying: true,
        title: "Generic Title",
        artist: "Generic Artist",
      });
    }
  }

  public getYoutubeUrl = (youtubeId: string) =>
    // ?start=1 insures that music stream always starts at the beginning and not affected by youtube
    // cookies or other state issues
    `https://www.youtube.com/watch?v=${youtubeId}?start=1`;

  public render() {
    const {
      played,
      trackIsPlaying,
      currentURL,
      hostedAudioURL,
      loop,
      loadedSeconds,
      videoId,
      duration
    } = this.state;
    // console.log('this state >> ', this.state);

    return (
      <MuiThemeProvider theme={Theme}>
        <PlayerScreen>
          <AlbumCollage
            togglePausePlay={this.togglePausePlay}
            emotionesRating={null}
            title={curatedListMapped[videoId] ? curatedListMapped[videoId].title : "Unknown Title"}
            artist={curatedListMapped[videoId] ? curatedListMapped[videoId].secondary : "Unknown Artist"}
            albumSrc={curatedListMapped[videoId] ? curatedListMapped[videoId].cover : "https://img.icons8.com/cotton/2x/record.png"}
            preloading={loadedSeconds < 10}
          />
          <PlayerControls
            duration={duration}
            played={played}
            togglePausePlay={this.togglePausePlay}
            trackIsPlaying={trackIsPlaying}
            metrics={null}
          />
          <YoutubeStreamPlayer
            loop={loop}
            current={hostedAudioURL ? hostedAudioURL : currentURL}
            played={played}
            trackIsPlaying={trackIsPlaying}
            onDuration={this.onDuration}
            onProgress={this.onProgress}
          />
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
  onDuration,
  onProgress,
  trackIsPlaying,
  current,
  restart,
  loop,
  location
}: any) => {
  const params = qs.parse(location.search);
  return (
    <React.Fragment>
      <ReactPlayer
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
        url={current}
        onEnded={restart}
        onDuration={onDuration}
        onProgress={onProgress}
        onReady={() => null}
      />
    </React.Fragment>
  );
});

export default withRouter(
  connect(
    mapToProps,
    combineActions(playerActions)
  )(MusicPlayer)
);
