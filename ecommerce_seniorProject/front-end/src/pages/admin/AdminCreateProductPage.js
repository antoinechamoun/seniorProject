import AdminCreateProductPageComponent from "./components/AdminCreateProductPageComponent";
import axios from "axios";

const createProductApiRequest = async (formInputs) => {
  const { data } = await axios.post(`/api/products/admin`, { ...formInputs });
  return data;
};

const uploadImagesApiRequest = async (images, productId) => {
  const formData = new FormData();
  Array.from(images).forEach((image) => {
    formData.append("images", image);
  });
  await axios.post(
    "/api/products/admin/upload?productId=" + productId,
    formData
  );
};

const uploadImagesCloudinaryApiRequest = (images) => {
  const url = `https://api.cloudinary.com/v1_1/dv1lk3bn7/image/upload`;
  const formData = new FormData();
  for (let i = 0; i < images.length; i++) {
    let file = images[i];
    formData.append("file", file);
    formData.append("upload_preset", "r8f8xork");
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        console.log(res);
      })
      .then((data) => {
        console.log(data);
      });
  }
};

const AdminCreateProductPage = () => {
  return (
    <AdminCreateProductPageComponent
      createProductApiRequest={createProductApiRequest}
      uploadImagesApiRequest={uploadImagesApiRequest}
      uploadImagesCloudinaryApiRequest={uploadImagesCloudinaryApiRequest}
    />
  );
};

export default AdminCreateProductPage;
