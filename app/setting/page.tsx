"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import useFetchedUser from "../users/useUsers";
import { useRouter } from "next/navigation";

interface FormData {
  name: string;
  email: string;
  role: string;
}

export default function UpdatingUserRole() {
  const { sortedUser } = useFetchedUser();
  const { user } = useUser();
  const { push, refresh } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const currentUser = sortedUser?.filter(
    (el) => el.email === user?.emailAddresses[0].emailAddress
  );

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const validateUser = sortedUser?.find((el) => el.email === data.email);
    console.log(validateUser);

    try {
      if (
        user &&
        validateUser &&
        currentUser &&
        currentUser[0].role === "admin"
      ) {
        await axios.patch(
          `https://food-backend-xi.vercel.app/api/users/${validateUser._id}`,
          { role: data.role }
        );
        toast.success("You have succesfully updated user role");

        push("/users");
        reset();
      } else {
        if (!user)
          return toast.success(
            "You must signin first to be able to perfom the task"
          );

        if (!validateUser)
          return toast.success("No user has being found with that email");

        toast.success("Only admin user can perfom that task");
      }
    } catch (err) {
      toast.error("Error while updating user");
      console.error(err);
    }
  };

  return (
    <div className="bg-gray-50 px-6 pt-14 pb-16 h-svh">
      <div className="">
        <h1 className="flex justify-center font-semibold mb-5 text-3xl text-slate-600">
          Updating users role
        </h1>
        <Card className=" rounded-md px-6 py-4  md:w-[60%] mx-auto">
          <form
            className="flex flex-col justify-center"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="mb-8 flex flex-col gap-1">
              <Label className="text-[16px] text-slate-700">User Name</Label>
              <Input className="" {...register("name", { required: true })} />
              {errors.name && (
                <p className="text-red-500 text-[13px]">
                  User name is required
                </p>
              )}
            </div>
            <div className="mb-8 flex flex-col gap-1">
              <Label className="text-[16px] text-slate-700">User Email</Label>
              <Input className="" {...register("email", { required: true })} />
              {errors.email && (
                <p className="text-red-500 text-[13px]">
                  Email address is required
                </p>
              )}
            </div>
            <div className="mb-8 flex flex-col gap-1">
              <Label className="text-[16px] text-slate-700">User Role</Label>
              <Input
                className="text-slate-600"
                defaultValue="customer"
                {...register("role", { required: true })}
              />
              {errors.role && (
                <p className="text-red-500 text-[14px]">
                  User role is required
                </p>
              )}
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">Submit</Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
