import OrderDetailsPageComponent from "./components/OrderDetailsComponent";
import axios from "axios";

const getOrderDetails = async (id) => {
  const { data } = await axios.get("/api/orders/user/" + id);
  return data;
};

const markAsDelivered = async (id) => {
  const { data } = await axios.put("/api/orders/delivered/" + id);
  if (data) {
    return data;
  }
};

const AdminOrderDetailsPage = () => {
  return (
    <OrderDetailsPageComponent
      getOrderDetails={getOrderDetails}
      markAsDelivered={markAsDelivered}
    />
  );
};

export default AdminOrderDetailsPage;
