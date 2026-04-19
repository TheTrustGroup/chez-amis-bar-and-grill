export function conciseMenuDescription(description: string, maxWords: number = 16): string {
  const normalized = description.replace(/\s+/g, " ").trim()
  if (!normalized) return ""

  const firstSentence = normalized.split(".")[0]?.trim() || normalized
  const words = firstSentence.split(" ").filter(Boolean)

  if (words.length <= maxWords) {
    return firstSentence
  }

  return `${words.slice(0, maxWords).join(" ")}...`
}
