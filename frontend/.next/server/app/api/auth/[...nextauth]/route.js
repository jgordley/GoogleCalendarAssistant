"use strict";
(() => {
var exports = {};
exports.id = 912;
exports.ids = [912];
exports.modules = {

/***/ 9491:
/***/ ((module) => {

module.exports = require("assert");

/***/ }),

/***/ 4300:
/***/ ((module) => {

module.exports = require("buffer");

/***/ }),

/***/ 3663:
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ 2361:
/***/ ((module) => {

module.exports = require("events");

/***/ }),

/***/ 3685:
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ 5687:
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ 2037:
/***/ ((module) => {

module.exports = require("os");

/***/ }),

/***/ 3477:
/***/ ((module) => {

module.exports = require("querystring");

/***/ }),

/***/ 7310:
/***/ ((module) => {

module.exports = require("url");

/***/ }),

/***/ 3837:
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ 9796:
/***/ ((module) => {

module.exports = require("zlib");

/***/ }),

/***/ 9909:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  headerHooks: () => (/* binding */ headerHooks),
  originalPathname: () => (/* binding */ originalPathname),
  requestAsyncStorage: () => (/* binding */ requestAsyncStorage),
  routeModule: () => (/* binding */ routeModule),
  serverHooks: () => (/* binding */ serverHooks),
  staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage),
  staticGenerationBailout: () => (/* binding */ staticGenerationBailout)
});

// NAMESPACE OBJECT: ./app/api/auth/[...nextauth]/route.js
var route_namespaceObject = {};
__webpack_require__.r(route_namespaceObject);
__webpack_require__.d(route_namespaceObject, {
  GET: () => (handler),
  POST: () => (handler)
});

// EXTERNAL MODULE: ./node_modules/next/dist/server/node-polyfill-headers.js
var node_polyfill_headers = __webpack_require__(2394);
// EXTERNAL MODULE: ./node_modules/next/dist/server/future/route-modules/app-route/module.js
var app_route_module = __webpack_require__(9692);
// EXTERNAL MODULE: ./node_modules/next/dist/server/future/route-kind.js
var route_kind = __webpack_require__(9513);
// EXTERNAL MODULE: ./node_modules/next-auth/index.js
var next_auth = __webpack_require__(9861);
var next_auth_default = /*#__PURE__*/__webpack_require__.n(next_auth);
// EXTERNAL MODULE: ./node_modules/next-auth/providers/google.js
var google = __webpack_require__(1989);
;// CONCATENATED MODULE: ./utils/authOptions.js

const scopes = [
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/calendar.events"
].join(" ");
const authOptions = {
    providers: [
        (0,google/* default */.Z)({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorizationUrl: "https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code",
            authorization: {
                params: {
                    scope: scopes
                }
            }
        })
    ],
    callbacks: {
        async signIn (user, account, profile) {
            console.log("User signed in successfully: ", user.user.name);
            console.log("Access token: ", user.account.access_token.slice(0, 5) + "XXXXX");
            // Post to the FastAPI server with the user email, name, access token, and timestamp for latest login
            try {
                const response = await fetch("http://localhost:8000/users", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: user.user.email,
                        name: user.user.name,
                        access_token: user.account.access_token,
                        timestamp: new Date().toISOString()
                    })
                });
                if (!response.ok) {
                    throw new Error("Network response was not ok " + response.statusText);
                }
                const responseData = await response.json();
                console.log("Response data: ", responseData);
                return true;
            } catch (error) {
                console.error("Error in POST request: ", error);
                return false;
            }
        }
    },
    jwt: {
        encryption: true
    },
    secret: process.env.NEXTAUTH_SECRET
};

;// CONCATENATED MODULE: ./app/api/auth/[...nextauth]/route.js


const handler = next_auth_default()(authOptions);


;// CONCATENATED MODULE: ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.js&appDir=%2Fhome%2Fjack%2Fprojects%2FGoogleCalendarAssistant%2Ffrontend%2Fapp&appPaths=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!

// @ts-ignore this need to be imported from next/dist to be external


// @ts-expect-error - replaced by webpack/turbopack loader

const AppRouteRouteModule = app_route_module.AppRouteRouteModule;
// We inject the nextConfigOutput here so that we can use them in the route
// module.
const nextConfigOutput = ""
const routeModule = new AppRouteRouteModule({
    definition: {
        kind: route_kind.RouteKind.APP_ROUTE,
        page: "/api/auth/[...nextauth]/route",
        pathname: "/api/auth/[...nextauth]",
        filename: "route",
        bundlePath: "app/api/auth/[...nextauth]/route"
    },
    resolvedPagePath: "/home/jack/projects/GoogleCalendarAssistant/frontend/app/api/auth/[...nextauth]/route.js",
    nextConfigOutput,
    userland: route_namespaceObject
});
// Pull out the exports that we need to expose from the module. This should
// be eliminated when we've moved the other routes to the new format. These
// are used to hook into the route.
const { requestAsyncStorage , staticGenerationAsyncStorage , serverHooks , headerHooks , staticGenerationBailout  } = routeModule;
const originalPathname = "/api/auth/[...nextauth]/route";


//# sourceMappingURL=app-route.js.map

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [587,501,427], () => (__webpack_exec__(9909)));
module.exports = __webpack_exports__;

})();