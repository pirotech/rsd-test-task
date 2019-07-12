import styled from 'styled-components';


const UiTextField = styled.input`
  width: 100%;
  height: 38px;
  padding: 5px 10px;
  border: 1px solid hsl(0, 0%, 80%);
  border-radius: 4px;
  background-color: white;
  transition: all 0.1s;
  font-family: Roboto, sans-serif;
  font-size: 16px;
  color: #333;
  outline: none;
  &:hover {
    border: 1px solid hsl(0, 0%, 70%);
  }
`;

export default UiTextField;
