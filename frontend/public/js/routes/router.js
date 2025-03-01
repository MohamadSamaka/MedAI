import { unloadStyles } from "/js/helpers/stylesManager.js";
import { hasAccessToken } from '/js/helpers/accessTokenManager.js';
import { logoutUser, getUserRole } from '/js/helpers/userManager.js';

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
    loader: () => import("/js/views/userView/patient.js"),
    styles: [
      {
        href: "/styles/patient.css",
        id: "patientStyles"
      },
    ],
  },
  {
    pattern: "/book-appointment",
    loader: () => import("/js/views/userView/appointmentsBooking.js"),
    styles: [
      {
        href: "/styles/bookAppointment.css",
        id: "appointmentsBookingStyles"
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
        id: "admin_dashboardStyles", // the name of the id doesn't matter, what's important is that it has to be unique
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
            id: "ceatingUserDashboard", // the name of the id doesn't matter, what's important is that it has to be unique
          },
        ],
      },
    },
    styles: [
      {
        href: "/styles/admin_dashboard.css",
        id: "admin_dashboardStyles", // the name of the id doesn't matter, what's important is that it has to be unique
      },
      {
        loader: () => import("/js/views/adminView/creatingUser.js"),
        styles: {
          href: "/styles/ceatingUserDashboard.css",
          id: "ceatingUserDashboard", // the name of the id doesn't matter, what's important is that it has to be unique
        },
      },
    ],
  },
  {
    pattern: "/contact",
    loader: () => import("/js/views/contact.js"),
    styles: [
      {
        href: "/styles/contact.css",
        id: "contactStyles", // the name of the id doesn't matter, what's important is that it has to be unique
      },
    ],
  },
  {
    pattern: "/login",
    loader: () => import("/js/views/login.js"),
    styles: [
      {
        href: "/styles/login.css",
        id: "loginStyles", // the name of the id doesn't matter, what's important is that it has to be unique
      },
    ],
  },
  {
    pattern: "*",
    loader: () => import("/js/views/notFound.js"),
  },
];

function matchRoute(pattern, pathname) {
  // If pattern is exactly "*", return an empty params object
  if (pattern === "*") return {};

  const patternSegments = pattern.split("/").filter(Boolean);
  const pathSegments = pathname.split("/").filter(Boolean);

  // Check for wildcard in pattern
  const hasWildcard = patternSegments[patternSegments.length - 1] === "*";

  // If no wildcard, segments must match exactly
  if (!hasWildcard && patternSegments.length !== pathSegments.length) {
    return null;
  }

  // If has wildcard, pattern (minus the wildcard) cannot exceed path length
  if (hasWildcard && patternSegments.length - 1 > pathSegments.length) {
    return null;
  }

  const params = {};
  for (let i = 0; i < patternSegments.length; i++) {
    const patSeg = patternSegments[i];
    if (patSeg === "*") {
      params["wildcard"] = pathSegments.slice(i);
      break;
    } else if (patSeg.startsWith(":")) {
      const paramName = patSeg.slice(1);
      params[paramName] = pathSegments[i];
    } else if (patSeg !== pathSegments[i]) {
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
    subloader: fallback.subLoader || null,
    params: {},
    styles: fallback.styles || [],
  };
}

export async function initRouter() {
  const path = window.location.pathname;
  await renderView(path);
}

export async function renderView(route, renderContainer = "root") {
  const userRole = getUserRole()?.toLowerCase() || null;
  if (route.startsWith('/admin') && (userRole !== "admin" && userRole !== "doctor")) {
    route = !hasAccessToken() ? "/login" : "/";
  }
  const resolvedRoute = typeof route === "object" ? route : resolveRoute(route);
  const { loader, subloader = null, params, styles } = resolvedRoute;

  const { render, init } = await loader();
  const markup = render();
  const rootDiv = document.getElementById(renderContainer);
  rootDiv.innerHTML = markup;

  // Ensure DOM updated before init
  requestAnimationFrame(() => {
    if (typeof init === "function") {
      init(styles, subloader, params);
      updateLoginButton();
    }
  });
}

export function setLinksAction(event) {
  const link = event.target.closest("a[data-link]");
  if (link) {
    const navigationElementBtn = event.target.closest("a[data-render-in]");
    const dataRenderInValue = navigationElementBtn
      ? navigationElementBtn.getAttribute("data-render-in")
      : "root";
    event.preventDefault();
    const href = link.getAttribute("href");
    if (href) {
      navigateTo(href, dataRenderInValue);
    } else {
      console.error("Link does not have a valid href attribute.");
    }
  }
}

export function navigateTo(path, rendercContainer = "root") {
  window.history.pushState({}, "", window.location.origin + path);
  renderView(path, rendercContainer);
  unloadStyles(resolveRoute(path).styles);
}

function updateLoginButton() {
  const loginStateBtn = document.querySelector("#login-state-btn");
  const goToDashBoardBtn = document.querySelector("#go-to-admin-dashboard-btn");

  console.log("hasAccessToken() ->", hasAccessToken());

  if (hasAccessToken()) {
    // Log user role to confirm correct data
    const role = getUserRole();
    const userRole = role ? role.toLowerCase() : null;
    console.log("getUserRole() ->", role, "| toLowerCase ->", userRole);

    loginStateBtn.textContent = "Logout";
    loginStateBtn.removeAttribute("href");

    // Remove old "click" listeners to prevent duplication
    loginStateBtn.removeEventListener("click", handleLogout);
    loginStateBtn.addEventListener("click", handleLogout);

    // Check if admin or doctor, show "Go to Dashboard"
    if (userRole === "admin" || userRole === "doctor") {
      if (goToDashBoardBtn) {
        // Make the dashboard button visible with text
        goToDashBoardBtn.textContent = "Dashboard"; 
        goToDashBoardBtn.style.display = "inline-block";
        goToDashBoardBtn.href = "/admin/dashboard";
        console.log("Dashboard button is made visible");
      }
    } else {
      // Hide if other role
      if (goToDashBoardBtn) {
        goToDashBoardBtn.style.display = "none";
        console.log("Dashboard button hidden - not an admin/doctor");
      }
    }
  } else {
    console.log("No token found - user not logged in");
    loginStateBtn.textContent = "Login";
    loginStateBtn.href = "/login";

    // Remove old event listeners just in case
    loginStateBtn.removeEventListener("click", handleLogout);

    if (goToDashBoardBtn) {
      // Hide the dashboard link if it exists
      goToDashBoardBtn.style.display = "none";
    }
  }
}

function handleLogout() {
  logoutUser();
  updateLoginButton();
}

// Intercept clicks on links with the data-link attribute
document.addEventListener("click", (event) => setLinksAction(event));
