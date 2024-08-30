import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET, { apiVersion: '2024-06-20' });

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const price_id = searchParams.get('price_id');

    if (!price_id) {
        return new Response(JSON.stringify({ error: 'Price ID is required' }), { status: 400 });
    }

    try {
        const prices = await stripe.prices.list({
            expand: ['data.product'],
            limit: 100,
        });

        const product = prices.data.find(p => p.id === price_id);

        if (!product) {
            return new Response(JSON.stringify({ error: 'Product not found' }), { status: 404 });
        }

        return new Response(JSON.stringify(product), { status: 200 });
    } catch (error) {
        console.error('Error fetching product data:', error);
        return new Response(JSON.stringify({ error: 'Error fetching product data' }), { status: 500 });
    }
}
