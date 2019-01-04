const express = require('express');
const graphqlHTTP = require('express-graphql');
const app = express();
const mongoose = require('mongoose');
const PORT = 4000;
const schema = require('./schema/schema');

const cors = require('cors');

app.use(cors());

mongoose.connect('mongodb://learning-graphql:PASSWORD@ds013579.mlab.com:13579/learning-graphql', { useNewUrlParser: true });
mongoose.connection.once('open', () => console.log('Successful database connection'));

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));