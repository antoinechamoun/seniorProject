import { Col, Form, Row } from "react-bootstrap";
import AdminLinksComponent from "../../components/admin/AdminLinksComponent";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const AdminAnalyticsPage = () => {
  const data = [
    {
      name: "12:00 AM",
      "2022 year": 4000,
      "2021 year": 4100,
    },
    {
      name: "12:00 AM",
      "2022 year": 4000,
      "2021 year": 4100,
    },
    {
      name: "1:00 AM",
      "2022 year": 4000,
      "2021 year": 4100,
    },
    {
      name: "2:00 AM",
      "2022 year": 4200,
      "2021 year": 4300,
    },
    {
      name: "3:00 AM",
      "2022 year": 4400,
      "2021 year": 4500,
    },
    {
      name: "4:00 AM",
      "2022 year": 4600,
      "2021 year": 4700,
    },
    {
      name: "5:00 AM",
      "2022 year": 5400,
      "2021 year": 5500,
    },
    {
      name: "6:00 AM",
      "2022 year": 5600,
      "2021 year": 5700,
    },
  ];
  return (
    <Row className="m-5">
      <Col md={2}>
        <AdminLinksComponent />
      </Col>
      <Col md={10}>
        <h1>Cumulative revenue</h1>
        <Form.Group controlId="firstDateToCompare">
          <Form.Label>Select first date</Form.Label>
          <Form.Control
            type="date"
            name="firstDateToCompare"
            placeholder="First date to compare"
          />
        </Form.Group>
        <br />
        <Form.Group controlId="secondDateToCompare" className="mb-5">
          <Form.Label>Select second date</Form.Label>
          <Form.Control
            type="date"
            name="secondDateToCompare"
            placeholder="Second date to compare"
          />
        </Form.Group>
        <ResponsiveContainer width="100%" height={500}>
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              label={{
                value: "TIME",
                offset: 50,
                position: "insideBottomRight",
              }}
              allowDuplicatedCategory={false}
              dataKey="name"
            />
            <YAxis
              label={{ value: "REVENUE $", angle: -90, position: "insideLeft" }}
            />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="2021 year"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey="2022 year" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </Col>
    </Row>
  );
};

export default AdminAnalyticsPage;
