import Stripe from 'stripe';
import { z } from 'zod';

const paymentIntentSchema = z.object({
  amount: z.number().int().min(50, 'Minimum payment amount is 50 cents'),
  currency: z.string().min(3, 'Invalid currency code').max(3, 'Invalid currency code').default('usd'),
});

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  if (!config.stripeSecretKey || config.stripeSecretKey.startsWith('sk_test_12345')) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Stripe Secret Key is not configured. Please add your real SK to .env file',
    });
  }

  const body = await readBody(event);

  const validation = paymentIntentSchema.safeParse(body);
  if (!validation.success) {
    const errorMessages = validation.error.issues.map(issue => issue.message)
    throw createError({ statusCode: 400, statusMessage: 'Validation failed', data: { errors: errorMessages } });
  }

  const { amount, currency } = validation.data;

  const stripe = new Stripe(config.stripeSecretKey as string);

  try {
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
      statusMessage: 'Payment processing failed. Please try again.',
    });
  }
});
