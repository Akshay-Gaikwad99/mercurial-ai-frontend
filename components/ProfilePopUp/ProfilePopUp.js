import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

function ProfilePopUp({ open, handleClose, userDetails, setOpenModal }) {
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: userDetails?.firstName || "",
    lastName: userDetails?.lastName || "",
    email: userDetails?.email || "",
    dob: userDetails?.dob
      ? new Date(userDetails.dob).toISOString().split("T")[0]
      : "",
    oncologistsHospital: userDetails?.oncologistsHospital || "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEdit = () => {
    setFormData({
      firstName: userDetails?.firstName || "",
      lastName: userDetails?.lastName || "",
      email: userDetails?.email || "",
      dob: userDetails?.dob
        ? new Date(userDetails.dob).toISOString().split("T")[0]
        : "",
      oncologistsHospital: userDetails?.oncologistsHospital || "",
    });
    setEditing(true);
  };

  const handleSave = () => {
    fetch(
      `${process.env.MERCURIAL_BACKEND_API}/updateUser/${userDetails._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update user data");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setEditing(false);
        setOpenModal(false);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error updating user data:", error);
      });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-12 p-0">
          <Modal
            show={open}
            onHide={handleClose}
            className="profile-modal fade  bd-example-modal-xl"
            backdropClassName="custom-backdrop-1"
          >
            <Modal.Header closeButton className="modal-header">
              <Modal.Title className="modal-title">
                {userDetails?.firstName &&
                  userDetails?.firstName.charAt(0).toUpperCase() +
                    userDetails.firstName.slice(1)}{" "}
                {userDetails?.lastName &&
                  userDetails?.lastName.charAt(0).toUpperCase() +
                    userDetails.lastName.slice(1)}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-body custom-modal" style={{padding:'20px 0'}}>
              <div style={{}} className="container-fluid">
                {editing ? (
                  <>
                    <div className="row">
                      <div className="col-lg-12">
                        <Form>
                          <Form.Group
                            controlId="formFirstName"
                            style={{
                              paddingTop: "20px",
                              paddingBottom: "10px",
                            }}
                          >
                            <Form.Label className="form-lable-form">
                              First Name
                            </Form.Label>
                            <Form.Control
                              className="form-control-form"
                              type="text"
                              name="firstName"
                              value={formData.firstName}
                              onChange={handleInputChange}
                            />
                          </Form.Group>
                          <Form.Group
                            controlId="formLastName"
                            style={{
                              paddingTop: "10px",
                              paddingBottom: "10px",
                            }}
                          >
                            <Form.Label className="form-lable-form">
                              Last Name
                            </Form.Label>
                            <Form.Control
                              className="form-control-form"
                              type="text"
                              name="lastName"
                              value={formData.lastName}
                              onChange={handleInputChange}
                            />
                          </Form.Group>
                          <Form.Group
                            controlId="formEmail"
                            style={{
                              paddingTop: "10px",
                              paddingBottom: "10px",
                            }}
                          >
                            <Form.Label className="form-lable-form">
                              Email
                            </Form.Label>
                            <Form.Control
                              className="form-control-form"
                              type="email"
                              name="email"
                              value={formData.email}
                              disabled
                              onChange={handleInputChange}
                            />
                          </Form.Group>
                          <Form.Group
                            controlId="formDOB"
                            style={{
                              paddingTop: "10px",
                              paddingBottom: "10px",
                            }}
                          >
                            <Form.Label className="form-lable-form">
                              Date of Birth
                            </Form.Label>
                            <Form.Control
                              className="form-control-form"
                              type="date"
                              name="dob"
                              value={formData.dob}
                              onChange={handleInputChange}
                            />
                          </Form.Group>
                          <Form.Group
                            controlId="formHospital"
                            style={{
                              paddingTop: "10px",
                              paddingBottom: "10px",
                            }}
                          >
                            <Form.Label className="form-lable-form">
                              Hospital
                            </Form.Label>
                            <Form.Control
                              className="form-control-form"
                              type="text"
                              name="oncologistsHospital"
                              value={formData.oncologistsHospital}
                              onChange={handleInputChange}
                            />
                          </Form.Group>
                        </Form>
                      </div>
                    </div>
                  </>
                ) : (
                  <div
                    style={{ display: "flex", justifyContent: "flex-start" }}
                  >
                    <div
                      style={{
                        height: "80px",
                        width: "80px",
                        background: "#ffdbac",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "50%",
                      }}
                    >
                      <img
                        src={
                          userDetails?.image ||
                          "https://cdn-icons-png.flaticon.com/512/6596/6596121.png"
                        }
                        alt="User"
                        className="profile-image"
                        style={{
                          margin: "auto",
                        }}
                      />
                    </div>
                    <div style={{ padding: "0px 0px", marginLeft: "10px" }}>
                      <p className="profile-info">
                        <span className="info-label">First Name: </span>
                        {userDetails?.firstName &&
                          userDetails?.firstName.charAt(0).toUpperCase() +
                            userDetails.firstName.slice(1)}{" "}
                      </p>
                      <p className="profile-info">
                        <span className="info-label">Last Name: </span>
                        {userDetails?.lastName &&
                          userDetails?.lastName.charAt(0).toUpperCase() +
                            userDetails.lastName.slice(1)}
                      </p>
                      <p className="profile-info">
                        <span className="info-label">Email:</span>{" "}
                        {userDetails?.email}
                      </p>
                      <p className="profile-info">
                        <span className="info-label">Date of Birth:</span>{" "}
                        {userDetails?.dob &&
                          new Date(userDetails.dob).toLocaleDateString()}
                      </p>
                      <p className="profile-info">
                        <span className="info-label">Hospital:</span>{" "}
                        {userDetails?.oncologistsHospital}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </Modal.Body>
            <Modal.Footer
              style={{
                display: "flex",
                justifyContent: "center",
                paddingBottom: "50px",
              }}
            >
              {editing ? (
                <>
                  <Button
                    variant="danger"
                    onClick={() => setEditing(false)}
                    className="profile-button"
                    style={{
                      flex: 1,
                      marginRight: "5px",
                      backgroundColor: "rgb(231, 136, 35)",
                      border: "none",
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="success"
                    onClick={handleSave}
                    className="profile-button"
                    style={{
                      flex: 1,
                      marginLeft: "5px",
                      backgroundColor: "#214493",
                      border: "none",
                    }}
                  >
                    Save
                  </Button>
                </>
              ) : (
                <Button
                  variant="secondary"
                  onClick={handleEdit}
                  className="profile-button"
                  style={{
                    background: "#e78823",
                    border: "none",
                    width: "100%",
                  }}
                >
                  Edit Profile
                </Button>
              )}
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default ProfilePopUp;
