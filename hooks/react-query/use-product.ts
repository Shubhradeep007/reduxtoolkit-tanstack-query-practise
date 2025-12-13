import Api from "@/api/api";
import { Product } from "@/types/Authinterfaces";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


export const productList = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await Api.get("/product");
      console.log("check connection ", response);
      return response.data;
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
