import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  RouterProvider,
} from "@tanstack/react-router";
import { Home } from "./components/pages/home.tsx";

const rootRoot = createRootRoute({
  component: () => <Outlet />,
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoot,
  path: "/",
  component: () => <Home />,
});

const buzzerRoute = createRoute({
  getParentRoute: () => rootRoot,
  path: "/buzzer",
  // TODO add params
  component: () => <div>Buzzer !</div>,
});

const routeTree = rootRoot.addChildren([homeRoute, buzzerRoute]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export function Routes() {
  return <RouterProvider router={router} />;
}
