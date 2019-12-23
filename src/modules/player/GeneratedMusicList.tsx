import * as React from "react";
import styled from "styled-components";
import { ListItem, ListItemText, List } from "@material-ui/core";
import { ISearchMeta } from "../../constants/types";
import { TinyAvatar } from "../../components/Avatars";
import Loader from "../../components/Loader";

interface IGeneratedMusicList {
  selectTrack: (id: string) => void;
  loading: boolean;
  platformSearchResults: any;
  curatedTracks: ISearchMeta[],
};

const Strings = {
  EmptySearch: "Vacío, prueba una búsqueda",
};

/**
 * 
 * @TODO what is this file for?
 */
const GeneratedMusicList = ({ platformSearchResults, selectTrack, curatedTracks, loading }: IGeneratedMusicList) => {
  const tracks = getTracks(platformSearchResults, curatedTracks);
  // console.log("tracks >> ", tracks);

  return <ScrollContainer>
    <List>
      {loading ? <Loader /> : null}
      {tracks.map(({ title, secondary, cover, id }: any, idx: number) => {
        const onClick = () => selectTrack(id);
        return (
          <ListItemStyled
            loading={loading ? 1 : 0}
            onClick={onClick}
            key={idx}>
            <TinyAvatar classes={{}} src={cover.default ? cover.default.url : cover} />
            <ListItemText
              primary={title}
              secondary={secondary} />
          </ListItemStyled>
        )
      })}
      {(!tracks.length && !loading) ? <EmptyMusicList /> : null}
    </List>
  </ScrollContainer>
}

function getTracks(platformSearchResults: any, curatedTracks: ISearchMeta[]) {
  if (!platformSearchResults) {
    return curatedTracks;
  }

  return platformSearchResults.items.map((track: any) => {
    return {
      id: track.id.videoId,
      title: track.snippet.title,
      secondary: `-`,
      cover: track.snippet.thumbnails,
    };
  });
}

const ScrollContainer = styled.section`
  overflow: scroll;
`;
const EmptyMusicList = () =>
  <EmptyMusicListStyled>{Strings.EmptySearch}</EmptyMusicListStyled>

const EmptyMusicListStyled = styled.div`
  color: #808080;
  width: 100%;
  text-align: center;
`

const ListItemStyled: any = styled(ListItem)`
  opacity: ${(props: any) => props.loading ? ".5" : "1"};
  border-bottom: 1px solid #aaa;
  cursor: pointer;
`;

export default GeneratedMusicList;