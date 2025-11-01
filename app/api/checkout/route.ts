import { NextRequest, NextResponse } from "next/server";
// import Stripe from "stripe";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//   apiVersion: "2025-10-29.clover",
// });

export async function POST(req: NextRequest) {
  // Temporarily disable the checkout functionality
  return NextResponse.json(
    { error: "The checkout is currently unavailable. Please try again later." },
    { status: 503 }
  );
}

