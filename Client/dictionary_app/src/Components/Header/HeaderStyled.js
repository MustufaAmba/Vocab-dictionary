import styled from "@emotion/styled";
import { IconButton, TextField, Typography } from "@mui/material";

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  width: 100%;
  background: #64244b;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
`;

export const HeaderTitle = styled(Typography)`
  font-size: 30px;
  font-weight: bold;
  color: white;
  margin-left: 10px;
  font-family: "Kumbh Sans", sans-serif;
`;

export const SearchIcon = styled(IconButton)`
  color: white;
`;

export const CustomTextField = styled(TextField)`
  & .MuiInputBase-input {
    color: white;
  }
  visibility: ${(props) =>
    props.searchvalue === "hide" ? "hidden" : "visible"};
  background: transparent;
  margin: 10px;
`;
