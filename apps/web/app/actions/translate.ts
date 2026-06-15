"use server"

export async function translateTextAction(text: string, from: string, to: string) {
  if (!text.trim() || from === to) return ""
  
  try {
    const fromLang = from.split("-")[0]
    const toLang = to.split("-")[0]
    
    // In a real production environment, you should use Google Cloud Translation API here.
    // For now, proxying MyMemory API to hide the URL and avoid CORS/Direct Client calls.
    const res = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${fromLang}|${toLang}`)
    const data = await res.json()
    
    if (data?.responseData?.translatedText) {
      return data.responseData.translatedText
    }
  } catch (e) {
    console.error("Translation proxy error:", e)
  }
  
  return ""
}
