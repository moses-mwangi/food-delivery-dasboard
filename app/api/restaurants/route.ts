import clientPromise from "@/lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db("delivery");
    const restaurants = await db.collection("restaurants").find({}).toArray();
    return NextResponse.json(restaurants);
  } catch (e) {
    console.error(e);
    return NextResponse.error();
  }
}
