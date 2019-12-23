import * as React from "react";
import styled from "styled-components";
import * as _ from "lodash";
import { youtubeSearch, suggest } from "src/services/youtube";

import SearchIcon from "@material-ui/icons/Search";

enum MediaPlatforms {
  Youtube = 1,
  Vimeo
}

export default class MusicSearchBox extends React.PureComponent<any, any> {
  public state = {
    suggestions: null
  };

  constructor(props: any) {
    super(props);
    this.onTypeSuggest = _.debounce(this.onTypeSuggest, 500, { leading: true });
  }

  public render() {
    return (
      <>
        <Container>
          <SearchBox
            onClick={this.props.focus}
            onChange={e =>
              this.onTypeSuggest(e.target.value, MediaPlatforms.Youtube)
            }
            placeholder="Search for music, songs, podcasts"
            type="search"
          />
          <CSearchIcon />
        </Container>
        <Suggestions onSearch={this.onSearch} items={this.state.suggestions} />
      </>
    );
  }

  private onTypeSuggest = async (
    queryString: string,
    platform: MediaPlatforms = MediaPlatforms.Youtube
  ) => {
    if (queryString.length < 5) {
      return null;
    }

    const list = await suggest(queryString);
    // console.log("list >> ", list);

    this.setState({ suggestions: list });
    return null;
  };

  private onSearch = async (queryString: string, platform: MediaPlatforms) => {
    // console.log(`Searching... #${queryString} on ${platform}`);

    if (platform === MediaPlatforms.Youtube) {
      const platformSearchResults = await youtubeSearch(queryString);
      // console.log("ytreults >> ", ytresults);
      this.setState({ suggestions: null });
      this.props.update(platformSearchResults);
    }

    return null;
  };
}

function Suggestions({ onSearch, items }: any) {
  if (!items || !items.length) {
    return null;
  }

  return (
    <Section>
      {items.map((item: string, key: number) => {
        return <SuggestionRow onSearch={onSearch} key={key} text={item} />;
      })}
    </Section>
  );
}

function SuggestionRow({ onSearch, text }: any) {
  return (
    <SuggestionSpan onClick={() => onSearch(text, MediaPlatforms.Youtube)}>
      {text}
    </SuggestionSpan>
  );
}

const Container = styled("div")`
  position: relative;
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: flex-start;
`;
const SearchBox = styled("input")`
  box-sizing: border-box;
  height: 2.9rem;
  width: 100%;
  padding: 0.5rem;
  padding-left: 1rem;
  border-radius: 0.2rem;
  border: 2px solid #aaa;
  max-width: 800px;
  font-size: 1rem;
`;
const CSearchIcon = styled(SearchIcon)`
  cursor: pointer;
  margin-left: -50px;
`;
const Section = styled("section")`
  width: 95%;
  min-height: 18rem;
  height: auto;
  border: 1px solid #ddd;
  border-top: none;
  border-radius: 5px;
  margin-top: 1rem;
  padding: 0.5rem;
  box-shadow: 1px 1px 1px #ddd;
  z-index: 1000;
`;
const SuggestionSpan = styled("span")`
  display: inline-block;
  width: 100%;
  color: #9c27b0;
  font-weight: 800;
  margin-bottom: 0.5rem;
  margin-left: 0.5rem;
  cursor: pointer;
  z-index: 1000;
`;
