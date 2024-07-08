const ErrorMiddle = (err, req, res, next) => {
  const message = err.message || "Found few error";
  const statusCo = err.status || 500;
  console.log("Error status code", statusCo);
  console.error("Error stack:", err.stack);
  return res.status(500).json({ message });
};

module.exports = ErrorMiddle;
