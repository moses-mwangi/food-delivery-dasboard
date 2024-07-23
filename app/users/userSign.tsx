import { useAuth, UserButton, useUser } from "@clerk/nextjs";
import axios from "axios";
import Link from "next/link";
import React, { useEffect } from "react";

export default function UserSignPage() {
  const { isSignedIn, user } = useUser();
  const { userId, getToken } = useAuth();
  const isAuth = !!userId;

  useEffect(() => {
    setTimeout(() => {
      if (isSignedIn && user && user.emailAddresses[0].emailAddress) {
        const postUserData = async () => {
          const token = await getToken();
          try {
            await axios.post(
              "/api/proxyUser",
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
  }, [isSignedIn, user, getToken]);

  return (
    <div>
      <div className="flex gap-10">
        {!isAuth ? (
          <Link
            className="font-medium text-slate-600/85 text-[14px] border-solid border border-input rounded-full px-3 py-[6px] hover:text-orange-600 transition-all duration-150"
            href="/sign-up"
          >
            Sign Up
          </Link>
        ) : (
          <div className="flex gap-2 items-center">
            <UserButton afterSignOutUrl="/" />
            {/* <p>{user?.emailAddresses[0].emailAddress}</p> */}
            <p>{user?.firstName}</p>
          </div>
        )}
      </div>
    </div>
  );
}