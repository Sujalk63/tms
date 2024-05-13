const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        // return res.status(403).json({ message: 'the role is admin' });
      return next(); // User is admin, proceed to next middleware
    } else {
      return res.status(403).json({ message: 'Unauthorized access' });
    }
  };
  
  // Middleware function to check if user is an employee
  const isEmployee = (req, res, next) => {
    if (req.user && req.user.role === 'employee') {
      return next(); // User is employee, proceed to next middleware
    } else {
      return res.status(403).json({ message: 'Unauthorized access' });
    }
  };