export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.stack);

  res.status(statusCode).json({
    message: err.message || "Server Error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

export const notFound = (req, res, next) => {
  res.status(404).json({ message: `Route not found: ${req.originalUrl}` });
};