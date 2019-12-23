import * as React from "react";
import Downshift from 'downshift';
import {
  MuiThemeProvider,
  withStyles,
} from "@material-ui/core/styles";
import Theme from "../utils/Theme";

import {
  ListItemText,
  Paper,
  TextField,
  MenuItem,
} from "@material-ui/core";
import { withRouter } from "react-router";
import { TinyAvatar } from "./Avatars";
import SearchIcon from "./SearchIcon";

const Strings = {
  Placeholder: "Escribe el nombre del adulto mayor",
};

class UserSearchField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      selectedItem: this.props.residents,
      selectedItemFiltered: {},
    };
  }

  handleInputChange = event =>
    this.setState({ inputValue: event.target.value });

  handleKeyDown = event => {
    const { inputValue, selectedItem } = this.state;
    if (selectedItem.length
        && !inputValue.length
        && keycode(event) === "backspace") {

      this.setState({
        selectedItem: selectedItem.slice(0, selectedItem.length - 1),
      });
    }
  };

  renderSuggestion({
    suggestion,
    index,
    itemProps,
    highlightedIndex,
    selectedItem }) {
    const isHighlighted = highlightedIndex === index;
    const isSelected = (selectedItem || '').indexOf(suggestion.label) > -1;
    const resident = this.state.selectedItem[suggestion];
    const fullName = `${resident.firstName} ${resident.lastName}`;
    const residentHome = resident.hospital;

    return (
      <div key={index}
        style={{padding: ".5rem"}}>
        <MenuItem
          {...itemProps}
          selected={isHighlighted}
          component="div"
          style={{
            fontWeight: isSelected ? 500 : 400,
          }}>
          <TinyAvatar onClick={() => this.onResidentSelect(suggestion)} />
          <ListItemText
            onClick={() => this.onResidentSelect(suggestion)}
            primary={fullName}
            secondary={residentHome} />
        </MenuItem>
      </div>
    );
  }

  onResidentSelect = residentId =>
    this.props.history.push(`/users/${residentId}`);

  render() {
    const { classes, residents } = this.props;
    const { value, suggestions } = this.state;

    const inputProps = {
      classes,
      residents,
      value,
    };

    return (
      <React.Fragment>
        <Downshift
          inputValue={value}
          selectedItem={suggestions}
          onChange={changeValue => this.onResidentSelect(changeValue)}
        >
          {({
            getInputProps,
            getItemProps,
            isOpen,
            inputValue,
            selectedItem,
            highlightedIndex
          }) => (
            <div>
              {renderInput({
                InputProps: getInputProps({
                  onChange: this.handleInputChange,
                  onKeyDown: this.handleKeyDown,
                  placeholder: Strings.Placeholder,
                }),
                fullWidth: true,
              })}
              {isOpen ? (
                <Paper className={classes.paper} square>
                  {getSuggestions(inputValue, this.state.selectedItem)
                    .map((suggestion, index) =>
                      this.renderSuggestion({
                        highlightedIndex,
                        index,
                        itemProps: getItemProps({ item: suggestion }),
                        selectedItem,
                        suggestion,
                      }),
                  )}
                </Paper>
              ) : null}
            </div>
          )}
        </Downshift>
      </React.Fragment>
    );
  }

}

const renderInput = inputProps => {
  const {
    InputProps,
    classes,
    ref,
    ...other
  } = inputProps;

  return (
    <MuiThemeProvider theme={Theme}>
      <TextField
        fullWidth
        InputProps={{
          inputRef: ref,
          ...InputProps,
        }}
        { ...other }
      />
      <SearchIcon />
    </MuiThemeProvider>
  )
}

const getSuggestions = (value, residents) => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;
  const residentKeys = Object.keys(residents);

  return (inputLength === 0)
    ? []
    : residentKeys.filter(key => {
      let fullName = `${residents[key].firstName} ${residents[key].lastName}`.toLowerCase();
      return fullName.slice(0, inputLength) === inputValue
    });
}

const styles = theme => ({
  paper: {
    left: 0,    
    marginTop: theme.spacing.unit,
    position: "absolute",
    right: 0,
    zIndex: 1,
  },
});

export default withStyles(styles)(withRouter(UserSearchField));