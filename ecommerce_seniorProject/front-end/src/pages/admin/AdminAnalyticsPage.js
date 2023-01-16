import AdminAnalyticsPageComponent from "./components/AnalyticsPageComponent";
import axios from "axios";
import socketIOClient from "socket.io-client";

const fetchOrdersForADate = async (DateToCompare) => {
  const { data } = await axios.get("/api/orders/analysis/" + DateToCompare);
  return data;
};

const AdminAnalyticsPage = () => {
  return (
    <AdminAnalyticsPageComponent
      fetchOrdersForADate={fetchOrdersForADate}
      socketIOClient={socketIOClient}
    />
  );
};

export default AdminAnalyticsPage;
