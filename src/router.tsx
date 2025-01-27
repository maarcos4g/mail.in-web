import { createBrowserRouter } from "react-router-dom";

import { AuthLayout } from "@/pages/_layouts/auth";
import { SignUp } from "@/pages/auth/sign-up";
import { ValidateCode } from "@/pages/auth/validate-code";
import { SignIn } from "@/pages/auth/sign-in";

import { AppLayout } from "@/pages/_layouts/app";
import { Home } from "@/pages/app";
import { HomeTeam } from "./pages/app/home";
import { EmailHome } from "./pages/app/emails";
import { AcceptInvite } from "./pages/app/accept-invite";
import { EmailListSettings } from "./pages/app/email-list-settings";

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
      },
      {
        path: '/team/:slug',
        element: <HomeTeam />,
      },
      {
        path: '/team/:slug/emails/:emailListId',
        element: <EmailHome />
      },
      {
        path: '/team/:slug/settings/:emailListId',
        element: <EmailListSettings />
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
  },
  //Public routes
  {
    path: '/team/:slug/invite/:inviteId',
    element: <AcceptInvite />
  }
])