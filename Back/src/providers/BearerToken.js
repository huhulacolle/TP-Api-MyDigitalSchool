const jwt_decode = require("jwt-decode");

exports.extractBearerToken = (headerValue) => {
  if (typeof headerValue !== 'string') {
    return false
  }

  const matches = headerValue.match(/(bearer)\s+(\S+)/i)
  return matches && matches[2]
}

exports.getRole = (headerValue) => {
  let decodedToken = jwt_decode(headerValue);
  return decodedToken.role;
} 