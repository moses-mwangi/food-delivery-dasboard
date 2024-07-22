import clientPromise from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const client = await clientPromise;
    const db = client.db("delivery");
    const { status } = await req.json();

    const result = await db
      .collection("orders")
      .updateOne({ _id: new ObjectId(params.id) }, { $set: { status } });

    if (result.modifiedCount === 0) {
      return NextResponse.json(
        { error: "Order not found or status unchanged" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Order updated successfully" });
  } catch (error) {
    console.error("Error updating order:", error);
    return NextResponse.json(
      { error: "Failed to update order" },
      { status: 500 }
    );
  }
}
