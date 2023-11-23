
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import '../style/FinnaBook.scss';
import api from '../api'
import { Alert, Button, FormControl, Form, InputGroup, Spinner } from 'react-bootstrap';

const config = require('../utils/config');
const defaultImagePath = '../images/noPicBook.jpg';
function FinnaBook() {

  const [finnaIsbn, setFinnaIsbn] = useState('');
  const [finnaBooks, setFinnaBooks] = useState([]);
  const [success, setSuccess] = useState();
  const [alarmVariant, setAlarmVariant] = useState('');
  const [message, setMessage] = useState('');
  let selection = 0;

  useEffect(() => {
    axios
      .get(config.FINNA_PREFIX + finnaIsbn + config.FINNA_SUFFIX_RAWDATA_BOOKS)
      .then(response => {
        setSuccess();
        setFinnaBooks(response.data.records)
      })

  }, [finnaIsbn]);


  function FinnaBooksList() {

    if (!finnaBooks) {
      return (
        <div style={{ flex: 1, padding: 20 }}>
          <div style={{ flex: 1, padding: 20 }}>
            <Alert variant="secondary">Nothing found</Alert>
          </div>
        </div>
      )
    } else if (finnaBooks.length === 0) {
      return (
        <div className="alertContainer">
          <div className="spinnercontainer">
            <Alert variant="secondary">
              <h3>Loading, please wait.</h3>
              <Spinner animation="border" variant="secondary" />
            </Alert>
          </div>
        </div>
      )
    } else {

      const finnaBookItems = finnaBooks.map((finnaBook, index) =>
        <FinnaBookItem key={index} finnaBook={finnaBook} selected={selection++} />
      );
      return (
        <div>
          <ul>
            {finnaBookItems}
          </ul>
        </div>
      )
    }
  }

  function SeachBar() {
    const finnaForm = useRef(null);
    const handleClickEvent = () => {
      const form = finnaForm.current;
      setFinnaIsbn(`${form['finna'].value}`)
      setFinnaBooks([]);
    }
    return (
      <Form ref={finnaForm} className="finnaform">
        <InputGroup className="mb-3">
          <FormControl
            autoFocus={true}
            placeholder="Search..."
            label={'finna'}
            name={'finna'}
          />
          <Button type="submit" variant="light" className="btn btn-outline-secondary" onClick={() => handleClickEvent()}> Search </Button>
        </InputGroup>
      </Form>
    )
  }

  function FinnaBookItem(props) {

    const finnaBook = props.finnaBook.rawData
    //get genres
    var genres = "";
    if (finnaBook !== undefined && finnaBook.genre !== undefined) {
      for (var i = 0; i < finnaBook.genre.length; i++) {
        genres += finnaBook.genre[i].replace(/,/g, "") + ", ";
      }
      genres = genres.slice(0, -2)

    }

    //get authors
    var authors = "";
    if (finnaBook !== undefined && finnaBook.author_facet !== undefined) {
      for (var k = 0; k < finnaBook.author_facet.length; k++) {
        authors += finnaBook.author_facet[k].replace(/,/g, "") + ", ";
      }
      authors = authors.slice(0, -2)

    }

    //get topics
    var topics = "";
    if (finnaBook !== undefined && finnaBook.topic !== undefined) {
      for (var t = 0; t < finnaBook.topic.length; t++) {
        topics += finnaBook.topic[t].replace(/,/g, "") + ", ";
      }
      topics = topics.slice(0, -2);
    }

    //get image path
    var imagePath = "";
    if (finnaBook.url) {
      imagePath = finnaBook.url[0];
    }

    //get description path
    var descriptionPath = "";
    if (finnaBook.url) {
      descriptionPath = finnaBook.url[1];
    }
    const selected = props.selected;
    const isbn = finnaBook.isbn;
    const title = finnaBook.title;
    const publisher = finnaBook.publisher;
    const publishDate = finnaBook.publishDate;

    // Adds selected book to database
    function handleAddBook(props) {

      const payload = { isbn, title, authors, genres, descriptionPath, imagePath, topics, publisher, publishDate }
      api.addBook(payload).then(res => {
        setSuccess(props)
        setMessage(res.data.message)
        setAlarmVariant('success')
      })
        .catch(err => {
          setMessage(err.response.data.message);
          setAlarmVariant('danger')
        })
    }

    return (

      <div className="finnaitem" >
        <div className="header">
          <Button variant="" className="btn btn-outline-secondary addbutton" onClick={() => handleAddBook(selected)}>Add Book</Button>
          <p className="name">{finnaBook.title}</p>
        </div>
        <div className="container">
          <img className="picture" src={imagePath || defaultImagePath} alt="No available" />
          <div className="textcontainer">
            <p className="overview"><label>ISBN:</label>{isbn}</p>
            <p className="overview"><label>Authors:</label>{authors}</p>
            <object className="description" data={descriptionPath}   > </object>
            <p className="overview"><label>Topics:</label>{topics}</p>
            <p className="overview"><label>Genres:</label>{genres}</p>
            <p className="overview"><label>Publisher:</label>{publisher}</p>
            <p className="overview"><label>Published:</label>{publishDate}</p>
          </div>
        </div>
        <Alert variant={alarmVariant} onClose={() => setSuccess()} dismissible hidden={!(selected === success)}>
          {message}
        </Alert>
      </div>
    )
  }


  return (
    <div className="finnabook">
      <SeachBar />
      <FinnaBooksList />
    </div>
  );
}

export default FinnaBook;
