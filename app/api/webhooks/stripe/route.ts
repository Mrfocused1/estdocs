import { NextRequest, NextResponse } from "next/server";
// import Stripe from "stripe";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//   apiVersion: "2025-10-29.clover",
// });

// const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  // Temporarily disable the webhook functionality
  return NextResponse.json(
    { error: "The webhooks are currently unavailable. Please try again later." },
    { status: 503 }
  );
}

