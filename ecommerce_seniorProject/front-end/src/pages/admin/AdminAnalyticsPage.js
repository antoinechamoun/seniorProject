import AdminAnalyticsPageComponent from "./components/AnalyticsPageComponent";
import axios from "axios";
import socketIOClient from "socket.io-client";

const fetchOrdersForFirstDate = async (DateToCompare) => {
  const { data } = await axios.get("/api/orders/analysis/" + DateToCompare);
  return data;
};
const fetchOrdersForSecondDate = async (DateToCompare) => {
  const { data } = await axios.get("/api/orders/analysis/" + DateToCompare);
  return data;
};

const AdminAnalyticsPage = () => {
  return (
    <AdminAnalyticsPageComponent
      fetchOrdersForFirstDate={fetchOrdersForFirstDate}
      fetchOrdersForSecondDate={fetchOrdersForSecondDate}
      socketIOClient={socketIOClient}
    />
  );
};

export default AdminAnalyticsPage;
