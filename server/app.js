const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const keys = require('./config/keys.dev');
const cors = require('cors');
const app = express();
const path = require('path');

//allow cross origin requests
app.use(cors());

//connect to mlab database;
mongoose.connect(`${keys.mLabDbString}`, {
    useNewUrlParser: true
});
mongoose.connection.once('open', () => {
    console.log("connected to database");
})

app.use("/graphql", graphqlHTTP({
    schema: schema,
    graphiql: true
}));

app.use(express.static('public'));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

const port = process.env.PORT || 4000;

app.listen(4000, () =>{
    console.log("listening on port 4000");
});