import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, "..")

function walk(dir, out = []) {
  for (const name of fs.readdirSync(dir)) {
    if (name === "node_modules" || name === ".next") continue
    const p = path.join(dir, name)
    const st = fs.statSync(p)
    if (st.isDirectory()) walk(p, out)
    else if (/\.(tsx|ts|css)$/.test(name)) out.push(p)
  }
  return out
}

const re = /["'](\/[^"']+\.(jpg|jpeg|png|gif|webp|svg|mp4|mov|ico|avif))["']/gi
const refs = new Set()
for (const f of walk(root)) {
  const s = fs.readFileSync(f, "utf8")
  let m
  const r = new RegExp(re.source, "gi")
  while ((m = r.exec(s))) refs.add(m[1])
}

const missing = []
for (const p of [...refs].sort()) {
  const full = path.join(root, "public", p)
  if (!fs.existsSync(full)) missing.push(p)
}

console.log(JSON.stringify({ count: refs.size, missing }, null, 2))
