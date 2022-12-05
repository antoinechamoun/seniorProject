import { useState } from "react";
import { Fragment } from "react";
import { Button, Form, Toast } from "react-bootstrap";

const AdminChatRoomComponent = () => {
  const [toast1, setToast1] = useState(true);
  const close1 = () => {
    setToast1(false);
  };
  return (
    <>
      <Toast show={toast1} onClose={close1} className="ms-4 mb-5">
        <Toast.Header>
          <strong className="me-auto">Chat with user</strong>
        </Toast.Header>
        <Toast.Body>
          <div style={{ maxHeight: "400px", overflow: "auto" }}>
            {Array.from({ length: 30 }).map((_, id) => {
              return (
                <Fragment key={id}>
                  <p className="bg-primary p-3 ms-4 text-light rounded-pill">
                    <b>User wrote:</b> Hello World! This is a chat message.
                  </p>
                  <p>
                    <b>Admin wrote:</b> Hello World! This is a chat message.
                  </p>
                </Fragment>
              );
            })}
          </div>
          <Form>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Write a message</Form.Label>
              <Form.Control as="textarea" rows={2} />
            </Form.Group>
            <Button variant="success" type="submit">
              Submit
            </Button>
          </Form>
        </Toast.Body>
      </Toast>
    </>
  );
};

export default AdminChatRoomComponent;
