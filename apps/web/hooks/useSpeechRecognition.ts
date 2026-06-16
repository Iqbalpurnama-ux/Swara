"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { useUiStore } from "@/store/uiStore"
import { io, Socket } from "socket.io-client"

interface UseSpeechRecognitionOptions {
  onEnd?: () => void;
  onError?: (error: string) => void;
}

export function useSpeechRecognition(options?: UseSpeechRecognitionOptions) {
  const { addNotification } = useUiStore()
  const [language, setLanguage] = useState("id-ID")
  
  const [isRecording, setIsRecording] = useState(false)
  const [finalTranscript, setFinalTranscript] = useState("")
  const [interimTranscript, setInterimTranscript] = useState("")
  
  const socketRef = useRef<Socket | null>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  
  const isRecordingRef = useRef(false)
  const settingsRef = useRef({ autoPunctuation: true })

  useEffect(() => {
    isRecordingRef.current = isRecording
  }, [isRecording])

  useEffect(() => {
    const saved = localStorage.getItem("swara_settings")
    if (saved) {
      const parsed = JSON.parse(saved)
      if (parsed.autoPunctuation !== undefined) {
        settingsRef.current.autoPunctuation = parsed.autoPunctuation
      }
      if (parsed.mainLanguage) {
        setLanguage(parsed.mainLanguage)
      }
    }
  }, [])

  useEffect(() => {
    // Initialize Socket.io client
    socketRef.current = io(process.env.NEXT_PUBLIC_WS_URL || "http://localhost:3001", {
      transports: ['websocket'],
    })

    socketRef.current.on('stt_result', (data: any) => {
      if (data.isFinal) {
        let text = data.transcript.trim()
        if (settingsRef.current.autoPunctuation && text.length > 0) {
          text = text.charAt(0).toUpperCase() + text.slice(1)
          if (!/[.!?]$/.test(text)) text += "."
        }
        setFinalTranscript(prev => prev + text + " ")
        setInterimTranscript("")
      } else {
        setInterimTranscript(data.transcript)
      }
    })

    socketRef.current.on('stt_error', (error: any) => {
      setIsRecording(false)
      addNotification("error", "AI STT Error: " + (error.message || "Unknown error"))
      options?.onError?.(error.message)
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
        mediaRecorderRef.current.stop()
      }
    })

    socketRef.current.on('disconnect', () => {
      if (isRecordingRef.current) {
        setIsRecording(false)
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
          mediaRecorderRef.current.stop()
        }
        addNotification("error", "Koneksi ke AI STT Server terputus")
      }
    })

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect()
      }
    }
  }, [addNotification, options])

  useEffect(() => {
    if (isRecording && socketRef.current?.connected) {
      // If language changes while recording, we might need to restart recognition on backend
      socketRef.current.emit("start_recognition", { languageCode: language })
    }
  }, [language])

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      
      if (!socketRef.current?.connected) {
        addNotification("error", "Koneksi ke AI Server belum siap")
        return
      }

      // 48000 is typical for WebM Opus
      socketRef.current.emit("start_recognition", { languageCode: language, sampleRate: 48000 })

      const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm;codecs=opus' })
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0 && socketRef.current?.connected) {
          socketRef.current.emit("audio_data", event.data)
        }
      }

      mediaRecorder.onstop = () => {
        stream.getTracks().forEach(track => track.stop())
      }

      // Send chunks every 250ms for low latency streaming
      mediaRecorder.start(250)
      mediaRecorderRef.current = mediaRecorder
      
      setIsRecording(true)
    } catch (err: any) {
      console.error("Microphone access error:", err)
      setIsRecording(false)
      addNotification("error", "Gagal mengakses mikrofon")
      options?.onError?.("Microphone access denied")
    }
  }, [language, addNotification, options])

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      mediaRecorderRef.current.stop()
    }
    if (socketRef.current?.connected) {
      socketRef.current.emit("stop_recognition")
    }
    setIsRecording(false)
    options?.onEnd?.()
  }, [options])

  const toggleRecording = useCallback(() => {
    if (isRecording) {
      stopRecording()
    } else {
      startRecording()
    }
  }, [isRecording, startRecording, stopRecording])

  const clearTranscript = useCallback(() => {
    setFinalTranscript("")
    setInterimTranscript("")
  }, [])

  return {
    isRecording,
    setIsRecording,
    finalTranscript,
    setFinalTranscript,
    interimTranscript,
    setInterimTranscript,
    language,
    setLanguage,
    startRecording,
    stopRecording,
    toggleRecording,
    clearTranscript,
    recognitionRef: socketRef // keep the same shape just in case
  }
}
