import AdminLinksComponent from "../../components/admin/AdminLinksComponent";
import { Row, Col } from "react-bootstrap";
import AdminChatRoomComponent from "../../components/admin/AdminChatRoomComponent";
const AdminChatsPage = () => {
  return (
    <Row className="m-5">
      <Col md={2}>
        <AdminLinksComponent />
      </Col>
      <Col md={10}>
        <AdminChatRoomComponent />
      </Col>
    </Row>
  );
};

export default AdminChatsPage;
