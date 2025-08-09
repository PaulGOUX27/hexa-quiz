import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  RouterProvider,
} from "@tanstack/react-router";
import { Home } from "./pages/home.tsx";
import { Buzzer } from "./pages/buzzer.tsx";
import { z } from "zod";
import { TeamEnumSchema } from "api/src/types.ts";
import { Admin } from "./pages/admin.tsx";

const rootRoot = createRootRoute({
  component: () => <Outlet />,
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoot,
  path: "/",
  component: () => <Home />,
});

const BuzzerSearchSchema = z.object({
  team: TeamEnumSchema,
});

const buzzerRoute = createRoute({
  getParentRoute: () => rootRoot,
  path: "/buzzer",
  validateSearch: BuzzerSearchSchema,
  component: () => <Buzzer />,
});

const adminRoutes = createRoute({
  getParentRoute: () => rootRoot,
  path: "/admin",
  component: () => <Admin />,
});

const routeTree = rootRoot.addChildren([homeRoute, buzzerRoute, adminRoutes]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export function Routes() {
  return <RouterProvider router={router} />;
}
