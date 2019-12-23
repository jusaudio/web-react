import * as React from "react";
import MobileScreen from "../shell/MobileScreen";
import { TextMain } from "../../components/Typography";

import { connect } from "redux-zero/react";
import playerActions from "../player/actions";
import { combineActions } from "redux-zero/utils";
import { IMusicPlayerSettings } from "../../store";
import GeneratedMusicList from "./GeneratedMusicList";
import styled from "styled-components";
import { curatedList } from "src/constants/curatedList";
import MusicSearchBox from "./MusicSearchBox";

const mapToProps = ({
  musicPlayerSettings,
}: any) => ({ musicPlayerSettings });

interface IProps {
  history: any;
  location: any;
  selectTrack: any;
  match: any;
  musicPlayerSettings: IMusicPlayerSettings;
  fetchEmotionsByResident: () => void;
  clearGenericSearch: () => void;
  searchPersonalDiscogs: (residentId: string) => void;
}

interface IState {
  open: boolean;
  showHint: boolean;
  vidId: string | null;
  platformSearchResults: any;
}

class MusicList extends React.Component<IProps, IState> {
  public state = {
    open: false,
    vidId: null,
    showHint: false,
    platformSearchResults: null,
  }

  public componentDidMount() {
    console.log("this props >> ", this.props);
    let vidId;

    if (this.props.location.pathname === "/watch") {
      vidId = this.props.location.search.split("=")[1];
      this.props.history.push(`/player/${vidId}`);
    }

    // console.log("vid id >> ", vidId);
  }

  public updatePlatformSearchResults = async (newResults: any) =>  {
    console.log("new results... ", newResults);
    this.setState({
      platformSearchResults: newResults,
    });
  }

  public toggleHint = () => {
    this.setState({
      showHint: !this.state.showHint
    });
  }

  public render() {
    return <MobileScreen>
      <LogoText>JusAudio</LogoText>
      <MainCopy>Turn Youtube into an portable audio stream. Search streams from Youtube, and play them on an endless Loop with only the sound.</MainCopy>
      <SeeHowItWorks showHint={this.state.showHint} toggleHint={this.toggleHint} />
      <MusicSearchBox update={this.updatePlatformSearchResults} />
      <br />
      <div>
        <TextMain>Some tracks to get started</TextMain>
        <GeneratedMusicList
          loading={false}
          selectTrack={this.selectTrack}
          platformSearchResults={this.state.platformSearchResults}
          curatedTracks={curatedList}
        />
      </div>
    </MobileScreen>
  }

  protected toggleDialog = () =>
    this.setState({ open: !this.state.open });

  protected selectTrack = (vidId: string) => {
    // console.log(vidId);
    this.props.history.push(`/player/${vidId}`);
  }
}

function SeeHowItWorks({ toggleHint, showHint }: any) {
  return <>
    <InteractiveSpan onClick={toggleHint}>See how to use in 3 ways:</InteractiveSpan>
    {showHint ? <Ul>
      <Li>Just replace https://www.<strong>youtube.com</strong>/watch?v=neV3EPgvZ3g with: <strong>jusaudio.io</strong></Li>
      <Li>Use the Search Bar on this page to search for your favorite videos</Li>
      <Li>Try one of our handpicked tracks for work and study below</Li>
    </Ul> : null}
  </>
}

const LogoText = styled("span")`
  font-family: Roboto, sans-serif;
  font-size: 1.25rem;
`;
const MainCopy = styled("h1")`
  font-family: Roboto, sans-serif;
  font-size: 1.75rem;
  max-width: 600px;
`;
const InteractiveSpan = styled("span")`
  text-decoration: underline;
  cursor: pointer;
  color: #673ab7;
  margin-bottom: 1rem;
`;
const Ul = styled("ul")`
  margin-left: 1rem;
`;
const Li = styled("li")`
  margin-bottom: .5rem;
  font-family: Roboto, sans-serif;
  color: #555;
  font-weight: 200;
  list-style-type: initial;
`;

export default connect(
  mapToProps,
  combineActions(playerActions),
)(MusicList);