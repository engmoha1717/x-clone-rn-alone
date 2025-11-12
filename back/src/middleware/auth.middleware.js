// export const protectRoute = async (req, res, next) => {
//   if (!req.auth().isAuthenticated) {
//     return res.status(401).json({ message: "Unauthorized - you must be logged in" });
//   }
//   next();
// };



export const protectRoute = async (req, res, next) => {
  console.log("🔐 Protect route called");
  console.log("📋 Headers:", req.headers.authorization);
  console.log("🔍 Auth result:", req.auth);
  
  if (!req.auth().isAuthenticated) {
    console.error("❌ Authentication failed - not authenticated");
    return res.status(401).json({ message: "Unauthorized - you must be logged in" });
  }
  
  console.log("✅ Authentication successful");
  next();
};