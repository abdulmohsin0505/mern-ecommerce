import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { useCreateProductMutation } from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
// import { toast } from "react-toastify";
import AdminMenu from "../../components/common/AdminMenu";
import { NewProduct, Product } from "../../types/products";

const ProductList = () => {
  const [product, setProduct] = useState<NewProduct>({
    name: "",
    description: "",
    price: 0,
    quantity: 0,
    brand: "",
    countInStock: 0,
  });
  const [category, setCategory] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<null | string>(null);

  const { data: categories } = useFetchCategoriesQuery("");
  const [createProduct, { isLoading }] = useCreateProductMutation();
  const { name, description, price, quantity, brand, countInStock } = product;

  const changeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const uploadFileHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];

    if (file) {
      //set image
      setImage(file);
      // Display the uploaded image
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (product && image && category) {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("price", price.toString());
        formData.append("quantity", quantity.toString());
        formData.append("brand", brand);
        formData.append("countInStock", countInStock.toString());
        formData.append("image", image, image.name); // Assuming image is a Blob type
        formData.append("category", category);
        const res = await createProduct(formData).unwrap();

        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container xl:mx-[9rem] sm:mx-[0]">
      <div className="flex flex-col md:flex-row">
        <AdminMenu />
        <form onSubmit={submitHandler} className="md:w-3/4 p-3">
          <div className="h-12">Create Product</div>

          {imageUrl && (
            <div className="text-center">
              <img
                src={imageUrl}
                alt="product"
                className="block mx-auto max-h-[200px]"
              />
            </div>
          )}

          <div className="mb-3">
            <label className="border text-white px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11">
              {image ? image.name : "Upload Image"}
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={uploadFileHandler}
                className={!image ? "hidden" : "text-white"}
              />
            </label>
          </div>

          <div className="p-3">
            <div className="flex flex-row sm:flex-wrap lg:flex-nowrap">
              <div className="one">
                <label htmlFor="name">Name</label> <br />
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="p-2 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
                  value={name}
                  onChange={changeHandler}
                />
              </div>
              <div className="two md:ml-10 ">
                <label htmlFor="price">Price</label> <br />
                <input
                  type="number"
                  name="price"
                  id="price"
                  className="p-2 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
                  value={price}
                  onChange={changeHandler}
                />
              </div>
            </div>
            <div className="flex flex-row sm:flex-wrap lg:flex-nowrap">
              <div className="one">
                <label htmlFor="quantity">Quantity</label> <br />
                <input
                  type="number"
                  name="quantity"
                  id="quantity"
                  className="p-2 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
                  value={quantity}
                  onChange={changeHandler}
                />
              </div>
              <div className="two md:ml-10 ">
                <label htmlFor="brand">Brand</label> <br />
                <input
                  type="text"
                  name="brand"
                  id="brand"
                  className="p-2 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
                  value={brand}
                  onChange={changeHandler}
                />
              </div>
            </div>

            <label htmlFor="description" className="my-5">
              Description
            </label>
            <textarea
              //   type="text"
              name="description"
              id="description"
              className="p-2 mb-3 bg-[#101011] border rounded-lg w-[95%] text-white"
              value={description}
              onChange={changeHandler}
            ></textarea>

            <div className="flex flex-row sm:flex-wrap lg:flex-nowrap">
              <div>
                <label htmlFor="stock">Count In Stock</label> <br />
                <input
                  name="countInStock"
                  id="stock"
                  type="text"
                  className="p-2 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
                  value={countInStock}
                  onChange={changeHandler}
                />
              </div>

              <div className="md:ml-10">
                <label htmlFor="category">Category</label> <br />
                <select
                  name="category"
                  id="category"
                  // placeholder="Choose Category"
                  // defaultValue={category}
                  className="p-2 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option>Choose Category</option>
                  {categories?.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="py-2 px-4 mt-5 rounded-lg text-lg font-bold bg-pink-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductList;
