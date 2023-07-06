const success = (data = {}, message = 'Success!') => {
  return {
    ...data,
    statusCode: 200,
    success: true,
    message: message,
  }
}

const notFound = (message = 'Not found!') => {
  return {
    success: false,
    statusCode: 404,
    message: message,
  }
}

const serverError = (message = 'Server Internal Error') => {
  return {
    success: false,
    statusCode: 500,
    message: message,
  }
}

const unauthorized = (message = 'Unauthorized') => {
  return {
    success: false,
    statusCode: 401,
    message: message,
  }
}

const missingPermission = (message = 'No permission') => {
  return {
    success: false,
    statusCode: 403,
    message: message,
  }
}

const response = (res, data) => {
  return res.status(data.statusCode || 200).json(data)
}

module.exports = {
  success,
  notFound,
  serverError,
  missingPermission,
  response,
  unauthorized,
}
