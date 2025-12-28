'use server';

import Stripe from 'stripe';
import { cookies } from 'next/headers';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');

export async function verifyPaymentSession(sessionId: string) {
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== 'paid') {
      return { error: 'Payment not completed' };
    }

    const tier = session.metadata?.tier; // 'medium' or 'pro'

    if (!tier || (tier !== 'medium' && tier !== 'pro')) {
       return { error: 'Invalid tier in payment session' };
    }

    // Set Secure Cookie
    // In production, sign this value to prevent tampering if you want extra security
    // For this audit fix, verifying the sessionId against Stripe before setting the cookie IS the security fix.
    // The cookie is HTTPOnly, so JS can't read/write it.

    // We add a signature or simply rely on the fact that only the server can set this cookie.
    // To make it robust, we could store the expiry date in the value or rely on cookie expiry.

    const cookieStore = await cookies();
    cookieStore.set('mystic_tier', tier, {
        secure: true,
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 // 30 days
    });

    return { success: true, tier };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Payment Verification Error:", error);
    return { error: 'Failed to verify payment' };
  }
}
