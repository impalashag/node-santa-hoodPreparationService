const express = require('express');
const app = express();
const min_gifts = require('./utils/min_gifts');

const port = process.env.PORT || 3000;

app.use(express.json());

app.get('', (req, res) => {
    res.send('Hi, this is a app to return minimum number of presents to fill a hood as per its exact capacity for Santa Inc.')
});

app.post('/hoodfiller', (req, res) => {

    if(!req.body.hood_capacity || !req.body.present_weights) {
        return res.send({
            error: 'Valid details must be provided'
        });
    }

    min_gifts(req.body, (error, response) => {
        if (error) {
            return res.send({error});
        }
        res.send(response);
    })

});

app.get('*', (req, res) => {
    res.send('Hi, this is a app to return minimum number of presents to fill a hood as per its exact capacity for Santa Inc.')
});

app.listen(port, () => {
    console.log('Server is up on port ' + port);
});