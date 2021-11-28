import React, { useState } from 'react'
import { InputAdornment } from '@mui/material';
import { CustomTextField, HeaderContainer, HeaderTitle, SearchIcon } from './HeaderStyled';
import { searchWord } from '../../Util/Api/api';
import { AiOutlineClose, AiOutlineSearch } from 'react-icons/ai';

const Header = ({ searchFunction }) => {
  const [searchText, setSearchText] = useState("");
  const [toggleSearch, setToggleSearch] = useState(false);

  //this function is used to send data letter by letter to the backend and get results according
  const handleSearch = async (e) => {
    setSearchText(e.target.value)
    const data = await searchWord(e.target.value)
    searchFunction(data)
  }
  //here the text field is toggle according to user
  const toggleSearchField = () => {
    setToggleSearch(toggleSearch === false ? true : false)
    toggleSearch && searchFunction("allWords")
  }
  return (
    <HeaderContainer>
      {
        toggleSearch === false ? <> <HeaderTitle>Vocab</HeaderTitle>
          <SearchIcon onClick={toggleSearchField}><AiOutlineSearch /></SearchIcon></> :
          <CustomTextField
            autoFocus
            placeholder="Search"
            value={searchText}
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => handleSearch(e)}
            searchvalue={toggleSearch ? "show" : "hide"}
            InputProps={{
              disableUnderline: true,
              endAdornment: <InputAdornment position="end" style={{ cursor: "pointer", color: "white" }}><AiOutlineClose onClick={toggleSearchField} /></InputAdornment>,
            }}
          />
      }
    </HeaderContainer>
  )
}

export default Header
