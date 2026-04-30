import Stripe from 'stripe';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  // Handle missing configuration gracefully
  if (!config.stripeSecretKey || config.stripeSecretKey.startsWith('sk_test_12345')) {
    // If the key is just the placeholder, bypass creation to avoid 500 error on client.
    // Instead, throw a clear instruction.
    throw createError({
      statusCode: 400,
      statusMessage: "Stripe Secret Key is not configured. Please add your real SK to .env file",
    });
  }

  const stripe = new Stripe(config.stripeSecretKey as string);

  try {
    const body = await readBody(event);
    const { amount, currency = 'usd' } = body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      automatic_payment_methods: { enabled: true },
    });

    return {
      clientSecret: paymentIntent.client_secret,
    };
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message,
    });
  }
});
