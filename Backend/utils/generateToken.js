import jwt from "jsonwebtoken";

// const generateTokenAndSetCookie = (userId, res) => {
// 	const token = jwt.sign({ userId }, process.env.JWT_SECRET ||'chatapp', {
// 		expiresIn: "15d",
// 	});
//    console.log(token)
// 	res.cookie("jwt", token, {
// 		maxAge: 15 * 24 * 60 * 60 * 1000, // Max age of the cookie 
// 		httpOnly: true, // prevent XSS attacks cross-site scripting attacks
// 		sameSite: "strict", // CSRF attacks cross-site request forgery attacks
// 		secure: process.env.NODE_ENV !== "production",
// 	});
// };
const generateTokenAndSetCookie = (userId, res) => {
	const token = jwt.sign({ userId }, process.env.JWT_SECRET || 'chatapp', {
	  expiresIn: "15d",
	});
  console.log(token)
	res.cookie("jwt", token, {
	  maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
	  httpOnly: true, // Prevents XSS
	  sameSite: "strict", // CSRF protection
	  secure: process.env.NODE_ENV === "production", // Only secure cookies in production
	});
  };
  
export default generateTokenAndSetCookie;
