import React, { useEffect, useState } from 'react'
import Header from './Components/Header/Header'
import Home from './Components/Home/Home'
import { getWords } from './Util/Api/api';

const App = () => {
  //this states are used to store all the words present in the database 
  const [wordList, settWordList] = useState();
  const [allWords, setAllWords] = useState();
  useEffect(() => {
    const getWordList = async () => {
      var fetchData = await getWords();
      settWordList(fetchData)
      setAllWords(fetchData)
    }
    getWordList();
  }, [])
  const handleSetWordList = (newData) => {
    settWordList(newData)
  }
  //this function is used to store data according to search result and again store all data when search is canceled
  const searchCallback = (searchResults) => {
    searchResults === "allWords" ? settWordList(allWords) : settWordList(searchResults)
  }
  return (
    <div>
      <Header searchFunction={searchCallback} />
      <Home wordsData={wordList} setWordData={handleSetWordList} />
    </div>
  )
}

export default App
