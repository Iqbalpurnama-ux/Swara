export interface Voice {
  name: string
  label: string
  lang: string
  gender: "MALE" | "FEMALE" | "NEUTRAL"
}

export const VOICES: Voice[] = [
  // Indonesian
  { name: "id-ID-Wavenet-A", label: "Wanita 1", lang: "id-ID", gender: "FEMALE" },
  { name: "id-ID-Wavenet-D", label: "Wanita 2", lang: "id-ID", gender: "FEMALE" },
  { name: "id-ID-Wavenet-B", label: "Pria 1", lang: "id-ID", gender: "MALE" },
  { name: "id-ID-Wavenet-C", label: "Pria 2", lang: "id-ID", gender: "MALE" },

  // English (US)
  { name: "en-US-Journey-F", label: "Wanita (Journey)", lang: "en-US", gender: "FEMALE" },
  { name: "en-US-Wavenet-F", label: "Wanita 2", lang: "en-US", gender: "FEMALE" },
  { name: "en-US-Journey-D", label: "Pria (Journey)", lang: "en-US", gender: "MALE" },
  { name: "en-US-Wavenet-D", label: "Pria 2", lang: "en-US", gender: "MALE" },

  // Arabic (SA)
  { name: "ar-SA-Wavenet-A", label: "Wanita", lang: "ar-SA", gender: "FEMALE" },
  { name: "ar-SA-Wavenet-B", label: "Pria 1", lang: "ar-SA", gender: "MALE" },
  { name: "ar-SA-Wavenet-C", label: "Pria 2", lang: "ar-SA", gender: "MALE" },

  // Chinese (Mandarin, CN)
  { name: "cmn-CN-Wavenet-A", label: "Wanita 1", lang: "zh-CN", gender: "FEMALE" },
  { name: "cmn-CN-Wavenet-D", label: "Wanita 2", lang: "zh-CN", gender: "FEMALE" },
  { name: "cmn-CN-Wavenet-B", label: "Pria 1", lang: "zh-CN", gender: "MALE" },
  { name: "cmn-CN-Wavenet-C", label: "Pria 2", lang: "zh-CN", gender: "MALE" },

  // Japanese
  { name: "ja-JP-Wavenet-A", label: "Wanita 1", lang: "ja-JP", gender: "FEMALE" },
  { name: "ja-JP-Wavenet-B", label: "Wanita 2", lang: "ja-JP", gender: "FEMALE" },
  { name: "ja-JP-Wavenet-C", label: "Pria 1", lang: "ja-JP", gender: "MALE" },
  { name: "ja-JP-Wavenet-D", label: "Pria 2", lang: "ja-JP", gender: "MALE" },

  // Korean
  { name: "ko-KR-Wavenet-A", label: "Wanita 1", lang: "ko-KR", gender: "FEMALE" },
  { name: "ko-KR-Wavenet-B", label: "Wanita 2", lang: "ko-KR", gender: "FEMALE" },
  { name: "ko-KR-Wavenet-C", label: "Pria 1", lang: "ko-KR", gender: "MALE" },
  { name: "ko-KR-Wavenet-D", label: "Pria 2", lang: "ko-KR", gender: "MALE" },

  // French
  { name: "fr-FR-Wavenet-A", label: "Wanita 1", lang: "fr-FR", gender: "FEMALE" },
  { name: "fr-FR-Wavenet-C", label: "Wanita 2", lang: "fr-FR", gender: "FEMALE" },
  { name: "fr-FR-Wavenet-B", label: "Pria 1", lang: "fr-FR", gender: "MALE" },
  { name: "fr-FR-Wavenet-D", label: "Pria 2", lang: "fr-FR", gender: "MALE" },

  // German
  { name: "de-DE-Wavenet-A", label: "Wanita 1", lang: "de-DE", gender: "FEMALE" },
  { name: "de-DE-Wavenet-C", label: "Wanita 2", lang: "de-DE", gender: "FEMALE" },
  { name: "de-DE-Wavenet-B", label: "Pria 1", lang: "de-DE", gender: "MALE" },
  { name: "de-DE-Wavenet-D", label: "Pria 2", lang: "de-DE", gender: "MALE" },

  // Spanish
  { name: "es-ES-Wavenet-C", label: "Wanita 1", lang: "es-ES", gender: "FEMALE" },
  { name: "es-ES-Wavenet-D", label: "Wanita 2", lang: "es-ES", gender: "FEMALE" },
  { name: "es-ES-Wavenet-B", label: "Pria", lang: "es-ES", gender: "MALE" },

  // Malay
  { name: "ms-MY-Wavenet-A", label: "Wanita 1", lang: "ms-MY", gender: "FEMALE" },
  { name: "ms-MY-Wavenet-C", label: "Wanita 2", lang: "ms-MY", gender: "FEMALE" },
  { name: "ms-MY-Wavenet-B", label: "Pria 1", lang: "ms-MY", gender: "MALE" },
  { name: "ms-MY-Wavenet-D", label: "Pria 2", lang: "ms-MY", gender: "MALE" },
]
