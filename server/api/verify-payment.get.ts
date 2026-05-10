import Stripe from 'stripe';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const query = getQuery(event);
  const paymentIntentId = query.payment_intent as string;

  if (!paymentIntentId) {
    throw createError({ statusCode: 400, statusMessage: 'Missing payment_intent parameter' });
  }

  if (!config.stripeSecretKey || config.stripeSecretKey.startsWith('sk_test_12345')) {
    throw createError({ statusCode: 400, statusMessage: 'Stripe not configured' });
  }

  const stripe = new Stripe(config.stripeSecretKey as string);

  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    return {
      status: paymentIntent.status,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency,
    };
  } catch (error: any) {
    throw createError({ statusCode: 500, statusMessage: 'Failed to verify payment' });
  }
});
