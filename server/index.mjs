import { createHmac, randomUUID } from 'node:crypto'
import { createServer } from 'node:http'

const PORT = 3001
const JWT_SECRET = 'faster-delivery-local-development-secret'
const users = new Map()

function createToken(user) {
  const encode = (value) => Buffer.from(JSON.stringify(value)).toString('base64url')
  const header = encode({ alg: 'HS256', typ: 'JWT' })
  const payload = encode({
    sub: user.id,
    email: user.correo,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 60 * 60,
  })
  const signature = createHmac('sha256', JWT_SECRET).update(`${header}.${payload}`).digest('base64url')

  return `${header}.${payload}.${signature}`
}

function corsHeaders(request) {
  const origin = request.headers.origin ?? ''
  const isViteLocalOrigin = /^http:\/\/localhost:\d+$/.test(origin)

  return {
    'Access-Control-Allow-Origin': isViteLocalOrigin ? origin : 'http://localhost:5173',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  }
}

function sendJson(request, response, status, body) {
  response.writeHead(status, {
    ...corsHeaders(request),
    'Content-Type': 'application/json',
  })
  response.end(JSON.stringify(body))
}

function readBody(request) {
  return new Promise((resolve, reject) => {
    let body = ''
    request.on('data', (chunk) => { body += chunk })
    request.on('end', () => {
      try {
        resolve(JSON.parse(body || '{}'))
      } catch {
        reject(new Error('El cuerpo de la solicitud no es válido.'))
      }
    })
    request.on('error', reject)
  })
}

createServer(async (request, response) => {
  if (request.method === 'OPTIONS') {
    response.writeHead(204, {
      ...corsHeaders(request),
    })
    response.end()
    return
  }

  try {
    const body = await readBody(request)

    if (request.method === 'POST' && request.url === '/api/auth/register') {
      if (users.has(body.correo)) {
        sendJson(request, response, 409, { message: 'Ya existe una cuenta con este correo.' })
        return
      }

      const user = { id: randomUUID(), ...body }
      users.set(user.correo, user)
      sendJson(request, response, 201, { message: 'Cuenta creada correctamente.' })
      return
    }

    if (request.method === 'POST' && request.url === '/api/auth/login') {
      const user = users.get(body.correo)

      if (!user || user.contrasena !== body.contrasena) {
        sendJson(request, response, 401, { message: 'Correo o contraseña incorrectos.' })
        return
      }

      sendJson(request, response, 200, {
        token: createToken(user),
        user: {
          firstName: user.nombre,
          lastName: user.apellido,
          email: user.correo,
        },
      })
      return
    }

    sendJson(request, response, 404, { message: 'Ruta no encontrada.' })
  } catch (error) {
    sendJson(request, response, 400, { message: error instanceof Error ? error.message : 'Solicitud inválida.' })
  }
}).listen(PORT, () => {
  console.log(`API local disponible en http://localhost:${PORT}`)
})
