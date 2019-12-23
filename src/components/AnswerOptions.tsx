import * as React from "react";
import styled from "styled-components";

interface IAnswerOptions {
  selectOption: (selected: any) => void;
  value: any;
  answers?: any;
  binary?: boolean;
}

interface ISingleAnswerOption {
  answer: IAnswer
  key: number;
  selectOption: (selected: any) => void;
  selected: boolean;
}

interface IAnswer {
  display: string;
  value: number;
}

const SingleAnswerOption = ({ selected, selectOption, answer }: ISingleAnswerOption) => {
  return (
    <QuestionOptionButton
      selected={selected}
      onClick={selectOption}>
      <span>{ answer.display }</span>
      { selected ? <i>✔</i> : null }
    </QuestionOptionButton>
  );
}

const BinaryOptions = ({ value, selectOption }: { value: boolean, selectOption: any }) => {
  return (
    <React.Fragment>
      <QuestionOptionButton
        selected={value}
        onClick={() => selectOption(true)}>
        <span>Si</span>
        { value ? <i>✔</i> : null }
      </QuestionOptionButton>
      <QuestionOptionButton
        selected={!value}
        onClick={() => selectOption(false)}>
        <span>No</span>
        { !value ? <i>✔</i> : null }
      </QuestionOptionButton>
    </React.Fragment>
  )
}

const AnswerOptions = ({ answers, selectOption, value, binary }: IAnswerOptions) => {
  if (binary) {
    // console.log("Is binary");
    return <BinaryOptions
      selectOption={selectOption}
      value={value} />;
  }

  const answersKeys = Object.keys(answers);
  // console.log(answersKeys, value);
  return (
    <React.Fragment>
      {answersKeys.map((key, idx) => {
        const isSelected = value === (parseInt(key, 10) || key)
        return <SingleAnswerOption
          selectOption={() => selectOption(key)}
          selected={isSelected}
          key={idx}
          answer={answers[key]} />
      })}
    </React.Fragment>
  )
}

const QuestionOptionButton = styled.button`
  background: transparent;
  font-size: 1rem;
  width: 100%;
  padding: .75rem;
  font-weight: 600;
  margin-bottom: .5rem;
  display: flex;
  justify-content: space-between;
  outline: none;
  border: 1px solid ${(p: {selected: boolean}) => p.selected ? "#009688" : "#9E9E9E"};
  color: ${(p: {selected: boolean}) => p.selected ? "#009688" : "#9E9E9E"};
`;

export default AnswerOptions;