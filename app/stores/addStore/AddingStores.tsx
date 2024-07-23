"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface FoodItem {
  type: string;
  description: string;
  rating: number;
  price: number;
}

interface FormData {
  restName: string;
  location: string;
  deliveryPrice: number;
  image: FileList;
  food_lists: FoodItem[];
}

export default function AddingStores() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "food_lists",
  });

  const submit: SubmitHandler<FormData> = async (data) => {
    const food_List = data.food_lists.map((el) => {
      return {
        description: el.description,
        price: Number(el.price),
        rating: Number(el.rating),
        type: el.type,
      };
    });

    const dat = {
      deliveryPrice: Number(data.deliveryPrice),
      food_lists: food_List,
      location: data.location,
      restName: data.restName,
    };

    await axios.post("http://127.0.0.1:3003/api/restaurants", dat);

    toast.success("You have succesfully added new stores");
    router.push("/stores");
  };

  return (
    <div className="mt-10">
      <Card className=" w-[60%] mx-auto px-5 py-3">
        <form className="flex flex-col gap-6" onSubmit={handleSubmit(submit)}>
          <div>
            <Label>Restaurant Name</Label>
            <Input type="text" {...register("restName", { required: true })} />
            {errors.restName && (
              <p className="text-red-500">Restaurant name is required</p>
            )}
          </div>
          <div>
            <Label>Location</Label>
            <Input type="text" {...register("location", { required: true })} />
            {errors.location && (
              <p className="text-red-500">Location is required</p>
            )}
          </div>
          <div>
            <Label>Delivery Price</Label>
            <Input
              type="number"
              {...register("deliveryPrice", { required: true })}
            />
            {errors.deliveryPrice && (
              <p className="text-red-500">Delivery price is required</p>
            )}
          </div>
          <div>
            <Label>Image</Label>
            <Input type="file" {...register("image", { required: true })} />
            {errors.image && <p className="text-red-500">Image is required</p>}
          </div>

          <div>
            <h2 className="text-lg font-semibold">Food Items</h2>
            {fields.map((field, index) => (
              <div key={field.id} className="flex gap-4 items-center">
                <div>
                  <Label>Type</Label>
                  <Input
                    type="text"
                    {...register(`food_lists.${index}.type`, {
                      required: true,
                    })}
                  />
                </div>

                <div>
                  <Label>Description</Label>
                  <Input
                    type="text"
                    {...register(`food_lists.${index}.description`, {
                      required: true,
                    })}
                  />
                </div>
                <div>
                  <Label>Rating</Label>
                  <Input
                    type="number"
                    step="0.1"
                    {...register(`food_lists.${index}.rating`, {
                      required: true,
                      min: 0,
                      max: 5,
                    })}
                  />
                </div>
                <div>
                  <Label>Price</Label>
                  <Input
                    type="number"
                    step="0.01"
                    {...register(`food_lists.${index}.price`, {
                      required: true,
                    })}
                  />
                </div>
                {/* <div></div> */}
                <Button
                  className="bg-blue-600/85 hover:bg-blue-700 mt-6"
                  type="button"
                  onClick={() => remove(index)}
                >
                  Remove
                </Button>
              </div>
            ))}
            <Button
              className="bg-blue-600/85 hover:bg-blue-700 mt-3"
              type="button"
              onClick={() =>
                append({
                  type: "",
                  description: "",
                  rating: 0,
                  price: 0,
                })
              }
            >
              Add Food Item
            </Button>
          </div>

          <Button type="submit" className="bg-blue-600/85 hover:bg-blue-700">
            Submit
          </Button>
        </form>
      </Card>
    </div>
  );
}