import ApolloClient from "apollo-boost"

const defaultClient = new ApolloClient({uri: "http://localhost:3000/graphql"})

export default defaultClient;