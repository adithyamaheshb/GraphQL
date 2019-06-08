import React from 'react';
import { graphql } from 'react-apollo';
import { getBookQuery } from './../queries/queries'

class BookDetails extends React.Component{
    displayBookDetails() {
        const { book } = this.props.data;
        if(book) {
            return(
                <div>
                    <h2>{book.name}</h2>
                    <p>{book.genre}</p>
                    <p>{book.author.name}</p>
                    <p>All books by {book.author.name}</p>
                    <ul className="other-books">
                        {book.author.books.map((b) => {
                            return (<li key={b.id}>{b.name}</li>)
                        })}
                    </ul>
                </div>
            )
        }
        else{
            return <div>No book selected</div>
        }
    }
  render() {
    return (
      <div id="book-details">
        {this.displayBookDetails()}  
      </div>
    )
  };
}

export default graphql(getBookQuery, {
    options: (props) => {
        return {
            variables: {
                id: props.selectedBook
            }
        }
    }
})(BookDetails)