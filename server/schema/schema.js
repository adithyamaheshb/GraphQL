const graphql = require('graphql');
const _ = require('lodash');

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList } = graphql;

var books = [
    {name: 'Let Us C', genre: 'Education', id: '1', authorId: '1'},
    {name: 'Let Us Java', genre: 'Education', id: '2', authorId: '1'},
    {name: 'Concepts of Physics Part-1', genre: 'Education', id: '3', authorId: '2'},
    {name: 'Concepts of Physics Part-2', genre: 'Education', id: '4', authorId: '2'},
    {name: 'The Shining', genre: 'Horror', id: '5', authorId: '3'},
    {name: 'Night Shift', genre: 'Horror', id: '6', authorId: '3'},
    
];

var authors = [
    {name: 'Yashwanth Kanethkar', age: 40, id: '1'},
    {name: 'H.C.Verma', age: 56, id: '2'},
    {name: 'Stephen King', age: 65, id: '3'},
];


const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: { 
            type: AuthorType,
            resolve(parent, args) {
                console.log(parent)
                return _.find(authors, { id: parent.authorId })
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: { 
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return _.filter(books, { authorId: parent.id })
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID }},
            resolve(parent, args) {
                // code to get data from db
                return _.find(books, { id: args.id })
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID }},
            resolve(parent, args) {
                // code to get data from db
                return _.find(authors, { id: args.id })
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return books
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                return authors
            }
        }
    }
});


module.exports = new GraphQLSchema({
    query: RootQuery
})