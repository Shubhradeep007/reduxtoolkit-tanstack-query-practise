import Homepage from '@/app/home/page'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Home | Product Management Dashboard",
  description: "Welcome to the ultimate product management dashboard. Start managing your inventory today.",
};

export default function Home() {
  return (
    <>
      <Homepage />
    </>
  );
}
