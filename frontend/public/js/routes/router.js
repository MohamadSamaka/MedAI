import { unloadStyles } from "/js/helpers/stylesManager.js";

export const routes = [
  {
    pattern: "/",
    loader: () => import("/js/views/home.js"),
    styles: [
      {
        href: "/styles/home.css",
        id: "homeStyles",
      },
    ],
  },
  {
    pattern: "/about",
    loader: () => import("/js/views/about.js"),
    styles: [
      {
        href: "/styles/about.css",
        id: "aboutStyles",
      },
    ],
  },
  {
    pattern: "/my-appointment",
    loader: () => import("/js/views/userView/myAppointment.js"),
    // styles: [
    //   {
    //     href: "/styles/about.css",
    //     id: "aboutStyles"
    //   },
    // ],
  },
  {
    pattern: "/my-appointment-rodin",
    loader: () => import("/js/views/userView/appointmentBookingRodin.js"),
    styles: [
      {
        href: "/styles/appointmentRodin.css",
        id: "appointmentRodin",
      },
    ],
  },
  {
    pattern: "/book-appointment",
    loader: () => import("/js/views/userView/appointmentsBooking.js"),
    styles: [
      {
        href: "/styles/bookAppointment.css",
        id: "aboutStyles"
      },
    ],
  },
  {
    pattern: "/faq",
    loader: () => import("/js/views/faq.js"),
    styles: [
      {
        href: "/styles/faq.css",
        id: "faqStyles",
      },
    ],
  },
  {
    pattern: "/chatbot",
    loader: () => import("/js/views/AIChat.js"),
    styles: [
      {
        href: "/styles/AIChat.css",
        id: "AIChatStyles",
      },
    ],
  },
  {
    pattern: "/services",
    loader: () => import("/js/views/services.js"),
    styles: [
      {
        href: "/styles/services.css",
        id: "servicesStyles",
      },
    ],
  },
  {
    pattern: "/admin/dashboard/",
    loader: () => import("/js/views/adminView/admin_dashboard.js"),
    styles: [
      {
        href: "/styles/admin_dashboard.css",
        id: "admin_dashboardStyles", //the name of the id doesn't matter, what's important is that it has to be unique
      },
    ],
  },
  {
    pattern: "/admin/dashboard/:subRoute",
    loader: () => import("/js/views/adminView/admin_dashboard.js"),
    subLoader: {
      usersDashboard: {
        loader: () => import("/js/views/adminView/creatingUser.js"),
        styles: [
          {
            href: "/styles/ceatingUserDashboard.css",
            id: "ceatingUserDashboard", //the name of the id doesn't matter, what's important is that it has to be unique
          },
        ],
      },
    },
    styles: [
      {
        href: "/styles/admin_dashboard.css",
        id: "admin_dashboardStyles", //the name of the id doesn't matter, what's important is that it has to be unique
      },
      {
        loader: () => import("/js/views/adminView/creatingUser.js"),
        styles: {
          href: "/styles/ceatingUserDashboard.css",
          id: "ceatingUserDashboard", //the name of the id doesn't matter, what's important is that it has to be unique
        },
      },
    ],
  },

  // {
  //   pattern: "/admin/dashboard/user",
  //   loader: () => import("/js/views/adminView/creatingUser.js"),
  //   styles: [
  //     {
  //       href: "/styles/admin_dashboard.css",
  //       id: "admin_dashboardStyles", //the name of the id doesn't matter, what's important is that it has to be unique
  //     },
  //     {
  //       href: "/styles/ceatingUserDashboard.css",
  //       id: "ceatingUserDashboard", //the name of the id doesn't matter, what's important is that it has to be unique
  //     },
  //     // {
  //     //   href: "/styles/index.css",
  //     //   id: "iasdasd", //the name of the id doesn't matter, what's important is that it has to be unique
  //     // },
  //   ],
  // },

  {
    pattern: "/users/:userId",
    loader: () => import("/js/views/userDashboard.js"),
  },
  {
    pattern: "/contact",
    loader: () => import("/js/views/contact.js"),
    styles: [
      {
        href: "/styles/contact.css",
        id: "contactStyles", //the name of the id doesn't matter, what's important is that it has to be unique
      },
    ],
  },
  {
    pattern: "/login",
    loader: () => import("/js/views/login.js"),
    styles: [
      {
        href: "/styles/login.css",
        id: "loginStyles", //the name of the id doesn't matter, what's important is that it has to be unique
      },
    ],
  },
  {
    pattern: "*",
    loader: () => import("/js/views/notFound.js"),
  },
];

