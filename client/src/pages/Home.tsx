import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productApiSlice";
import Loader from "../components/common/Loader";
import Message from "../components/common/Message";
import Header from "../components/common/Header";
import Product from "../components/products/Product";
import { Suspense } from "react";

const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading, isError } = useGetProductsQuery({ keyword });
  return (
    <>
      {!keyword ? <Header /> : null}
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">
          {/* {isError?.data.message || isError.error} */}
          An error occured
        </Message>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <h1 className="ml-[20rem] mt-[10rem] text-[3rem]">
              Special Products
            </h1>

            <Link
              to="/shop"
              className="bg-pink-600 font-bold rounded-full py-2 px-10 mr-[18rem] mt-[10rem]"
            >
              Shop
            </Link>
          </div>

          <div>
            <div className="flex justify-center flex-wrap mt-[2rem]">
              {data &&
                data.products?.map((product) => (
                  <Suspense fallback={"Loading..."} key={product._id}>
                    <Product product={product} />
                  </Suspense>
                ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
