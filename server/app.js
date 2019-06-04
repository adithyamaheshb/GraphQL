const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const keys = require('./config/keys.dev');
const app = express();

//connect to mlab database;
mongoose.connect(`${keys.mLabDbString}`);
mongoose.connection.once('open', () => {
    console.log("connected to database");
})

app.use("/graphql", graphqlHTTP({
    schema: schema,
    graphiql: true
}));

app.listen(4000, () =>{
    console.log("listening on port 4000");
});