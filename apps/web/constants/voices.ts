export interface Voice {
  name: string
  label: string
  lang: string
  gender: "MALE" | "FEMALE" | "NEUTRAL"
}

export const VOICES: Voice[] = [
  // Indonesian
  { name: "id-ID-Chirp3-HD-Achernar", label: "Wanita 1", lang: "id-ID", gender: "FEMALE" },
  { name: "id-ID-Chirp3-HD-Aoede", label: "Wanita 2", lang: "id-ID", gender: "FEMALE" },
  { name: "id-ID-Chirp3-HD-Achird", label: "Pria 1", lang: "id-ID", gender: "MALE" },
  { name: "id-ID-Chirp3-HD-Algenib", label: "Pria 2", lang: "id-ID", gender: "MALE" },

  // English (US)
  { name: "en-US-Chirp3-HD-Achernar", label: "Wanita 1", lang: "en-US", gender: "FEMALE" },
  { name: "en-US-Chirp3-HD-Aoede", label: "Wanita 2", lang: "en-US", gender: "FEMALE" },
  { name: "en-US-Chirp3-HD-Achird", label: "Pria 1", lang: "en-US", gender: "MALE" },
  { name: "en-US-Chirp3-HD-Algenib", label: "Pria 2", lang: "en-US", gender: "MALE" },

  // Arabic (SA)
  { name: "ar-XA-Chirp3-HD-Achernar", label: "Wanita 1", lang: "ar-SA", gender: "FEMALE" },
  { name: "ar-XA-Chirp3-HD-Aoede", label: "Wanita 2", lang: "ar-SA", gender: "FEMALE" },
  { name: "ar-XA-Chirp3-HD-Achird", label: "Pria 1", lang: "ar-SA", gender: "MALE" },
  { name: "ar-XA-Chirp3-HD-Algenib", label: "Pria 2", lang: "ar-SA", gender: "MALE" },

  // Chinese (Mandarin, CN)
  { name: "cmn-CN-Chirp3-HD-Achernar", label: "Wanita 1", lang: "zh-CN", gender: "FEMALE" },
  { name: "cmn-CN-Chirp3-HD-Aoede", label: "Wanita 2", lang: "zh-CN", gender: "FEMALE" },
  { name: "cmn-CN-Chirp3-HD-Achird", label: "Pria 1", lang: "zh-CN", gender: "MALE" },
  { name: "cmn-CN-Chirp3-HD-Algenib", label: "Pria 2", lang: "zh-CN", gender: "MALE" },

  // Japanese
  { name: "ja-JP-Chirp3-HD-Achernar", label: "Wanita 1", lang: "ja-JP", gender: "FEMALE" },
  { name: "ja-JP-Chirp3-HD-Aoede", label: "Wanita 2", lang: "ja-JP", gender: "FEMALE" },
  { name: "ja-JP-Chirp3-HD-Achird", label: "Pria 1", lang: "ja-JP", gender: "MALE" },
  { name: "ja-JP-Chirp3-HD-Algenib", label: "Pria 2", lang: "ja-JP", gender: "MALE" },

  // Korean
  { name: "ko-KR-Chirp3-HD-Achernar", label: "Wanita 1", lang: "ko-KR", gender: "FEMALE" },
  { name: "ko-KR-Chirp3-HD-Aoede", label: "Wanita 2", lang: "ko-KR", gender: "FEMALE" },
  { name: "ko-KR-Chirp3-HD-Achird", label: "Pria 1", lang: "ko-KR", gender: "MALE" },
  { name: "ko-KR-Chirp3-HD-Algenib", label: "Pria 2", lang: "ko-KR", gender: "MALE" },

  // French
  { name: "fr-FR-Chirp3-HD-Achernar", label: "Wanita 1", lang: "fr-FR", gender: "FEMALE" },
  { name: "fr-FR-Chirp3-HD-Aoede", label: "Wanita 2", lang: "fr-FR", gender: "FEMALE" },
  { name: "fr-FR-Chirp3-HD-Achird", label: "Pria 1", lang: "fr-FR", gender: "MALE" },
  { name: "fr-FR-Chirp3-HD-Algenib", label: "Pria 2", lang: "fr-FR", gender: "MALE" },

  // German
  { name: "de-DE-Chirp3-HD-Achernar", label: "Wanita 1", lang: "de-DE", gender: "FEMALE" },
  { name: "de-DE-Chirp3-HD-Aoede", label: "Wanita 2", lang: "de-DE", gender: "FEMALE" },
  { name: "de-DE-Chirp3-HD-Achird", label: "Pria 1", lang: "de-DE", gender: "MALE" },
  { name: "de-DE-Chirp3-HD-Algenib", label: "Pria 2", lang: "de-DE", gender: "MALE" },

  // Spanish
  { name: "es-ES-Chirp3-HD-Achernar", label: "Wanita 1", lang: "es-ES", gender: "FEMALE" },
  { name: "es-ES-Chirp3-HD-Aoede", label: "Wanita 2", lang: "es-ES", gender: "FEMALE" },
  { name: "es-ES-Chirp3-HD-Achird", label: "Pria 1", lang: "es-ES", gender: "MALE" },
  { name: "es-ES-Chirp3-HD-Algenib", label: "Pria 2", lang: "es-ES", gender: "MALE" },

  // Malay
  { name: "ms-MY-Standard-A", label: "Wanita 1", lang: "ms-MY", gender: "FEMALE" },
  { name: "ms-MY-Standard-C", label: "Wanita 2", lang: "ms-MY", gender: "FEMALE" },
  { name: "ms-MY-Standard-B", label: "Pria 1", lang: "ms-MY", gender: "MALE" },
  { name: "ms-MY-Standard-D", label: "Pria 2", lang: "ms-MY", gender: "MALE" },

]
