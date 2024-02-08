import { Request, Response } from "express";
import Product from "../models/productsSchema";
import { v2 as cloudinary } from "cloudinary";

interface customeReqType extends Request {
  user: {
    _id: string;
    username: string;
  };
}

const addProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, price, category, quantity, brand, image } =
      req.body;
    console.log(req);
    // Validation
    switch (true) {
      case !name:
        return res.status(400).json({ error: "Name is required" });
      case !brand:
        return res.status(400).json({ error: "Brand is required" });
      case !description:
        return res.status(400).json({ error: "Description is required" });
      case !price:
        return res.status(400).json({ error: "Price is required" });
      case !category:
        return res.status(400).json({ error: "Category is required" });
      case !quantity:
        return res.status(400).json({ error: "Quantity is required" });
    }
    if (!req.file) {
      return res.status(400).json({ error: "Image is required" });
    }
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "products",
    });
    console.log(result);
    req.body.image = {
      public_id: result.public_id,
      url: result.secure_url,
    };
    const product = new Product({ ...req.body });
    await product.save();
    res.json(product);
  } catch (error: any) {
    console.error(error);
    res.status(400).json(error.message);
  }
};

const updateProductDetails = async (req: Request, res: Response) => {
  try {
    const { name, description, price, category, quantity, brand } = req.body;

    // Validation
    switch (true) {
      case !name:
        return res.json({ error: "Name is required" });
      case !brand:
        return res.json({ error: "Brand is required" });
      case !description:
        return res.json({ error: "Description is required" });
      case !price:
        return res.json({ error: "Price is required" });
      case !category:
        return res.json({ error: "Category is required" });
      case !quantity:
        return res.json({ error: "Quantity is required" });
    }
    const product: any = await Product.findById(req.params.id);
    console.log("file", req.file);
    if (req.file !== undefined) {
      await cloudinary.uploader.destroy(product.image.public_id);
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "products",
      });
      console.log(result);
      req.body.image = {
        public_id: result.public_id,
        url: result.secure_url,
      };
    } else {
      req.body.image = product.image;
    }

    const newProduct: any = await Product.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );

    await newProduct.save();

    res.json(newProduct);
  } catch (error: any) {
    console.error(error);
    res.status(400).json(error.message);
  }
};

const removeProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    res.json(product);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

const fetchProducts = async (req: Request, res: Response) => {
  try {
    const pageSize = 6;

    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};

    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword }).limit(pageSize);

    res.json({
      products,
      page: 1,
      pages: Math.ceil(count / pageSize),
      hasMore: false,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

const fetchProductById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      return res.json(product);
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  } catch (error: any) {
    console.error(error);
    res.status(404).json({ error: "Product not found" });
  }
};

const fetchAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find({})
      .populate("category")
      .limit(12)
      .sort({ createAt: -1 });

    res.json(products);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

const addProductReview = async (req: customeReqType, res: Response) => {
  try {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);

    if (product) {
      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user?._id.toString()
      );

      if (alreadyReviewed) {
        res.status(400);
        throw new Error("Product already reviewed");
      }

      const review = {
        name: req.user?.username,
        rating: Number(rating),
        comment,
        user: req.user?._id,
      };

      product.reviews.push(review);

      product.numReviews = product.reviews.length;

      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;

      await product.save();
      res.status(201).json({ message: "Review added" });
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  } catch (error: any) {
    console.error(error);
    res.status(400).json(error.message);
  }
};

const fetchTopProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find({}).sort({ rating: -1 }).limit(4);
    res.json(products);
  } catch (error: any) {
    console.error(error);
    res.status(400).json(error.message);
  }
};

const fetchNewProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find().sort({ _id: -1 }).limit(5);
    res.json(products);
  } catch (error: any) {
    console.error(error);
    res.status(400).json(error.message);
  }
};

// const filterProducts = async (req: Request, res: Response) => {
//   try {
//     const { checked, radio } = req.body;

//     let args = {};
//     if (checked.length > 0) args.category = checked;
//     if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };

//     const products = await Product.find(args);
//     res.json(products);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Server Error" });
//   }
// };

export {
  addProduct,
  updateProductDetails,
  removeProduct,
  fetchProducts,
  fetchProductById,
  fetchAllProducts,
  addProductReview,
  fetchTopProducts,
  fetchNewProducts,
  // filterProducts,
};
