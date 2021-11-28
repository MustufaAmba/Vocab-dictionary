import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import { FullScreenDailog, WordContainer, WordName, WordDefinition, FloatingButton, HomeConatiner, CloseButton, UnorderdList, ListItems, Title } from './HomeStyled.js'
import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai";
import { Button, CircularProgress, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { addWord } from '../../Util/Api/api.js';

const Home = ({ wordsData, setWordData }) => {
    const [word, setWord] = useState({})
    const [openFullScreenDailog, setOpenFullScreenDailog] = useState(false);
    const [openAddDailog, setOpenAddDailog] = useState(false);
    const [loader, setLoader] = useState(false);
    const [newWord, setNewWord] = useState("");

    //this method is used to open fullscreen dailog
    const handleClickOpen = (wordData) => {
        setOpenFullScreenDailog(true);
        setWord({ word: wordData.word, definition: wordData.definition, examples: wordData.examples });
    };

    //this method is used to close fullscreen dailog
    const handleClose = () => {
        setOpenFullScreenDailog(false);
    };

    //this method is used to close add wrod  dailog
    const handleAddDailogClose = () => {
        setOpenAddDailog(false);
    };

    //this method is used to display text in textfield
    const handleAddWordText = (e) => {
        setNewWord(e.target.value)
    }
    //this method is responsible for sending word in backend and to show loader
    const handleAddWord = async (value) => {
        setLoader(true);
        const data = await addWord(value);
        setOpenAddDailog(false);
        setLoader(false);
        setNewWord("")
        setWordData(data)
    }

    return (
        <HomeConatiner>
            <Title>Words list</Title>
            {wordsData ? wordsData.map((data) =>
                <WordContainer key={data.word} onClick={() => handleClickOpen(data)}>
                    <WordName setmargin="0px 0px 0px 10px">{data.word}</WordName>
                    <WordDefinition>{data.definition.slice(0, 100) + "..."}</WordDefinition>
                </WordContainer>
            ) : <h1>Loding...</h1>}
            <FullScreenDailog
                fullScreen
                open={openFullScreenDailog}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <CloseButton
                    color="inherit"
                    onClick={handleClose}
                    aria-label="close"
                >
                    <AiOutlineClose />
                </CloseButton>
                <WordName setmargin="50px 0px 0px 10px">{word.word}</WordName>
                <WordDefinition>{word.definition}</WordDefinition>
                <UnorderdList>{
                    word.examples && word.examples.map(list => <ListItems key={list}>{list}</ListItems>)
                }

                </UnorderdList>
            </FullScreenDailog>
            <Dialog
                open={openAddDailog}
                onClose={handleAddDailogClose}
            >
                <CloseButton
                    color="inherit"
                    onClick={handleAddDailogClose}
                    aria-label="close"
                >
                    <AiOutlineClose />
                </CloseButton>
                <DialogTitle>Add to Dictionary</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        value={newWord}
                        label="New Word"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={(e) => handleAddWordText(e)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAddDailogClose}>Cancel</Button>
                    <Button onClick={() => handleAddWord(newWord)}>{loader ? <CircularProgress /> : "Add"}</Button>
                </DialogActions>
            </Dialog>

            <FloatingButton aria-label="add" onClick={() => setOpenAddDailog(true)}>
                <AiOutlinePlus color="white" />
            </FloatingButton>
        </HomeConatiner>
    );
}

export default Home;

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

