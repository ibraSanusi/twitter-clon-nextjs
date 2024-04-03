export enum LoginStatus {
  Success = 200,
  Unauthorized = 401,
  NotFound = 404,
  ServerError = 500,
}

export enum StatusTexts {
  Success = 'Success',
  Unauthorized = 'El nombre de tu cuenta o la contraseña son incorrectos.',
  NotFound = 'Not found',
  ServerError = 'Error en el servidor.',
}
