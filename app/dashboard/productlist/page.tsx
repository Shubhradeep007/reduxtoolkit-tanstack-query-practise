import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import ProductList from "./product-list-client";
import { cookies } from "next/headers";
import axios from "axios";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Product List",
  description: "View and manage your complete product inventory.",
};

export default async function ProductListPage() {
  const queryClient = new QueryClient();
  const cookieStore = await cookies();
  const token = cookieStore.get("x-access-token")?.value;

  await queryClient.prefetchQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/product`, {
        headers: {
          "x-access-token": token
        }
      });
      return response.data.data;
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductList />
    </HydrationBoundary>
  );
}
