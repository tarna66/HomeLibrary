
import React, { useState, useEffect } from 'react';
import '../style/BookList.scss';
import api from '../api';
import { Alert, Spinner } from 'react-bootstrap';
//import { Button } from 'react-bootstrap';
import { BookInfo } from '../components';
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import ToolBar from './ToolBar'

function BooksList() {
  const [books, setBooks] = useState('');
  const [amount, setAmount] = useState(0);
  //const [listView, setListview] = useState();
  const defaultImagePath = '../images/noPicBook.jpg';
  const [listView, setListview] = useState(() => {
    const saved = localStorage.getItem("listView");
    const initialValue = JSON.parse(saved);
    return initialValue;
  });


  useEffect(() => {
    localStorage.setItem('listView', listView);
  }, [listView]);

  console.log("L: " + listView)
  const changeView = () => {

    if (listView) {
      // localStorage.setItem('listView', false);
      setListview(false)
    } else {
      //  localStorage.setItem('listView', true);
      setListview(true)
    }
    console.log(listView)
  }

  useEffect(() => {
    api.getAllBooks().then(books => {
      setBooks(books.data.data);
    })

  }, []);

  function Books() {

    if (!books) {
      return (
        <div style={{ flex: 1, padding: 20 }}>
          <Alert variant="secondary">You library is empty</Alert>
        </div>
      )
    } else if (books.length === 0) {
      return (
        <div style={{ flex: 1, padding: 20 }}>
          <div className="spinnercontainer">
            <Alert variant="secondary">
              <h3>Loading, please wait...</h3>
              <Spinner animation="border" variant="secondary" />
            </Alert>
          </div>
        </div>
      )
    } else {
      const bookListItems = books.map((book, index) =>
        <BookListItem key={index} book={book} />
      );

      if (!listView) {
        setAmount(books.length);
        return (
          <div>
            <ul>
              {bookListItems}
            </ul>
          </div>
        )
      } else {

        const columns = [
          {
            Header: 'Title',
            accessor: 'props.book.title',
            filterable: true,
          },
          {
            Header: 'Authors',
            accessor: 'props.book.authors',
            filterable: true,
          },
          {
            Header: '',
            accessor: 'key',
            Cell: function (key) {
              return (
                <span>
                  <BookInfo infoBook={bookListItems[key.value].props.book} />
                </span>
              )
            },
          },

        ]

        let showTable = true
        if (!books.length) {
          showTable = false
        }
        setAmount(books.length);

        return (
          <div className="listofbooks">
            <div className="wrapper">
              {showTable && (
                <ReactTable
                  data={bookListItems}
                  columns={columns}

                  defaultPageSize={10}
                  showPageSizeOptions={true}
                  minRows={0}
                />
              )}
            </div>
          </div>
        )
      }
    }
  }


  function BookListItem(props) {
    const myBook = props.book;

 /*   function RemoveBook(props) {
      const doRemove = () => {
        api.removeBookById(props.id)
        window.location.reload()
      }
      return <Button variant="light" className="btn btn-outline-danger" onClick={doRemove}>Quick remove</Button>
    }*/

    return (
      <div className="bookitem" >
        <div className="maincontainer">
          <div className="header">
            <img className="picture" src={myBook.imagePath || defaultImagePath} alt="Not available" />
          </div>
          <div className="contentcontainer">
            <div className="textcontainer">
              <p className="name">{myBook.title}</p> <div className="buttoncontainer">
                <BookInfo infoBook={myBook} />
             {/*   <RemoveBook id={myBook._id} />*/}
              </div>
              <p className="overview">Authors: {myBook.authors}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <ToolBar amount={amount} changeView={changeView} />
      <div className="booklist" >
        <div >
          <Books />
        </div>
      </div>
    </div>
  );

}

export default BooksList;
