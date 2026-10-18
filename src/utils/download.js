/**
 * Triggers a file download in the browser.
 *
 * @param {string} url
 * @param {string} filename
 */
export function triggerDownload(url, filename) {
  if (typeof document === 'undefined') return
  const link = document.createElement('a')
  link.href = url
  if (filename) {
    link.download = filename
  }
  document.body.appendChild(link)
  link.click()
  link.remove()
}
