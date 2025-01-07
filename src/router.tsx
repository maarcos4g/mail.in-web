import { createBrowserRouter } from "react-router-dom";

import { AuthLayout } from "@/pages/_layouts/auth";
import { SignUp } from "@/pages/auth/sign-up";
import { ValidateCode } from "@/pages/auth/validate-code";
import { SignIn } from "@/pages/auth/sign-in";

import { AppLayout } from "@/pages/_layouts/app";
import { Home } from "@/pages/app";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <h1>ErrorElement</h1>,
    children: [
      {
        path: '/',
        index: true,
        element: <Home />
      }
    ],
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        path: 'sign-in',
        element: <SignIn />
      },
      {
        path: 'sign-up',
        element: <SignUp />
      },
      {
        path: 'code',
        element: <ValidateCode />
      }
    ],
  }
])