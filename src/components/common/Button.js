import styled from 'styled-components';

export const Button = styled.button`
 padding: 0.5rem 0.8rem;
 background-color: rebeccapurple;
 color: #fff;
 cursor: pointer;
 border: none;
 ${props => props.block ? 'display:block; width: 100%;' : ''}
 
 &:hover, &:focus {
  background-color: purple;
 }
`;
