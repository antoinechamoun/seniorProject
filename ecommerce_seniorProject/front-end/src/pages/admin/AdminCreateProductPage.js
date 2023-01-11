import AdminCreateProductPageComponent from "./components/AdminCreateProductPageComponent";
import axios from "axios";
import {
  uploadImagesApiRequest,
  uploadImagesCloudinaryApiRequest,
} from "./utils/utils";
import { useSelector } from "react-redux";
import {
  newCategory,
  deleteCategory,
  saveAttributeToCatDoc,
} from "../../redux/actions/categoryActions";
import { useDispatch } from "react-redux";

const createProductApiRequest = async (formInputs) => {
  const { data } = await axios.post(`/api/products/admin`, { ...formInputs });
  return data;
};

const AdminCreateProductPage = () => {
  const { categories } = useSelector((state) => state.getCategories);
  const dispatch = useDispatch();
  return (
    <AdminCreateProductPageComponent
      createProductApiRequest={createProductApiRequest}
      uploadImagesApiRequest={uploadImagesApiRequest}
      uploadImagesCloudinaryApiRequest={uploadImagesCloudinaryApiRequest}
      categories={categories}
      reduxDispatch={dispatch}
      deleteCategory={deleteCategory}
      newCategory={newCategory}
      saveAttributeToCatDoc={saveAttributeToCatDoc}
    />
  );
};

export default AdminCreateProductPage;
