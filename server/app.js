const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

const app = express();

//connect to mlab database;
mongoose.connect('mongodb://Adithyamahesh:Adithya.596@ds261616.mlab.com:61616/adb-graphql');
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