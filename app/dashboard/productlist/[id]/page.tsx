import { Metadata } from "next";
import axios from "axios";
import ProductViewById from "./product-view-client";
import { cookies } from "next/headers";

type Props = {
  params: Promise<{ id: string }>;
};

async function getProduct(id: string) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("x-access-token")?.value;

    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/edit/product/${id}`, {
      headers: {
        "x-access-token": token
      }
    });
    return response.data.data;
  } catch (error) {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [product.image],
    },
  };
}

export default async function ProductViewPage({ params }: Props) {
  // We don't strictly need to await params here if we just pass it down, 
  // but it's good practice in Next 15+ if we were using it.
  // However, the client component uses `useParams`, so we can just render it.
  // But wait, the client component expects `id` from `useParams`.
  // We can also pass initial data if we wanted to do SSR for the view page too, 
  // but for now let's just enable metadata.

  return <ProductViewById />;
}
