const express = require("express");
const graphqlHTTP = require("express-graphql");
const app = express();
const schema = require("./models/schema");

app.use(
  "/graphql",
  graphqlHTTP({
    //directing express-graphql to use this schema to map out the graph
    schema,
    //directing express-graphql to use graphiql when goto '/graphql' address in the browser
    //which provides an interface to make GraphQl queries
    graphiql: true,
  })
);
app.listen(3000, () => {
  console.log("listening on port 3000");
});
