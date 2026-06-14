import { useState, useEffect, useRef, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';

interface UseAudioStreamProps {
  serverUrl?: string;
  languageCode?: string;
}

export const useAudioStream = ({
  serverUrl = 'http://localhost:3001', // Default backend port for NestJS in Monorepo
  languageCode = 'id-ID',
}: UseAudioStreamProps = {}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isSocketConnected, setIsSocketConnected] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);

  const socketRef = useRef<Socket | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    // Initialize Socket.io
    const socket = io(serverUrl);
    socketRef.current = socket;

    socket.on('connect', () => {
      console.log('Connected to STT Server');
      setIsSocketConnected(true);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from STT Server');
      setIsSocketConnected(false);
    });

    socket.on('stt_result', (data: { transcript: string; isFinal: boolean }) => {
      if (data.isFinal) {
        setTranscript((prev) => prev + ' ' + data.transcript);
        setInterimTranscript('');
      } else {
        setInterimTranscript(data.transcript);
      }
    });

    socket.on('stt_error', (data: { message: string }) => {
      setError(data.message);
      stopRecording();
    });

    return () => {
      socket.disconnect();
    };
  }, [serverUrl]);

  const startRecording = useCallback(async () => {
    try {
      setError(null);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      // Start recognition on the server
      socketRef.current?.emit('start_recognition', { languageCode, sampleRate: 48000 });

      // Record in WebM Opus which Google Cloud supports nicely
      const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm;codecs=opus' });
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0 && socketRef.current?.connected) {
          socketRef.current.emit('audio_data', event.data);
        }
      };

      // Emit chunk every 250ms
      mediaRecorder.start(250);
      setIsRecording(true);
    } catch (err: any) {
      setError(err.message || 'Microphone permission denied');
    }
  }, [languageCode]);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }
    
    socketRef.current?.emit('stop_recognition');
    setIsRecording(false);
  }, []);

  const clearTranscript = useCallback(() => {
    setTranscript('');
    setInterimTranscript('');
  }, []);

  return {
    isRecording,
    isSocketConnected,
    transcript,
    interimTranscript,
    error,
    startRecording,
    stopRecording,
    clearTranscript,
  };
};
