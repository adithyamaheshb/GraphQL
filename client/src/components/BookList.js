import React from 'react';
import { graphql } from 'react-apollo';
import { getBooksQuery } from './../queries/queries'

//component
import BookDetails from './BookDetails';

class BookList extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      selectedBook: null
    }
  }
  displayData() {
    var data = this.props.data;
    if(!data.loading && data.networkStatus === 7) {
      return data.books.map((book, b) => {
        return (
          <li key={Math.random()} onClick={() => this.setState({ selectedBook: book.id })}>{book.name}</li>
        )
      })
    }
    else {
      return <div>Loading Books.....</div>
    }
  }
  render() {
    return (
      <div>
        <ul id="book-list">
            {this.displayData()}
        </ul>
        <BookDetails selectedBook={this.state.selectedBook}/>
      </div>
    )
  };
}

export default graphql(getBooksQuery)(BookList);
