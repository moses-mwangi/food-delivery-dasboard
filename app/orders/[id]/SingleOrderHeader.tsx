import { ArrowBigLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

interface Order {
  single:
    | {
        _id: string;
        status: string;
        totalAmount: number;
        date: Date;
        payment: boolean;
        address: {
          _id: string;
          name: string;
          email: string;
          country: string;
          city: string;
          address: string;
        };
        items: [
          {
            _id: string;
            type: string;
            description: string;
            rating: number;
            price: number;
          }
        ];
      }
    | undefined;
}

export default function SingleOrderHeader({ single }: Order) {
  const router = useRouter();
  return (
    <div className="flex justify-between">
      <div className="flex gap-10 items-center">
        <h1 className="font-semibold text-3xl">
          Order-Id #${single?._id.slice(0, 3)}
        </h1>
        <span className="font-medium bg-yellow-300 px-4 py-1 rounded-full">
          {single?.status}
        </span>
      </div>
      <div>
        <p
          className="text-blue-600 flex cursor-pointer hover:text-blue-500"
          onClick={() => {
            router.push("/orders");
          }}
        >
          <ArrowBigLeft />
          Back
        </p>
      </div>
    </div>
  );
}
