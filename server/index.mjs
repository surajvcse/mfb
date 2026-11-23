import { fileURLToPath } from 'node:url'
import express from 'express'
import { createContactApi } from './contact.mjs'

const dist = new URL('../dist/', import.meta.url)
const app = express()
app.disable('x-powered-by')
app.use(createContactApi())
app.use('/api', (_request, response) => response.status(404).json({ error: 'Endpoint not found.' }))
app.use(express.static(fileURLToPath(dist)))
app.get('/{*path}', (_request, response) => response.sendFile(fileURLToPath(new URL('index.html', dist))))

const port = Number(process.env.PORT || 4173)
app.listen(port, process.env.HOST || '127.0.0.1', () => console.log(`MFB website listening on port ${port}`))
