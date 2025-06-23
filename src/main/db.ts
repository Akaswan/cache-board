// src/main/db.ts
import Database from 'better-sqlite3'

import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Save in the root of the project (or inside a /data folder)
const dbPath = resolve(__dirname, '../../clipboard.db') // or '../../data/clipboard.db'
const db = new Database(dbPath)

// Create base table with expandable type support
db.prepare(
  `
  CREATE TABLE IF NOT EXISTS clipboard_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT NOT NULL,           -- e.g. plain_text, formatted, image_url, file, code
    content TEXT NOT NULL,        -- the actual clipboard content (URL, text, JSON, etc.)
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`
).run()

export function insertClipboardItem(type: string, content: string): void {
  const stmt = db.prepare(`
    INSERT INTO clipboard_items (type, content)
    VALUES (?, ?)
  `)
  stmt.run(type, content)
}

export default db
