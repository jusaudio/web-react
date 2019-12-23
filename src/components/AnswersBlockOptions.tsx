import * as React from "react";
import styled from "styled-components"
import { InstrumentOptions, MusicGenre } from "../constants/types";

interface IProps {
  selectOption: (selected: InstrumentOptions | MusicGenre) => void;
  navigateOtroRoute?: () => void;
  answers: any;
  selected: any;
}

class AnswersBlockOptions extends React.Component<IProps, any> {
  public render() {
    const { answers, selected, selectOption, navigateOtroRoute } = this.props;
    const answerKeys = Object.keys(answers);
    return (
      <React.Fragment>
        <AnswersContainer>
          {answerKeys.map((answerKey: any, idx: number) => {
            return (
              <BlockSingle
                key={idx}
                isSelected={selected[answerKey]}
                selectOption={() => selectOption(answerKey)}
                answer={answers[answerKey]} />
            )
          })}
          {navigateOtroRoute
            ? <BlockSingle
                key={8}
                isSelected={false}
                selectOption={navigateOtroRoute}
                answer={{
                  display: "Otro", value: MusicGenre.Otra,
                }}
              />
            : null
          }
        </AnswersContainer>
      </React.Fragment>
    )
  }
}

const BlockSingle = ({ isSelected, selectOption, answer }: any) => {
  const handleSelect = () => selectOption(answer.value);
  return (
    <BlockSingleStyled
      image={ answer.image }
      isSelected={isSelected}
      onClick={handleSelect}>
      { isSelected ? <CheckIcon /> : null }
      <InnerText>{ answer.display }</InnerText>
    </BlockSingleStyled>
  )
}

const AnswersContainer = styled.div`
  display: flex;
  flex-flow: column wrap;
  height: auto;
  max-height: 380px;
`;

const CheckIcon = (props: any) => {
  return (
    <CheckIconStyled>✔</CheckIconStyled>
  )
};

const BlockSingleStyled: any = styled.div`
  position: relative;
  width: 48%;
  height: 62px;
  padding: 1.5rem 0rem;
  margin-bottom: 1rem;
  margin-right: 1rem;
  box-sizing: border-box;
  background: url(${(p: any) => p.image}) center no-repeat;
  border: ${(p: any) => p.image
    ? "none"
    : p.isSelected ? "2px solid #009688" : "2px solid #aaa"
  };

  background-size: cover;
  text-align: center;
  border-radius: 4px;
  cursor: pointer;

  color: ${(p: any) => p.image
    ? "#fff"
    : p.isSelected ? "#009688" : "#aaa"
  };

  font-weight: 600;

  &:after {
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: ${(p: any) => p.isSelected ? "block" : "none"};
    z-index: 10;
    background-color: ${(p: any) => p.image ? "#009688" : "#fff"};
    opacity: .65;
  }
`;

const InnerText = styled.span`
  position: relative;
  z-index: 100;
`;

const CheckIconStyled = styled.i`
  position: absolute;
  width: 1rem;
  height: 1rem;
  top: 10px;
  right: 10px;
  z-index: 100;
`;

export default AnswersBlockOptions