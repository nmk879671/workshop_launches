import React from "react";
import { Modal, Spinner } from "react-bootstrap";

export const LoadingModal = ({ showLoading }) => {
  return (
    <Modal size="sm" centered show={showLoading}>
      <Modal.Body className="text-center">
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Modal.Body>
    </Modal>
  );
};
