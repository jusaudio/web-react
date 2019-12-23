import * as React from 'react';
import styled from "styled-components";

import Button from "@material-ui/core/Button";
import { withRouter } from "react-router";

interface IPrimaryButtonProps {
  label: string;
  action?: () => void;
}

export const PrimaryButton = ({ label, action }: IPrimaryButtonProps) =>
  <PrimaryButtonStyled
    onClick={action}
    variant="contained"
    color="primary">
    { label }
  </PrimaryButtonStyled>

export const EnviarButton = ({ label, action }: IPrimaryButtonProps) =>
  <PrimaryButtonStyled
    onClick={action}
    variant="contained"
    fullWidth={true}
    color="primary">
    { label }
  </PrimaryButtonStyled>

export const RenderEnviarButton = withRouter(({ history, match }: any) => {
  // console.log("RenderEnviarButton history: ", match);
  const action = () =>
    history.push(`/users/${match.params.userId}/q/${parseInt(match.params.questionId, 10) + 1}`);
  return (
    <EnviarButton
      action={action}
      label="ENVIAR RESPUESTA" />
  )
});

export const ReproducirButton = ({ action }: { action: () => void }) =>
  <PrimaryButtonStyled
    onClick={action}
    variant="contained"
    fullWidth={true}
    color="primary">
    <ReproducirText>REPRODUCIR LISTA</ReproducirText>
  </PrimaryButtonStyled>

const PrimaryButtonStyled = styled(Button)`
  background: linear-gradient(45deg, teal 30%, teal 90%);
  border: 0;
  color: white;
  height: 48px;
  padding: 0 30px;
  width: 14.5rem;
  align-self: center;
  margin-bottom: 1rem !important;
`;

const ReproducirText = styled.span`
  font-size: 1.1rem;
  font-size: 200;
`;