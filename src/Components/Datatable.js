import React, { useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Navbar,
  Container,
  Nav,
  Pagination,
} from "react-bootstrap";
import "./Datatable.css";

const DataTable = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [formData, setFormData] = useState({ address: "", phone: "" });
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 9;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOffirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOffirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedItem({});
    setFormData({ address: "", phone: "" });
  };

  const handleAddRow = () => {
    setShowModal(true);
  };

  const handleEditRow = (item) => {
    setSelectedItem(item);
    setFormData({ address: item.address, phone: item.phone });
    setShowModal(true);
  };

  const handleDeleteRow = (item) => {
    const updatedData = data.filter((d) => d !== item);
    setData(updatedData);
  };

  const handleSaveData = () => {
    if (selectedItem.address) {
      const updatedData = data.map((item) => {
        if (item === selectedItem) {
          return { ...item, address: formData.address, phone: formData.phone };
        }
        return item;
      });
      setData(updatedData);
    } else {
      setData([...data, { address: formData.address, phone: formData.phone }]);
    }
    handleCloseModal();
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
{/* ---------------------------------------------------------Navbar---------------------------------------------------- */}
      <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Dynamic Form</Navbar.Brand>
          <Nav className="me-auto">
            <div className="create">
              <Button variant="dark" className="create" onClick={handleAddRow}>
                Create
              </Button>
            </div>
          </Nav>
        </Container>
      </Navbar>
{/* ------------------------------------------------------------Table---------------------------------------------------- */}
      <div>
        <Table striped bordered hover variant="dark" className="table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr key={index}>
                <td>{indexOffirstItem + index + 1}</td>
                <td>{item.address}</td>
                <td>{item.phone}</td>
                <td>
                  <Button variant="primary" onClick={() => handleEditRow(item)}>
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    className="delete"
                    onClick={() => handleDeleteRow(item)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>
              {selectedItem.address ? "Edit" : "Details"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.address}
                  required
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="number"
                  value={formData.phone}
                  required
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSaveData}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
{/* ----------------------------------------------------Pagination------------------------------------------------------------- */}
      <div className="pagination">
        <Pagination size="lg">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={`pagination-button ${
                currentPage === index + 1 ? "active" : ""
              }`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </Pagination>
      </div>
    </>
  );
};

export default DataTable;