function matchRoute(pattern, pathname) {
  // If pattern is exactly "*" return an empty params object.
  if (pattern === "*") return {};

  // Split both pattern and pathname into segments.
  const patternSegments = pattern.split("/").filter(Boolean);
  const pathSegments = pathname.split("/").filter(Boolean);

  // Check if the pattern ends with a wildcard segment "*".
  const hasWildcard = patternSegments[patternSegments.length - 1] === "*";

  // If there is no wildcard, the number of segments must match exactly.
  if (!hasWildcard && patternSegments.length !== pathSegments.length) {
    return null;
  }

  // If there is a wildcard, the pattern (without the wildcard) must not have more segments than the path.
  if (hasWildcard && patternSegments.length - 1 > pathSegments.length) {
    return null;
  }

  const params = {};
  // Iterate over each segment in the pattern.
  for (let i = 0; i < patternSegments.length; i++) {
    const patSeg = patternSegments[i];
    if (patSeg === "*") {
      // Capture all remaining segments in a "wildcard" parameter.
      params["wildcard"] = pathSegments.slice(i);
      break;
    } else if (patSeg.startsWith(":")) {
      // Extract the parameter name and assign the corresponding path segment.
      const paramName = patSeg.slice(1);
      params[paramName] = pathSegments[i];
    } else if (patSeg !== pathSegments[i]) {
      // A static segment doesn't match.
      return null;
    }
  }
  return params;
}

function resolveRoute(pathname) {
  for (const route of routes) {
    const params = matchRoute(route.pattern, pathname);
    if (params !== null) {
      return {
        loader: route.loader,
        subloader: route.subLoader || null,
        styles: route.styles || [],
        params,
      };
    }
  }

  const fallback = routes.find((r) => r.pattern === "*");
  return {
    loader: fallback.loader,
    subloader: route.subLoader || null,
    params: {},
    styles: fallback.styles || [],
  };
}

export async function initRouter() {
  const path = window.location.pathname;
  await renderView(path);
}

export async function renderView(route, renderContainer = "root") {
  // Check if route is an object or a string

  const resolvedRoute = typeof route === "object" ? route : resolveRoute(route);
  // Destructure the resolvedRoute object
  const { loader, subloader = null, params, styles } = resolvedRoute;
  const { render, init } = await loader();
  const markup = render();
  const rootDiv = document.getElementById(renderContainer);
  rootDiv.innerHTML = markup;
  // Ensure the DOM is updated before calling init.
  requestAnimationFrame(() => {
    // if(subloader){
    //   const subMarkup = render();
    //   const subContainer = document.getElementById(RendercContainer);
    //   subContainer.innerHTML = markup;
    // }
    if (typeof init === "function") {
      init(styles, subloader, params);
    }
  });
}

export function setLinksAction(event) {
  const link = event.target.closest("a[data-link]");
  // console.log("linkk: ", link)
  // alert("hiii")
  // alert("its been called")
  if (link) {
    const navigationElementBtn = event.target.closest("a[data-render-in]");
    const dataRenderInValue = navigationElementBtn
      ? navigationElementBtn.getAttribute("data-render-in")
      : "root";
    event.preventDefault();
    const href = link.getAttribute("href");
    console.log(dataRenderInValue);
    if (href) {
      navigateTo(href, dataRenderInValue);
    } else {
      console.error("Link does not have a valid href attribute.");
    }
  }
}
// Intercept clicks on links with the data-link attribute
document.addEventListener("click", (event) => setLinksAction(event));

export function navigateTo(path, rendercContainer = "root") {
  // Update the browser's URL without reloading the page.
  window.history.pushState({}, "", window.location.origin + path);
  // Render the view for the new path.
  renderView(path, rendercContainer);
  unloadStyles(resolveRoute(path).styles);
}
