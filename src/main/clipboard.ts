import { clipboard } from 'electron'
import { insertClipboardItem } from './db'

export function captureClipboard(): void {
  const formats = clipboard.availableFormats()

  console.log('[Clipboard] captureClipboard called')

  const text = clipboard.readText().trim()
  const html = clipboard.readHTML()
  const uriList = clipboard.read('text/uri-list')

  // Category: Image or GIF URL
  if (/^https?:\/\/.+\.(gif|png|jpe?g|webp|bmp|svg)(\?.*)?$/i.test(html)) {
    insertClipboardItem('image_url', html)
    return
  }

  // Category: Plain text
  if (text && formats.includes('text/plain') && !html) {
    insertClipboardItem('plain_text', text)
    return
  }

  // Category: Formatted Text
  if (html && formats.includes('text/html')) {
    insertClipboardItem('formatted_text', html)
    return
  }

  // Category: File Paths
  if (uriList && formats.includes('text/uri-list')) {
    insertClipboardItem('file_path', uriList)
    return
  }

  // Category: Code (simple detection)
  const isLikelyCode = text && /[{}();]|const|let|function|class/.test(text)
  if (isLikelyCode) {
    insertClipboardItem('code', text)
    return
  }

  // Unknown or unsupported
  insertClipboardItem('unknown', text || '[unreadable]')
}
