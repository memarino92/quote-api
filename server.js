const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.listen(PORT);

app.get('/api/quotes/random', (req, res, next) => {
    const randomQuote = getRandomElement(quotes);
    res.send({
       quote: randomQuote
    });
});

app.get('/api/quotes', (req, res, next) => {
    const person = req.query.person;
    if (person) {
        const arrayToSend = quotes.filter(quote => quote.person === person);
        res.send({
            quotes: arrayToSend
        });
    } else {
        res.send({
            quotes: quotes
        });
    }
});

app.post('/api/quotes', (req, res, next) => {
    if (!req.query.quote || !req.query.person) {
        res.status(400).send('Invalid format');
    } else {
        const newQuote = {
            quote: req.query.quote,
            person: req.query.person
        };
        quotes.push(newQuote);
        res.status(201).send({
            quote: newQuote
        });
    }
});