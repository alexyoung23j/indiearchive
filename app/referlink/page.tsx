import fs from "fs"
import path from "path"
import React from "react"

// This function can be named anything, it's used for data fetching
async function getHtmlContent() {
  const filePath = path.join(
    process.cwd(),
    "public",
    "output",
    "referlink",
    "index.html"
  )
  let htmlContent = fs.readFileSync(filePath, "utf8")

  return htmlContent
}

// The page component is now an async function that fetches data directly
export default async function ArchivePage() {
  const htmlContent = await getHtmlContent()

  return (
    <html className="hiyo" dangerouslySetInnerHTML={{ __html: htmlContent }} />
  )
}
