import * as React from "react";
import PlayerScreen from "../shell/PlayerScreen";
import { MuiThemeProvider } from "@material-ui/core/styles";
import Theme from "../../utils/Theme";
import ReactPlayer from "react-player";

import AlbumCollage from "./AlbumCollage";
import PlayerControls from "./PlayerControls";

import { combineActions } from "redux-zero/utils";
import { connect } from "redux-zero/react";
import playerActions from "../player/actions";
import { IMusicPlayerSettings } from "../../store";
import placeholderRecord from "./images/record-placeholder.png";
import { withRouter } from "react-router";
import { curatedList } from "src/constants/curatedList";

const mapToProps = ({
  musicPlayerSettings,
}: any) => ({
  musicPlayerSettings,
});

interface IProps {
  history: any;
  match: any;
  musicPlayerSettings: IMusicPlayerSettings;
  prevTrackInList: () => void;
  nextTrackInList: () => void;
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
  };

  constructor(props: IProps) {
    super(props);    
  }

  public componentDidMount() {
    const videoId = this.props.match.params.vidId;
    this.setDirectYoutube(videoId);
  }

  public handleNextPress = () => {
    this.setState({
      playedSeconds: 1,
      loadedSeconds: 1
    });
    this.props.nextTrackInList();
  };

  public returnMusicList() {
    this.props.history.push(`/users/${this.props.match.params.userId}/music`);
  }

  public setDirectYoutube(youtubeId: string): void {
    if (youtubeId) {
      return this.setState({
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
      loop,
      loadedSeconds,
      videoId,
      duration
    } = this.state;

    return (
      <MuiThemeProvider theme={Theme}>
        <PlayerScreen>
          <AlbumCollage
            emotionesRating={null}
            title={curatedListMapped[videoId] ? curatedListMapped[videoId].title : "Unknown Title"}
            artist={curatedListMapped[videoId] ? curatedListMapped[videoId].secondary : "Unknown Artist"}
            albumSrc={curatedListMapped[videoId] ? curatedListMapped[videoId].cover : "https://img.icons8.com/cotton/2x/record.png"}
            preloading={loadedSeconds < 10}
          />
          <PlayerControls
            currentTrackIndex={0}
            discogsMetaDataLength={0}
            prev={() => console.log("PREV")}
            next={() => console.log("NEXT")}
            duration={duration}
            played={played}
            togglePausePlay={this.togglePausePlay}
            trackIsPlaying={trackIsPlaying}
            metrics={null}
          />
          <YoutubeStreamPlayer
            loop={loop}
            current={currentURL}
            played={played}
            next={this.handleNextPress}
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

  protected onPlay = () => this.setState({ trackIsPlaying: true });

  protected onPause = () => this.setState({ trackIsPlaying: false });

  protected onDuration = (duration: any) => this.setState({ duration });

  protected toggleLoop = () => this.setState({ loop: !this.state.loop });

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

const YoutubeStreamPlayer = ({
  onDuration,
  onProgress,
  trackIsPlaying,
  current,
  next,
  restart,
  loop
}: any) => {

  return (
    <React.Fragment>
      <ReactPlayer
        // TODO: this is so hacky to do, but just use for now
        loop={loop}
        style={{ height: "0px" }}
        width="90vw"
        height="50vh"
        playing={trackIsPlaying}
        volume={1}
        muted={false}
        controls={true}
        playsinline={true}
        config={{ youtube: { playerVars: { autoplay: true } } }}
        url={current}
        onEnded={restart}
        onDuration={onDuration}
        onProgress={onProgress}
        onReady={() => null}
      />
    </React.Fragment>
  );
};

export default withRouter(
  connect(
    mapToProps,
    combineActions(playerActions)
  )(MusicPlayer)
);
