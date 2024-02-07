import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import AdminMenu from "../../components/common/AdminMenu";
import { useNavigate, useParams } from "react-router-dom";
import {
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetProductByIdQuery,
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
// import { toast } from "react-toastify";
import { Product } from "../../types/products";
import { category } from "../../types/categories";

const initialValue = {
  brand: "",
  category: "",
  countInStock: 0,
  createdAt: "",
  description: "",
  name: "",
  numReviews: 0,
  price: 0,
  quantity: 2,
};
type initialValueType = {
  brand: string;
  category: string;
  countInStock: number;
  createdAt: string;
  description: string;
  name: string;
  price: number;
  quantity: number;
};
const UpdateProduct = () => {
  const params = useParams();

  const { data: productData } = useGetProductByIdQuery(params._id);

  const [product, setProduct] = useState<Product | initialValueType>(
    initialValue
  );
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  // hook
  const navigate = useNavigate();

  // Fetch categories using RTK Query
  const { data: categories = [] } = useFetchCategoriesQuery("");

  // Define the update product mutation
  const [updateProduct] = useUpdateProductMutation();

  // Define the delete product mutation
  const [deleteProduct] = useDeleteProductMutation();

  useEffect(() => {
    if (productData && params._id) {
      setProduct(productData);
      setImageUrl(productData.image.url);
    }
  }, [productData, params]);

  const changeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
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

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (product && image) {
        const formData: any = new FormData();
        formData.append("image", image, image.name);
        formData.append("name", product.name);
        formData.append("description", product.description);
        formData.append("price", product.price.toString());
        formData.append("category", product.category);
        formData.append("quantity", product.quantity.toString());
        formData.append("brand", product.brand);
        formData.append("countInStock", product.countInStock.toString());

        // Update product using the RTK Query mutation
        const data = await updateProduct({ productId: params._id, formData });
        console.log(data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     try {
  //       const formData = new FormData();
  //       formData.append("image", image);
  //       formData.append("name", name);
  //       formData.append("description", description);
  //       formData.append("price", price);
  //       formData.append("category", category);
  //       formData.append("quantity", quantity);
  //       formData.append("brand", brand);
  //       formData.append("countInStock", stock);

  //       // Update product using the RTK Query mutation
  //       const data = await updateProduct({ productId: params._id, formData });

  //       if (data?.error) {
  //         // toast.error(data.error, {
  //         //   position: toast.POSITION.TOP_RIGHT,
  //         //   autoClose: 2000,
  //         // });
  //       } else {
  //         // toast.success(`Product successfully updated`, {
  //         //   position: toast.POSITION.TOP_RIGHT,
  //         //   autoClose: 2000,
  //         // });
  //         navigate("/admin/allproductslist");
  //       }
  //     } catch (err) {
  //       console.log(err);
  //     //   toast.error("Product update failed. Try again.", {
  //     //     position: toast.POSITION.TOP_RIGHT,
  //     //     autoClose: 2000,
  //     //   });
  //     }
  //   };

  const handleDelete = async () => {
    try {
      let answer = window.confirm(
        "Are you sure you want to delete this product?"
      );
      if (!answer) return;

      const res = await deleteProduct(params._id);
      //   toast.success(`"${data.name}" is deleted`, {
      //     position: toast.POSITION.TOP_RIGHT,
      //     autoClose: 2000,
      //   });
      console.log(res);
      navigate("/admin/allproductslist");
    } catch (err) {
      console.log(err);
      //   toast.error("Delete failed. Try again.", {
      //     position: toast.POSITION.TOP_RIGHT,
      //     autoClose: 2000,
      //   });
    }
  };

  return (
    <>
      <div className="container  xl:mx-[9rem] sm:mx-[0]">
        <div className="flex flex-col md:flex-row">
          <AdminMenu />
          <form onSubmit={submitHandler} className="md:w-3/4 p-3">
            <div className="h-12">Update / Delete Product</div>

            {imageUrl && (
              <div className="text-center">
                <img
                  src={imageUrl}
                  alt="product"
                  className="block mx-auto w-[20%] h-[20%]"
                />
              </div>
            )}

            <div className="mb-3">
              <label className="text-white  py-2 px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11">
                {image ? image.name : "Upload image"}
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={uploadFileHandler}
                  className="text-white"
                />
              </label>
            </div>

            <div className="p-3">
              <div className="flex flex-wrap">
                <div className="one">
                  <label htmlFor="name">Name</label> <br />
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white mr-[5rem]"
                    value={product.name}
                    onChange={changeHandler}
                  />
                </div>

                <div className="two">
                  <label htmlFor="price">Price</label> <br />
                  <input
                    type="number"
                    name="price"
                    id="price"
                    className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white "
                    value={product.price}
                    onChange={changeHandler}
                  />
                </div>
              </div>

              <div className="flex flex-wrap">
                <div>
                  <label htmlFor="quantity">Quantity</label> <br />
                  <input
                    type="number"
                    name="quantity"
                    id="quantity"
                    min="1"
                    className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white mr-[5rem]"
                    value={product.quantity}
                    onChange={changeHandler}
                  />
                </div>
                <div>
                  <label htmlFor="brand">Brand</label> <br />
                  <input
                    type="text"
                    name="brand"
                    id="brand"
                    className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white "
                    value={product.brand}
                    onChange={changeHandler}
                  />
                </div>
              </div>

              <label htmlFor="Description" className="my-5">
                Description
              </label>
              <textarea
                // type="text"
                name="Description"
                id="Description"
                className="p-2 mb-3 bg-[#101011]  border rounded-lg w-[95%] text-white"
                value={product.description}
                onChange={changeHandler}
              />

              <div className="flex justify-between">
                <div>
                  <label htmlFor="countInStock">Count In Stock</label> <br />
                  <input
                    type="number"
                    id="countInStock"
                    name="countInStock"
                    className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white "
                    value={product.countInStock}
                    onChange={changeHandler}
                  />
                </div>

                <div>
                  <label htmlFor="category">Category</label> <br />
                  <select
                    name="category"
                    id="category"
                    className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white mr-[5rem]"
                    onChange={changeHandler}
                    value={product.category as string}
                  >
                    {categories?.map((c: category) => (
                      <option key={c._id} value={c._id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="">
                <button
                  type="submit"
                  className="py-2 px-6 mt-5 rounded-lg text-lg font-bold  bg-green-600 mr-6"
                >
                  Update
                </button>
                <button
                  onClick={handleDelete}
                  className="py-2 px-4 mt-5 rounded-lg text-lg font-bold  bg-pink-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateProduct;
