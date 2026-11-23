import { randomUUID } from 'node:crypto'
import { chmod, mkdir, readFile, rename, rm } from 'node:fs/promises'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import ExcelJS from 'exceljs'
import express from 'express'
import lockfile from 'proper-lockfile'

const defaultDataDir = fileURLToPath(new URL('../.contact-data/', import.meta.url))
const worksheetName = 'Project inquiries'
const columns = [
  { header: 'Submission ID', key: 'id', width: 36 },
  { header: 'Received (UTC)', key: 'received', width: 25 },
  { header: 'Full name', key: 'name', width: 26 },
  { header: 'Work email', key: 'email', width: 34 },
  { header: 'Phone number', key: 'phone', width: 22 },
  { header: 'Service', key: 'service', width: 40 },
  { header: 'Project address', key: 'address', width: 43 },
  { header: 'Project details', key: 'message', width: 65 },
]

function validateSubmission(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) return null

  const submission = {}
  for (const [field, limit, required] of [
    ['id', 32, true], ['name', 120, true], ['email', 254, true], ['phone', 40, false],
    ['service', 100, true], ['address', 250, false], ['message', 1500, true],
  ]) {
    const value = body[field] ?? ''
    if (typeof value !== 'string' || value.length > limit) return null
    submission[field] = value.trim()
    if (required && !submission[field]) return null
  }

  if (!/^[a-f0-9]{32}$/.test(submission.id)) return null
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(submission.email)) return null
  return submission
}

async function saveSubmission(dataDir, submission) {
  await mkdir(dataDir, { recursive: true, mode: 0o700 })
  const release = await lockfile.lock(dataDir, {
    retries: { retries: 10, factor: 1.4, minTimeout: 50, maxTimeout: 500 },
  })

  try {
    const workbookPath = resolve(dataDir, 'contact-inquiries.xlsx')
    const workbook = new ExcelJS.Workbook()

    try {
      await workbook.xlsx.load(await readFile(workbookPath))
    } catch (error) {
      if (error.code !== 'ENOENT') throw error
    }

    let sheet = workbook.getWorksheet(worksheetName)
    if (!sheet) {
      sheet = workbook.addWorksheet(worksheetName, { views: [{ state: 'frozen', ySplit: 1 }] })
      sheet.columns = columns
      sheet.autoFilter = 'A1:H1'
      const header = sheet.getRow(1)
      header.height = 24
      header.font = { bold: true, color: { argb: 'FFFFFFFF' } }
      header.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF000076' } }
      header.alignment = { vertical: 'middle' }
    }

    if (sheet.getColumn(1).values.includes(submission.id)) return

    const row = sheet.addRow([
      submission.id, new Date(), submission.name, submission.email, submission.phone,
      submission.service, submission.address, submission.message,
    ])
    row.getCell(2).numFmt = 'yyyy-mm-dd hh:mm:ss'
    row.alignment = { vertical: 'top', wrapText: true }

    const temporaryPath = resolve(dataDir, `contact-inquiries-${randomUUID()}.xlsx`)
    try {
      await workbook.xlsx.writeFile(temporaryPath)
      await chmod(temporaryPath, 0o600)
      await rename(temporaryPath, workbookPath)
    } finally {
      await rm(temporaryPath, { force: true })
    }
  } finally {
    await release()
  }
}

export function createContactApi() {
  const api = express()
  api.disable('x-powered-by')
  const dataDir = resolve(process.env.CONTACT_DATA_DIR || defaultDataDir)

  api.post('/api/contact', express.json({ limit: '16kb' }), async (request, response) => {
    const submission = validateSubmission(request.body)
    if (!submission) {
      response.status(400).json({ error: 'Check the required fields and enter a valid email address.' })
      return
    }

    try {
      await saveSubmission(dataDir, submission)
      response.status(201).json({ saved: true })
    } catch (error) {
      console.error('Could not save a contact inquiry.', error.code ?? error.name)
      response.status(503).json({ error: 'We couldn’t save your inquiry. Please try again.' })
    }
  })

  api.all('/api/contact', (_request, response) => {
    response.set('Allow', 'POST').status(405).json({ error: 'Use POST to submit a contact inquiry.' })
  })
  api.use((error, _request, response, next) => {
    if (!error.status || error.status >= 500) return next(error)
    response.status(error.status).json({ error: 'The inquiry data could not be read.' })
  })
  return api
}
