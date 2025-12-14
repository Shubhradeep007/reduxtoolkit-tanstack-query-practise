import Api from "@/api/api";
import { Product } from "@/types/Authinterfaces";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useProductList = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await Api.get("/product");
      console.log("check connection ", response);
      return response.data.data;
    },
  });
};

export const useProductById = (id: string) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const response = await Api.get(`/edit/product/${id}`);
      console.log("Product by ID response", response);
      return response.data.data;
    },
  });
};

export const createProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Product) => {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("price", data.price);
      formData.append("description", data.description);
      formData.append("brand", data.brand);
      if (data.image) {
        formData.append("image", data.image);
      }

      const createProductResponse = await Api.post(
        "/create/product",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Mutate Resonse", createProductResponse);
      return createProductResponse.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });
};

export const useUpdateProduct = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Product) => {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("price", data.price);
      formData.append("description", data.description);
      formData.append("brand", data.brand);
      if (data.image instanceof File) {
        formData.append("image", data.image);
      }

      const createProductResponse = await Api.post(
        `/update/product/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Mutate Resonse", createProductResponse);
      return createProductResponse.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      queryClient.invalidateQueries({
        queryKey: ["product", id],
      });
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await Api.delete(`/delete/product/${id}`);
      console.log("Delete Response", response);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });
};
