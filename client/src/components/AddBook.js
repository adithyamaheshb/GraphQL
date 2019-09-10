import React from 'react';
import { graphql, compose } from 'react-apollo';
import { getAuthorsQuery, addBookMutation, getBooksQuery } from './../queries/queries';

class AddBook extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            bookName: '',
            genre: '',
            authorId: ''
        }
    }
    displayAuthors = () => {
        var data = this.props.getAuthorsQuery;
        console.log(data);
        if(!data.loading && data.networkStatus === 7){
            return data.authors.map((author) => {
                return( <option key={Math.random()} value={author.id}>{author.name}</option> )
            })
        }
        else {
            return (<option disabled>Loading Authors.....</option>);
        }
    }
    handleChange = (e) => {
        let { name, value } = e.target;
        this.setState({ [name]: value });
    }
    submitForm = (e) => {
        // e.preventDefault();
        const { bookName, genre, authorId } = this.state;
        if(bookName !== '' && genre !== '' && authorId !=='') {
            this.props.addBookMutation({
                variables : {
                    name: bookName, 
                    genre: genre,
                    authorId: authorId
                },
                refetchQueries: [{ query: getBooksQuery }] 
            }, () => {
                this.setState({ bookName: '', genre: '', authorId: ''})
            });
        }
        else {
            alert("Please enter all the details");
        }
    }
    render() {
        const { bookName, genre, authorId } = this.state;
        return(
            <div>
                <form id="add-book" onSubmit={this.submitForm}>
                    <div className="field">
                        <label>Book Name:</label>
                        <input type="text" 
                            name="bookName" 
                            value={bookName} 
                            onChange={this.handleChange}/>
                    </div>
                    <div className="field">
                        <label>Genre:</label>
                        <input type="text" 
                            name="genre" 
                            value={genre} 
                            onChange={this.handleChange}/>
                    </div>
                    <div className="field">
                        <label>Author:</label>
                        <select name="authorId" value={authorId} onChange={this.handleChange}>
                            <option>Select author</option>
                            {this.displayAuthors()}
                        </select>
                    <button>+</button>
                </div>
                </form>
            </div>
        )
    }
}

export default compose(
    graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
    graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook)