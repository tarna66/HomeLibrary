
import React, { useState } from 'react';
import api from '../api';
import '../style/BooksAdd.scss';
import { Alert, Button, Form, Col, Row } from 'react-bootstrap';


function BookAdd() {
    const [isbn, setIsbn] = useState([])
    const [title, setTitle] = useState('')
    const [authors, setAuthors] = useState([])
    const [genres, setGenres] = useState([])
    const [descriptionPath, setDescriptionPath] = useState('')
    const [imagePath, setImagePath] = useState('')
    const [topics, setTopics] = useState([])
    const [publisher, setPublisher] = useState([])
    const [publishDate, setPublishDate] = useState([])
    const [alarmVariant, setAlarmVariant] = useState('')
    const [message, setMessage] = useState('')

    function handleAddBook() {
        const payload = { isbn, title, authors, genres, descriptionPath, imagePath, topics, publisher, publishDate }
        console.log(payload)
        api.addBook(payload).then(res => {
            setIsbn("");
            setTitle("");
            setAuthors("");
            setGenres("");
            setDescriptionPath("");
            setImagePath("");
            setTopics("");
            setPublisher("");
            setPublishDate("");
            setMessage(res.data.message);
            setAlarmVariant('success')
        })
        .catch(err => {
            setMessage(err.response.data.message);
            setAlarmVariant('danger')
        })
    }

    const handleClose = () => {
        setAlarmVariant('');
        setMessage('');
    }

    const onChangeTitle = (event) => {
        const title = event.target.value;
        setTitle(title)
    };

    const onChangeAuthors = (event) => {
        const authors = event.target.value;
        setAuthors(authors)
    }

    const onChangeIsbn = (event) => {
        const isbn = event.target.value;
        setIsbn(isbn)
    }

    const onChangeGenres = (event) => {
        const genres = event.target.value;
        setGenres(genres)
    }
    const onChangeDescriptionPath = (event) => {
        const descriptionPath = event.target.value;
        setDescriptionPath(descriptionPath)
    }
    const onChangeImagePath = (event) => {
        const imagePath = event.target.value;
        setImagePath(imagePath)
    }
    const onChangeTopics = (event) => {
        const topics = event.target.value;
        setTopics(topics)
    }
    const onChangePublisher = (event) => {
        const publisher = event.target.value;
        setPublisher(publisher)
    }
    const onChangePublishDate = (event) => {
        const publishDate = event.target.value;
        setPublishDate(publishDate)
    }


    return (

        <Form className="addbook">
            <Form.Label><h3>Add book.</h3></Form.Label>
            <Alert variant={alarmVariant} onClose={() => handleClose()} dismissible hidden={!message}>
                {message}
            </Alert>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">ISBN: </Form.Label>
                <Col sm="10">
                    <Form.Control
                        type="text"
                        value={isbn}
                        onChange={onChangeIsbn}
                    />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">Title: </Form.Label>
                <Col sm="10">
                    <Form.Control
                        required
                        type="text"
                        value={title}
                        onChange={onChangeTitle}
                    />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">Authors: </Form.Label>
                <Col sm="10">
                    <Form.Control
                        type="text"
                        value={authors}
                        onChange={onChangeAuthors}
                    />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">Genres: </Form.Label>
                <Col sm="10">
                    <Form.Control
                        type="text"
                        value={genres}
                        onChange={onChangeGenres}
                    />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">Description path: </Form.Label>
                <Col sm="10">
                    <Form.Control
                        type="text"
                        value={descriptionPath}
                        onChange={onChangeDescriptionPath}
                    />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">ImagePath: </Form.Label>
                <Col sm="10">
                    <Form.Control
                        type="text"
                        value={imagePath}
                        onChange={onChangeImagePath}
                    />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">Topics: </Form.Label>
                <Col sm="10">
                    <Form.Control
                        type="text"
                        value={topics}
                        onChange={onChangeTopics}
                    />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">Publisher: </Form.Label>
                <Col sm="10">
                    <Form.Control
                        type="text"
                        value={publisher}
                        onChange={onChangePublisher}
                    />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="2">Published: </Form.Label>
                <Col sm="10">
                    <Form.Control
                        type="text"
                        value={publishDate}
                        onChange={onChangePublishDate}
                    />
                </Col>
            </Form.Group>
            <Button variant="light" className="btn btn-outline-secondary" onClick={() => handleAddBook()}>Add Book</Button>
            <Button variant="light" className="btn btn-outline-secondary buttoncancel" href={'/books/list'}>Cancel</Button>
        </Form>

    )
}


export default BookAdd