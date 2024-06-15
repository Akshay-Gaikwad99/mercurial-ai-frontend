import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

function DisclaimerPopUp() {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      const disclaimerSeen = localStorage.getItem("disclaimerSeen");

      if (!token && !disclaimerSeen) {
        setShowPopup(true);
      }
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem("disclaimerSeen", "true");
    setShowPopup(false);
  };

  return (
    <>
      <Modal
        show={showPopup}
        onHide={handleClose}
        backdropClassName="custom-backdrop-1"
      >
        <Modal.Header closeButton>
          <Modal.Title>Welcome to CarePilot</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            CarePilot by Mercurial AI is intended to complement, not replace,
            the advice and care provided by your healthcare professionals.
            Always consult with a qualified medical practitioner before making
            any decisions related to your health or treatment.
          </p>
          <p>
            <strong>Disclaimer:</strong> Download CarePilot today and embark on
            your breast cancer journey with confidence and resilience! Your
            well-being is our priority.
          </p>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default DisclaimerPopUp;
