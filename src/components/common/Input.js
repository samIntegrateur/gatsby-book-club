import styled from 'styled-components';

export const Input = styled.input`
  display:block;
  width: 100%;
  padding: 0.5rem 0.8rem;
  border: 1px solid gray;
  margin-bottom: 1rem;
  
  &:focus, &:active {
    border-color: rebeccapurple;
  }
`;
