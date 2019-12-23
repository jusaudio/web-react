import * as React from "react";
import styled from "styled-components";
import { ThreeDotsIcon } from "../modules/player/assets";
import { Menu, MenuItem } from "@material-ui/core";
import { withRouter } from "react-router";

const Strings = {
  ExploreMusic: "Explore la música",
  MusicList: "Lista de música",
  EditProfile: "Editar perfil",
  ChangeProfile: "Cambiar perfil",
  Help: "Ayuda y comentarios",
};

interface IState {
  anchorEl: undefined | null;
}

class ThreeDotsMenu extends React.Component<any, IState> {
  public state = {
    anchorEl: undefined,
  }

  public render() {
    // console.log("path: ", this.props.match.path);
    return (
      <Container>
        <ThreeDotsIcon
          dark={this.props.match.path === "/users/:userId/music"}
          handleClick={this.handleClick} />
        <Menu
          anchorEl={this.state.anchorEl}
          open={Boolean(this.state.anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={() => this.navigate(`/users/${this.props.match.params.userId}/music`)}>{Strings.MusicList}</MenuItem>
          <MenuItem onClick={() => this.navigate("music/explore")}>{Strings.ExploreMusic}</MenuItem>
          <MenuItem onClick={() => false}>{Strings.Help}</MenuItem>
          <MenuItem onClick={() => false}>{Strings.EditProfile}</MenuItem>
          <MenuItem onClick={() => this.navigate(`/users`)}>{Strings.ChangeProfile}</MenuItem>
        </Menu>
      </Container>
    )
  }

  protected handleClick = (event: any) =>
    this.setState({ anchorEl: event.currentTarget });

  protected handleClose = (event: any) =>
    this.setState({ anchorEl: null });

  protected navigate = (route: string): void => {
    this.setState({
      anchorEl: undefined,
    });
    this.props.history.push(route);
  }
}

const Container = styled.div`
  position: absolute;
  right: 25px;
`;

export default withRouter(ThreeDotsMenu);