import { createHmac, randomUUID } from 'node:crypto'
import { createServer } from 'node:http'

const PORT = 3001
const JWT_SECRET = 'faster-delivery-local-development-secret'
const users = new Map()

const categories = [
  { id: 1, name: 'Fast Food', description: 'Hamburguesas, hot dogs y comida rápida' },
  { id: 2, name: 'Healthy', description: 'Opciones saludables y bowls' },
  { id: 3, name: 'Desserts', description: 'Postres y repostería' },
  { id: 4, name: 'Beverages', description: 'Bebidas frías y calientes' },
  { id: 5, name: 'Calzado Urbano', description: 'Tenis y calzado casual' },
  { id: 6, name: 'Comida', description: 'Platillos tradicionales' },
  { id: 7, name: 'Ropa urbana', description: 'Prendas de estilo urbano' },
]
let nextCategoryId = categories.length + 1

const products = []
let nextProductId = 1

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
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
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

    if (request.method === 'GET' && request.url === '/api/categories') {
      sendJson(request, response, 200, categories)
      return
    }

    if (request.method === 'POST' && request.url === '/api/categories') {
      const name = String(body.name ?? '').trim()
      if (!name) {
        sendJson(request, response, 400, { message: 'El nombre de la categoría es requerido.' })
        return
      }
      const category = { id: nextCategoryId++, name, description: String(body.description ?? '') }
      categories.push(category)
      sendJson(request, response, 201, category)
      return
    }

    if (request.method === 'GET' && request.url === '/api/products') {
      sendJson(request, response, 200, products)
      return
    }

    if (request.method === 'POST' && request.url === '/api/products') {
      const name = String(body.name ?? '').trim()
      const category = categories.find((c) => c.id === Number(body.categoryId))
      const regularPrice = Number(body.regularPrice)

      if (!name || !category || !(regularPrice > 0)) {
        sendJson(request, response, 400, {
          message: 'Datos inválidos: name, categoryId y regularPrice son requeridos.',
        })
        return
      }

      const now = new Date().toISOString()
      const product = {
        id: nextProductId++,
        name,
        categoryId: category.id,
        category: { id: category.id, name: category.name },
        sku: body.sku ? String(body.sku) : null,
        description: String(body.description ?? ''),
        regularPrice,
        salePrice: body.salePrice != null ? Number(body.salePrice) : null,
        stock: Number(body.stock) || 0,
        minStock: Number(body.minStock) || 0,
        createdAt: now,
        updatedAt: now,
      }
      products.push(product)
      sendJson(request, response, 201, product)
      return
    }

    sendJson(request, response, 404, { message: 'Ruta no encontrada.' })
  } catch (error) {
    sendJson(request, response, 400, { message: error instanceof Error ? error.message : 'Solicitud inválida.' })
  }
}).listen(PORT, () => {
  console.log(`API local disponible en http://localhost:${PORT}`)
})
