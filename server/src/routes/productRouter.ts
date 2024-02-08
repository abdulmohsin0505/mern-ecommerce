import express, { Request } from "express";
const router = express.Router();
// import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import path from "path";

// controllers
import {
  addProduct,
  updateProductDetails,
  removeProduct,
  fetchProducts,
  fetchProductById,
  fetchAllProducts,
  fetchTopProducts,
  fetchNewProducts,
  addProductReview,
} from "../controllers/productController";
import { authenticate } from "../middlewares/authMiddleware";
import { checkId } from "../middlewares/checkId";

//types
type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

const fileStorage = multer.diskStorage({
  destination: (
    request: Request,
    file: Express.Multer.File,
    callback: DestinationCallback
  ): void => {
    callback(null, path.join(__dirname, "../images"));
  },

  filename: (
    req: Request,
    file: Express.Multer.File,
    callback: FileNameCallback
  ): void => {
    // const name = Date.now() + "-" + file.originalname;
    // callback(null, name);
    const extname = path.extname(file.originalname);
    callback(null, `${file.fieldname}-${Date.now()}${extname}`);
  },
});

const upload = multer({
  storage: fileStorage,
});
router.route("/").get(fetchProducts).post(upload.single("image"), addProduct);

router.route("/allproducts").get(fetchAllProducts);
// router.route("/:id/reviews").post(authenticate, checkId, addProductReview);

router.get("/top", fetchTopProducts);
router.get("/new", fetchNewProducts);

router
  .route("/:id")
  .get(fetchProductById)
  .put(upload.single("image"), updateProductDetails)
  .delete(removeProduct);

export default router;
