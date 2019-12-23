import * as React from 'react';
import styled from "styled-components";

const FlautaImage = process.env.PUBLIC_URL + "/images/icons/icon-152x152.png";
export const BrandImage = () =>
  <BrandImageStyled
    width={150}
    height={150}
    src={FlautaImage} />

const BrandImageStyled = styled.img`
  align-self: center;
  margin-bottom: 1rem;
`;