"use client";

import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();

  useEffect(() => {
    const role = user?.publicMetadata?.role;
    if (role) router.push(`/${role}`);
  }, [user, router]);

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute -top-32 -left-32 w-[400px] h-[400px] bg-blue-100 rounded-full blur-3xl opacity-50" />
      <div className="absolute -bottom-32 -right-32 w-[400px] h-[400px] bg-indigo-100 rounded-full blur-3xl opacity-50" />

      <div className="w-full max-w-md z-10">
        {/* Branding */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
            DS International
          </h1>
          <p className="text-sm text-gray-500 mt-1">Public School Portal</p>
        </div>

        {/* Card */}
        <div className="bg-white/80 backdrop-blur-xl border border-gray-200 shadow-xl rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl">
          <SignIn.Root>
            <SignIn.Step name="start" className="flex flex-col gap-5">
              <div>
                <h2 className="text-xl font-medium text-gray-800">
                  Welcome back
                </h2>
                <p className="text-sm text-gray-500">Sign in to continue</p>
              </div>

              <Clerk.GlobalError className="text-sm text-red-500" />

              {/* Username */}
              <Clerk.Field name="identifier" className="flex flex-col gap-2">
                <Clerk.Label className="text-xs font-medium text-gray-600">
                  Username
                </Clerk.Label>
                <Clerk.Input
                  type="text"
                  required
                  className="px-3 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                />
                <Clerk.FieldError className="text-xs text-red-500" />
              </Clerk.Field>

              {/* Password */}
              <Clerk.Field name="password" className="flex flex-col gap-2">
                <Clerk.Label className="text-xs font-medium text-gray-600">
                  Password
                </Clerk.Label>
                <Clerk.Input
                  type="password"
                  required
                  className="px-3 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                />
                <Clerk.FieldError className="text-xs text-red-500" />
              </Clerk.Field>

              {/* Button */}
              <SignIn.Action
                submit
                className="mt-2 w-full py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium tracking-wide shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                Sign In
              </SignIn.Action>

              {/* Footer */}
              <p className="text-xs text-center text-gray-400 mt-2">
                © {new Date().getFullYear()} DS International Public School
              </p>
            </SignIn.Step>
          </SignIn.Root>
        </div>
      </div>
    </div>
  );
}
