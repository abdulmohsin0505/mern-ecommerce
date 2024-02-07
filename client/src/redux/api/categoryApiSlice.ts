import { apiSlice } from "./apiSlice";
import { CATEGORY_URL } from "../constants";
import { Category } from "../../types/products";

export const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCategory: builder.mutation<Category, any>({
      query: (newCategory) => ({
        url: `${CATEGORY_URL}`,
        method: "POST",
        body: newCategory,
      }),
      invalidatesTags: ["Category"],
    }),

    updateCategory: builder.mutation<Category, any>({
      query: ({ categoryId, updatedCategory }) => ({
        url: `${CATEGORY_URL}/${categoryId}`,
        method: "PUT",
        body: updatedCategory,
      }),
      invalidatesTags: ["Category"],
    }),

    deleteCategory: builder.mutation<Category, any>({
      query: (categoryId) => ({
        url: `${CATEGORY_URL}/${categoryId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),

    fetchCategories: builder.query<Category[], string>({
      query: () => `${CATEGORY_URL}/categories`,
      providesTags: ["Category"],
    }),
    fetchCategoryById: builder.query<Category, string>({
      query: (_id) => `${CATEGORY_URL}/categories/${_id}`,
      providesTags: ["Category"],
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useFetchCategoriesQuery,
  useFetchCategoryByIdQuery,
} = categoryApiSlice;
