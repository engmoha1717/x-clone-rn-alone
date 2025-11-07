import arcjet, { tokenBucket, shield, detectBot } from "@arcjet/node";
import { ENV } from "./env.js";

// initialize Arcjet with security rules
export const aj = arcjet({
  key: ENV.ARCJET_KEY,
  characteristics: ["ip.src"],
  rules: [
    // shield protects your app from common attacks e.g. SQL injection, XSS, CSRF attacks
    shield({ mode: "LIVE" }),

    // bot detection - block all bots except search engines
    detectBot({
      mode: "LIVE",
      allow: [
        "CATEGORY:SEARCH_ENGINE",
        // allow legitimate search engine bots
        // see full list at https://arcjet.com/bot-list
      ],
    }),

    // rate limiting with token bucket algorithm
    tokenBucket({
      mode: "LIVE",
      refillRate: 10, // tokens added per interval
      interval: 10, // interval in seconds (10 seconds)
      capacity: 15, // maximum tokens in bucket
    }),
  ],
});

//   const decision = await aj.protect(req);

//   console.log("Arcjet decision:", decision);

//   if (decision.isDenied()) {
//     if (decision.reason.isBot()) {
//       res.writeHead(403, { "Content-Type": "text/html" });
//       res.end("<h1>Forbidden</h1><p>Bots denied.</p>");
//     } else if (decision.reason.isRateLimit()) {
//       res.writeHead(429, { "Content-Type": "text/html" });
//       res.end("<h1>Too Many Requests</h1><p>Rate limit exceeded.</p>");
//     } else {
//       res.writeHead(403, { "Content-Type": "text/html" });
//       res.end("<h1>Forbidden</h1><p>Access denied.</p>");
//     }
//   }
//   // https://docs.arcjet.com/bot-protection/reference#bot-verification
//   // Test it with:
//   // `curl -H "User-Agent: Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)" http://localhost:3000`
//   else if (decision.results.some(isSpoofedBot)) {
//     res.writeHead(403, { "Content-Type": "text/html" });
//     res.end("<h1>Forbidden</h1><p>No spoofing!</p>");
//   } else {
//     next();
//   }
// });

// app.use(express.static(path.join(__dirname, "../public")));

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });