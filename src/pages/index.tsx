import { Layout } from "@/components/Layout";
import Button from "@/components/Library/Button";
import { checkoutItems } from "@/scripts/controllers/stripeController";


export default function Home() {
  const products: Product[] = [
    {
      price: 'price_1PQXXJCg8QC3STLg4mpZrG93',
      quantity: 1
    },
    {
      price: 'price_1PQXiPCg8QC3STLgPNI2atk6',
      quantity: 4
    }
  ];

  const handleCheckout = async () => {
    await checkoutItems(products);
  };


  return (
    <Layout title="Home">
      <main>
        <Button onClick={handleCheckout} style={{ width: 'fit-content' }}>Checkout</Button>
      </main>
    </Layout>
  );
}
