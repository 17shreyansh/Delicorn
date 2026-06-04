// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
const User = require("../models/User");

/**
 * Enhanced authentication middleware
 * - Supports both cookie and Authorization header tokens
 * - Better error handling and logging
 * - Caches user data
 */
exports.protect = async (req, res, next) => {
  let token;

  try {
    // 1. First priority: Cookies (preferred for security)
    if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
      console.log('[Auth] Token found in cookies');
    }
    
    // 2. Fallback: Authorization header (for API testing)
    if (!token && req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
      console.log('[Auth] Token found in Authorization header');
    }

    // 3. If still no token, send unauthorized
    if (!token) {
      console.log('[Auth] No token provided in request');
      return res.status(401).json({ 
        success: false,
        message: "Not authorized, no token provided",
        code: "NO_TOKEN"
      });
    }

    // 4. Verify token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('[Auth] Token verified for user:', decoded.id);
    } catch (err) {
      console.log('[Auth] Token verification failed:', err.message);
      
      // Clear invalid token from cookie
      res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
        path: '/'
      });
      
      return res.status(401).json({ 
        success: false,
        message: "Invalid or expired token",
        code: "INVALID_TOKEN",
        tokenExpired: err.name === 'TokenExpiredError'
      });
    }

    // 5. Get user from database
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      console.log('[Auth] User not found for ID:', decoded.id);
      return res.status(401).json({ 
        success: false,
        message: "Not authorized, user not found",
        code: "USER_NOT_FOUND"
      });
    }

    // 6. Attach user to request object
    req.user = user;
    req.token = token;
    
    console.log('[Auth] User authenticated:', user.email, 'isAdmin:', user.isAdmin);
    next();

  } catch (err) {
    console.error('[Auth] Unexpected error in protect middleware:', err);
    return res.status(500).json({ 
      success: false,
      message: "Authentication error",
      code: "AUTH_ERROR"
    });
  }
};

/**
 * Admin authorization middleware
 * Must be used after protect middleware
 */
exports.isAdmin = (req, res, next) => {
  // Verify protect middleware was already executed
  if (!req.user) {
    console.log('[Auth] isAdmin called without user in request');
    return res.status(401).json({ 
      success: false,
      message: "Not authorized",
      code: "NO_USER"
    });
  }

  // Check if user has admin privileges
  if (req.user.isAdmin) {
    console.log('[Auth] Admin user verified:', req.user.email);
    next();
  } else {
    console.log('[Auth] Non-admin user tried to access admin route:', req.user.email);
    return res.status(403).json({ 
      success: false,
      message: "Access denied: Admin privileges required",
      code: "NOT_ADMIN"
    });
  }
};

// Alias for consistency
exports.admin = exports.isAdmin;

/**
 * Optional middleware to verify user without requiring it
 */
exports.verifyOptional = async (req, res, next) => {
  let token;

  try {
    // Try Authorization header first
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    
    // Fall back to cookies
    if (!token && req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    // If we have a token, verify it
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select("-password");
      } catch (err) {
        // Token invalid or expired, just continue without user
        req.user = null;
      }
    } else {
      req.user = null;
    }

    next();
  } catch (err) {
    console.error('[Auth] Error in verifyOptional:', err);
    req.user = null;
    next();
  }
};

// Helper middleware to clear invalid tokens
exports.clearInvalidToken = (req, res, next) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
    path: '/'
  });
  next();
};