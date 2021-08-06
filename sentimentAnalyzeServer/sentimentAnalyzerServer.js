const express = require('express');
const dotenv = require('dotenv');
const app = new express();
dotenv.config();

app.use(express.static('client'));

const cors_app = require('cors');
app.use(cors_app());

app.get('/', (req, res) => {
  res.render('index.html');
});

app.get('/url/emotion', (req, res) => {
  const analyzeParams = {
    url: req.query.url,
    features: {
      emotion: {},
    },
  };
  getUrlEmotion(analyzeParams, res);
});

app.get('/url/sentiment', (req, res) => {
  const analyzeParams = {
    url: req.query.url,
    features: {
      sentiment: {},
    },
  };
  getUrlSentiment(analyzeParams, res);
});

app.get('/text/emotion', (req, res) => {
  const analyzeParams = {
    text: req.query.text,
    features: {
      emotion: {},
    },
  };
  getTextEmotion(analyzeParams, res);
});

app.get('/text/sentiment', (req, res) => {
  const analyzeParams = {
    text: req.query.text,
    features: {
      sentiment: {},
    },
  };
  getTextSentiment(analyzeParams, res);
});

let server = app.listen(8080, () => {
  console.log('Listening', server.address().port);
});

function getNLUInstance() {
  let api_key = process.env.API_KEY;
  let api_url = process.env.API_URL;

  const NaturalLanguageUnderstanding = require('ibm-watson/natural-language-understanding/v1');
  const { IamAuthenticator } = require('ibm-watson/auth');

  const naturalLanguageUnderstanding = new NaturalLanguageUnderstanding({
    version: '2021-08-01',
    authenticator: new IamAuthenticator({
      apikey: api_key,
    }),
    serviceUrl: api_url,
  });

  return naturalLanguageUnderstanding;
}

const getUrlSentiment = (params, res) => {
  const nlu = getNLUInstance();
  nlu
    .analyze(params)
    .then((analysisResults) => {
      let sentiment_value = analysisResults.result.sentiment.document.label;
      console.log(`url sentiment value result = ${sentiment_value}`);
      res.send(sentiment_value);
    })
    .catch((err) => {
      console.log('error getting url sentiment, error:', err);
    });
};

const getUrlEmotion = (params, res) => {
  const nlu = getNLUInstance();
  nlu
    .analyze(params)
    .then((analysisResults) => {
      let emotions_object = analysisResults.result.emotion.document.emotion;
      console.log(
        `url emotion json object result = ${JSON.stringify(emotions_object)}`
      );
      res.send(emotions_object);
    })
    .catch((err) => {
      console.log('error getting url emotion, error:', err);
    });
};

const getTextSentiment = (params, res) => {
  const nlu = getNLUInstance();
  nlu
    .analyze(params)
    .then((analysisResults) => {
      let sentiment_value = analysisResults.result.sentiment.document.label;
      console.log(`text sentiment value result = ${sentiment_value}`);
      res.send(sentiment_value);
    })
    .catch((err) => {
      console.log('error getting text sentiment, error:', err);
    });
};

const getTextEmotion = (params, res) => {
  const nlu = getNLUInstance();
  nlu
    .analyze(params)
    .then((analysisResults) => {
      let emotions_object = analysisResults.result.emotion.document.emotion;
      console.log(
        `text emotion json object result = ${JSON.stringify(emotions_object)}`
      );
      res.send(emotions_object);
    })
    .catch((err) => {
      console.log('error getting text emotion, error:', err);
    });
};
