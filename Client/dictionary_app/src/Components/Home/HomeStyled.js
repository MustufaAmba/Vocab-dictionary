import styled from "@emotion/styled";
import { Dialog, Fab, IconButton, Typography } from "@mui/material";

export const HomeConatiner = styled.div`
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  border-top: 1px solid black;
  position: relative;
  top: -5px;
  background: white;
`;
export const Title = styled(Typography)`
  font-size: 20px;
  font-family: "Kumbh Sans", sans-serif;
  margin: 10px 10px;
`;
export const WordContainer = styled.div`
  width: 100%;
  height: 120px;
  border-bottom: 1px solid lightgrey;
  cursor: pointer;
  &:hover {
    background: lightGrey;
  }
`;

export const WordName = styled(Typography)`
  font-size: 30px;
  font-weight: bold;
  font-family: "Kumbh Sans", sans-serif;
  margin: ${(props) => props.setmargin};
`;

export const WordDefinition = styled(Typography)`
  margin-left: 10px;
  font-family: "Kumbh Sans", sans-serif;
`;

export const FullScreenDailog = styled(Dialog)``;
export const UnorderdList = styled.ul``;
export const ListItems = styled.li`
  font-size: 16px;
  font-family: "Kumbh Sans", sans-serif;
`;
export const CloseButton = styled(IconButton)`
  width: fit-content;
  position: absolute;
  right: 10px;
`;
export const FloatingButton = styled(Fab)`
  position: sticky;
  left: 1830px;
  bottom: 10px;
  background: #64244b;
  &:hover {
    background: #64244b;
  }
`;
