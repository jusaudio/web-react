import * as React from "react";
import styled from "styled-components";
import { LoaderMusicPlayer } from "../../components/Loader";
import { ratingEmoticonMappings } from "../../constants/mappings";

interface IProps {
  emotionesRating: any;
  title: string;
  artist: string;
  albumSrc: string;
  preloading: boolean;
}

class AlbumCollage extends React.Component<IProps> {
  public state = {
    waitingMessage: "",
  }

  /**
   * Need to replace the loading images and position text.
   * 
   */

  public render() {
    return(
      <React.Fragment>
        <AlbumImageContainer>
          <AlbumImage
            width={270}
            height={270}
            src={this.props.preloading ? "http://placeimg.com/290/290/nature" : this.props.albumSrc}
            alt="album cover" />
          { this.props.preloading ? <LoaderMusicPlayer message={this.state.waitingMessage} /> : null }
          { this.props.emotionesRating
              ? <EmotionRatingBadge rating={this.props.emotionesRating} />
              : null
          }
        </AlbumImageContainer>
        <AlbumDetails>
          <Name>{this.props.title.length > 30
                  ? this.props.title.substr(0, 30) + "..."
                  : this.props.title
                }
          </Name>
          <ArtistName>{this.props.artist.length > 30
              ? this.props.artist.substr(0, 30) + "..."
              : this.props.artist
            }
          </ArtistName>
        </AlbumDetails>
      </React.Fragment>
    )
  }
}

const EmotionRatingBadge = ({ rating }: { rating: number }) =>
  <EmotionRatingBadgeStyled>
    <Emoticon>{ratingEmoticonMappings[rating]}</Emoticon>
    <span>1</span>
  </EmotionRatingBadgeStyled>

const Emoticon = styled.span`
  font-size: 1.3rem;
  vertical-align: middle;
  margin-right: 4px;
`;

const EmotionRatingBadgeStyled = styled.div`
  width: 2.5rem;
  padding: 0rem .5rem;
  padding-top: .2rem;
  background: teal;
  border-radius: 1rem;
  position: absolute;
  bottom: 20px;
  left: 50px;
`;

const AlbumDetails = styled.div`
  text-align: center;
  margin-bottom: 0rem;
`;

const AlbumImageContainer = styled.section`
  position: relative;
  text-align: center;
  margin-bottom: 1rem;
  2px solid #555;
`;

const AlbumImage = styled.img`
  max-width: 85%;
  max-height: 270px;
  max-width: 270px;
  height: 40vh;
  width: 40vh;
`;

const Name = styled.h3`
  font-family: 'Roboto';
  margin: .5rem;
`;

const ArtistName = styled.span`
  font-family: 'Roboto';
  color: #808080;
`;


export default AlbumCollage;