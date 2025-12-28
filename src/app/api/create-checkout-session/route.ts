import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');

export async function POST(req: Request) {
  try {
    const { tier } = await req.json();

    if (!tier || (tier !== 'medium' && tier !== 'pro')) {
      return NextResponse.json({ error: 'Invalid tier' }, { status: 400 });
    }

    const prices = {
      medium: 499, // $4.99
      pro: 999,    // $9.99
    };

    const names = {
      medium: 'MysticAI Seeker Tier',
      pro: 'MysticAI Prophet Tier',
    };

    const origin = req.headers.get('origin') || 'http://localhost:3000';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: names[tier as keyof typeof names],
              description: tier === 'medium' ? '3 Readings/Day + Lucky Numbers' : 'Unlimited Readings + Full Analysis',
            },
            unit_amount: prices[tier as keyof typeof prices],
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${origin}/payment/success?tier=${tier}`,
      cancel_url: `${origin}/payment/cancel`,
      metadata: {
        tier: tier,
      },
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (err: any) {
    console.error('Stripe API Error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
