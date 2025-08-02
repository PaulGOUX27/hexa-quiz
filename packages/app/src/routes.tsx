import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  RouterProvider,
} from "@tanstack/react-router";

const rootRoot = createRootRoute({
  component: () => <Outlet />,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoot,
  path: "/",
  component: () => <div>Index !</div>,
});

const buzzerRoute = createRoute({
  getParentRoute: () => rootRoot,
  path: "/buzzer",
  // TODO add params
  component: () => <div>Buzzer !</div>,
});

const routeTree = rootRoot.addChildren([indexRoute, buzzerRoute]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export function Routes() {
  return <RouterProvider router={router} />;
}
