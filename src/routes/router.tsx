import { createBrowserRouter } from "react-router-dom";

import {
  Error,
  Home,
  QuizCreation,
  QuizDetail,
  QuizResult,
  QuizSolve,
  Ranking,
  Register,
  Root,
  Signin,
  UserProfile,
} from "@/pages";

import Private from "./Private";
import PublicOnly from "./PublicOnly";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/signin",
        element: (
          <PublicOnly>
            <Signin />
          </PublicOnly>
        ),
      },
      {
        path: "/register",
        element: (
          <PublicOnly>
            <Register />
          </PublicOnly>
        ),
      },
      {
        path: "/quizzes/create",
        element: (
          <Private>
            <QuizCreation />
          </Private>
        ),
      },
      {
        path: "/quizzes/:id",
        element: <QuizDetail />,
      },
      {
        path: "/quizzes/solve",
        element: <QuizSolve />,
      },
      {
        path: "/quizzes/result",
        element: <QuizResult />,
      },
      {
        path: "/users/ranking",
        element: <Ranking />,
      },
      {
        path: "/users/:id",
        element: <UserProfile />,
      },
    ],
  },
]);

export default router;
