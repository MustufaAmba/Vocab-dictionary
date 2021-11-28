const express = require("express");
const router = express();
const axios = require("axios");
const Word = require("./database/wordModel");
const { app_id, app_key, PORT } = require("./constants");

const mysort = { word: 1 };

//this method is responsible for oxford api calls and search word in db if present then it will not save the word else it will save word with 3 properties wordname definition and examples
const fetchData = async (data) => {
  Word.count({ word: data }, (err, count) => {
    if (!count) {
      const headers = {
        app_id: app_id,
        app_key: app_key,
      };
      axios
        .get(
          `https://od-api.oxforddictionaries.com:443/api/v2/entries/en-gb/${data}`,
          { headers }
        )
        .then((response) => {
          const wordname = response.data.results[0].id;
          let examplesArray = [];
          response.data.results[0].lexicalEntries[0].entries[0].senses.map(
            (item) =>
              item.examples != undefined &&
              item.examples.map((data) => examplesArray.push(data.text))
          );
          const newWord = new Word({
            word: wordname,
            definition:
              response.data.results[0].lexicalEntries[0].entries[0].senses[0]
                .definitions[0],
            examples: examplesArray,
          });
          newWord.save();
        })
        .catch((err) => console.log(err));
    } else {
      console.log("Already Exists");
    }
  });
};
router.get("/addWord", (req, resp) => {
  const { newWord } = req.query;
  fetchData(newWord).then(() => {
    setTimeout(() => {
      Word.find({}, (err, allDetails) => {
        if (err) {
          console.log(err);
        } else {
          resp.send(JSON.stringify(allDetails));
        }
      });
    }, 4000);
  });
});

router.get("/home", (req, resp) => {
  Word.find({}, (err, allDetails) => {
    if (err) {
      console.log(err);
    } else {
      resp.send(JSON.stringify(allDetails));
    }
  }).sort(mysort);
});

router.get("/searchWord", (req, resp) => {
  const { searchValue } = req.query;
  const regex = new RegExp(searchValue, "i");
  Word.find({ word: regex }, (err, allDetails) => {
    if (err) {
      console.log(err);
    } else {
      resp.send(JSON.stringify(allDetails));
    }
  });
});


if(process.env.NODE_ENV==="production"){
  router.use(express.static("Client/dictionary_app/build"))
}
router.listen(PORT);
