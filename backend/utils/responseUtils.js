const success = (data = {}, message = 'Success!') => {
  return { ...data, ...responseJson(200, message) }
}

const badRequest = (message = 'Bad Request!') => responseJson(400, message)

const notFound = (message = 'Not found!') => responseJson(404, message)

const serverError = (message = 'Server Internal Error') =>
  responseJson(500, message)

const unauthorized = (message = 'Unauthorized') => responseJson(401, message)

const missingPermission = (message = 'No permission') =>
  responseJson(403, message)

const responseJson = (statusCode, message) => {
  let success = statusCode >= 200 && statusCode <= 299
  return { success, statusCode, message }
}

const response = (res, data) => {
  return res.status(data.statusCode || 400).json(data)
}

module.exports = {
  success,
  notFound,
  serverError,
  missingPermission,
  response,
  unauthorized,
  badRequest,
}
