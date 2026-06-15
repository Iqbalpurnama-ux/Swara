import { renderHook, act } from '@testing-library/react';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';

// Mock store
jest.mock('@/store/uiStore', () => ({
  useUiStore: () => ({
    addNotification: jest.fn(),
  })
}));

// Mock socket.io-client
jest.mock('socket.io-client', () => {
  const mSocket = {
    on: jest.fn(),
    emit: jest.fn(),
    disconnect: jest.fn(),
    connected: true,
  };
  return {
    io: jest.fn(() => mSocket)
  };
});

describe('useSpeechRecognition', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with correct default state', () => {
    const { result } = renderHook(() => useSpeechRecognition());

    expect(result.current.isRecording).toBe(false);
    expect(result.current.finalTranscript).toBe('');
    expect(result.current.interimTranscript).toBe('');
    expect(result.current.language).toBe('id-ID');
  });

  it('should clear transcript correctly', () => {
    const { result } = renderHook(() => useSpeechRecognition());
    
    act(() => {
      result.current.setFinalTranscript('Hello');
      result.current.setInterimTranscript('World');
    });

    expect(result.current.finalTranscript).toBe('Hello');
    expect(result.current.interimTranscript).toBe('World');

    act(() => {
      result.current.clearTranscript();
    });

    expect(result.current.finalTranscript).toBe('');
    expect(result.current.interimTranscript).toBe('');
  });
});
