import clientPromise from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
// import clientPromise from "../../../lib/mongodb";

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
