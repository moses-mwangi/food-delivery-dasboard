import { useAuth, UserButton, useUser } from "@clerk/nextjs";
import axios from "axios";
import Link from "next/link";
import React, { useEffect } from "react";
import useFetchedUser from "./useUsers";

export default function UserSignPage() {
  const { isSignedIn, user } = useUser();
  const { userId, getToken } = useAuth();
  const isAuth = !!userId;

  const { sortedUser } = useFetchedUser();

  const checkingUser = sortedUser?.find(
    (el) => el.email === user?.emailAddresses[0].emailAddress
  );

  useEffect(() => {
    setTimeout(() => {
      if (isSignedIn && user && !checkingUser) {
        const postUserData = async () => {
          const token = await getToken();
          try {
            await axios.post(
              "https://food-backend-xi.vercel.app/api/users/signup",
              {
                name: user.firstName + " " + user.lastName,
                email: user.emailAddresses[0].emailAddress,
                password: user.id,
                passwordConfirm: user.id,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
          } catch (error) {
            console.error("Error posting user data:", error);
          }
        };

        postUserData();
      }
    }, 3000);
  }, [isSignedIn, user, getToken, checkingUser]);

  return (
    <div>
      {!isAuth ? (
        <Link
          className="font-medium text-slate-600/85 text-[14px] border-solid border border-input rounded-full px-2 py-[6px] hover:text-orange-600 transition-all duration-150"
          href="/sign-up"
        >
          Sign Up
        </Link>
      ) : (
        <div className="flex gap-2 items-center">
          <UserButton afterSignOutUrl="/" />
          <p className="md:block hidden">{user?.firstName}</p>
        </div>
      )}
    </div>
  );
}
