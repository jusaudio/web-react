import * as React from "react";
import * as Autosuggest from "react-autosuggest";
import { MuiThemeProvider, Paper, MenuItem } from "@material-ui/core";
import Theme from "../utils/Theme";

import { TextField } from "@material-ui/core";
import { SelectMethods } from "../constants/types";
import { EnviarButton } from "./Buttons";
import { withRouter } from "react-router";

class QuestionField extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      suggestions: [],
    }
  }

  public render() {
    const { suggestions } = this.state;
    const inputProps = {
      onChange: this.onChange,
      placeholder: this.props.placeholder,
      value: this.props.value,
    };

    return (
      <React.Fragment>
        <Autosuggest
          renderInputComponent={renderInput}
          renderSuggestionsContainer={renderSuggestionsContainer}
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
          onSuggestionSelected={this.onSuggestionSelected}
          alwaysRenderSuggestions={false}
          shouldRenderSuggestions={this.shouldRenderSuggestions}
        />
        {this.renderPrimaryButton(this.props.value)}
      </React.Fragment>
    )
  }

  protected renderPrimaryButton = (valueSelected: string) => {
    if (!valueSelected) {
      return null;
    }

    return (
      <EnviarButton
        action={() => this.props.history.push(this.nextScreen())}
        label="ENVIAR RESPUESTA" />
    )
  }

  protected nextScreen = () =>
    `/users/${this.props.match.params.userId}/q/${this.props.navigateTo}`;

  protected onChange = (event: any, { newValue }: any) =>
    this.props.onChange(newValue);

  protected onSuggestionsFetchRequested = ({ value }: any) => {
    this.setState({
      suggestions: getSuggestions(value, this.props.suggestionsList)
    });
  };

  protected onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  protected onSuggestionSelected = (evt: React.FormEvent, suggestionOptions: any) => {
    // console.log("suggestionOptions: ", suggestionOptions);
    if (suggestionOptions.method === SelectMethods.Click) {
      let valueToChange;
      const { city, country, option } = suggestionOptions.suggestion;
      if (city && country) {
        valueToChange = `${city}, ${country}`;
      } else {
        valueToChange = option;
      }
      this.props.onChange(valueToChange);
    };
  };

  protected shouldRenderSuggestions = (value: string) => {
    if (!value) {
      return false;
    }
    return (value.trim().length >= 2);
  };

}

const renderInput = (inputProps: any) => {
  const {
    ref,
    ...other
  } = inputProps;

  return (
    <MuiThemeProvider theme={Theme}>
      <TextField
        fullWidth={true}
        InputProps={{
          inputRef: ref,
          ...other,
        }}
      />
    </MuiThemeProvider>
  )
}

const getSuggestions = (value: string = "", suggestions: any[]): (any[] | boolean) => {
  // console.log("getSuggestions: ", value);
  if (!value) {
    return false;
  }
  const inputValue: string = value.trim().toLowerCase();
  const inputLength: number = inputValue.length;
  return inputLength === 0
    ? []
    : suggestions.filter(suggestion => {
      const { city, option } = suggestion;
      const optionValue = city || option;
      return optionValue.toLowerCase().slice(0, inputLength) === inputValue
    }).slice(0, 5);
}

const getSuggestionValue = (suggestion: any) => suggestion.name;

const renderSuggestion = (suggestion: any, { query, isHighlighted }: any) => {
  // console.log("suggestion: ", suggestion);
  const valueOptionKey = suggestion.city || suggestion.option;
  const valueOptionDisplay = suggestion.city
    ? `${suggestion.city}, ${suggestion.country}`
    : suggestion.option;

  return (
    <MenuItem
      key={valueOptionKey.toLowerCase()}
      selected={isHighlighted}
      component="div"
    >
      { valueOptionDisplay }
    </MenuItem>
  )
}

const renderSuggestionsContainer = (options: any) => {
  const { containerProps, children } = options;
  return (
    <Paper { ...containerProps } square={true} style={{ marginBottom: "1rem", }}>
      { children }
    </Paper>
  )
}

export default withRouter(QuestionField);