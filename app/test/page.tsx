"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Order } from "../types";

export default function TestingPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  // useEffect(() => {
  async function getOrders() {
    const res = await axios.get("http://127.0.0.1:3003/api/restaurants");

    const data = res.data.data.data;

    console.log(data);

    setOrders(data);
  }

  // getOrders();
  // }, []);

  return (
    <div>
      TestingPage
      <p
        onClick={() => {
          getOrders();
        }}
      >
        click
      </p>
      <h1>{orders.length}</h1>
    </div>
  );
}
