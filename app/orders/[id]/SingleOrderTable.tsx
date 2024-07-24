import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LuCheck } from "react-icons/lu";

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

export default function SingleOrderTable({ single }: Order) {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-slate-800 mb-2">
        Customer Details
      </h1>

      <div className="flex flex-col gap-1 ml-2 mb-10">
        <div className="flex gap-1 items-center">
          <h1 className="font-medium flex items-center text-[15px] text-slate-700">
            <LuCheck className="text-blue-500 mr-1" /> Full Name :
          </h1>
          <span className="text-[14px] text-slate-600">
            {single?.address.name}
          </span>
        </div>
        <div className="flex gap-1 items-center">
          <h1 className="font-medium flex items-center text-[15px] text-slate-700">
            <LuCheck className="text-blue-500 mr-1" /> Email :
          </h1>
          <span className="text-[14px] text-slate-600">
            {single?.address.email}
          </span>
        </div>
        <div className="flex gap-1 items-center">
          <h1 className="font-medium flex items-center text-[15px] text-slate-700">
            <LuCheck className="text-blue-500 mr-1" /> Location :
          </h1>
          <span className="text-[14px] text-slate-600">
            {single?.address.address}
          </span>
        </div>
        <div className="flex gap-1 items-center">
          <h1 className="font-medium flex items-center text-[15px] text-slate-700">
            <LuCheck className="text-blue-500 mr-1" /> City :
          </h1>
          <span className="text-[14px] text-slate-600">
            {single?.address.city}
          </span>
        </div>
      </div>
      <div>
        <h1 className="text-2xl font-semibold text-slate-800 mb-2">
          Customer Orders
        </h1>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead className="md:block hidden">Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {single?.items.map((acc) => (
              <TableRow key={acc._id}>
                <TableCell>{acc.type}</TableCell>
                <TableCell>{acc.price}</TableCell>
                <TableCell>{acc.rating}</TableCell>
                <TableCell className="md:block hidden">
                  {acc.description}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
