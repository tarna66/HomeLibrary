import React, { useState } from 'react';
import '../style/BookList.scss';
import api from '../api';
import { Button, Modal, Offcanvas } from 'react-bootstrap';
import ModalHeader from 'react-bootstrap/esm/ModalHeader';

function BookInfoSlider({ infoBook, name, ...props }) {
  const defaultImagePath = '../images/noPicBook.jpg';
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  function EditBook() {
    const updateThisBook = event => {
      event.preventDefault()
      window.location.href = `/books/update/${infoBook._id}`
    }
    return <Button variant="light" className="btn btn-outline-secondary" onClick={updateThisBook}>Edit</Button>
  }

  function CloseSlider() {
    return <Button variant="light" className="btn btn-outline-secondary buttoncancel" onClick={handleClose}>Close</Button>
  }

  function RemoveBook() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const doRemove = () => {
      api.removeBookById(infoBook._id)
     window.location.reload()
  
    }
    return (
      <>
        <Button variant="light" className="btn btn-outline-secondary buttoncancel" onClick={handleShow}>Remove</Button>
        <Modal show={show} onHide={handleClose} className="confirmDeleteModal">
          <ModalHeader> Do you want to remove this book from collection?</ModalHeader>
          <Modal.Body >  
            <label className="delbook"><strong> {infoBook.title}</strong></label>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="light" className="btn btn-outline-secondary" onClick={doRemove}>Yes, remove.</Button>
            <Button variant="light" className="btn btn-outline-secondary" onClick={handleClose}>Cancel</Button>
          </Modal.Footer>

        </Modal>
      </>
    );

  }

  return (
    <>
      <Button variant="light" className="btn btn-outline-secondary" onClick={handleShow}>
        {name}
      </Button>
      <Offcanvas show={show} onHide={handleClose} {...props} className="infoCanvas">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{infoBook.title}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="container">
            <img className="picture" src={infoBook.imagePath || defaultImagePath} alt="No available" />
            <div className="infocontainer">
              <label>Authors: </label>
              <p className="overview">{infoBook.authors}</p>
              <label>Description</label>
              <div className="description" >
              <object className="descriptionObject" data={infoBook.descriptionPath}> </object>
              </div>
              <label>Topics: </label>
              <p className="overview">{infoBook.topics}</p>
              <label>Genres:</label>
              <p className="overview">{infoBook.genres}</p>
              <label>Publisher:</label>
              <p className="overview">{infoBook.publisher}</p>
              <label>Published:</label>
              <p className="overview">{infoBook.publishDate}</p>
              <label>ISBN:</label>
              <p className="overview">{infoBook.isbn}</p>
            </div>
          </div>
        </Offcanvas.Body>
        <div className="offcanvas-footer">
          <EditBook id={infoBook._id} />
          <RemoveBook id={infoBook._id} delBook={infoBook} />
          <CloseSlider />
        </div>
      </Offcanvas>
    </>
  );
}

function BookInfo(props) {
  return (
    <BookInfoSlider placement={'end'} name={'More info'} infoBook={props.infoBook} />
  );
}

export default BookInfo;