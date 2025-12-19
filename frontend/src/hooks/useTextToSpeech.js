import { useState, useEffect, useRef, useCallback } from 'react';

const useTextToSpeech = (articleContent) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [voice, setVoice] = useState(null);
  const [voices, setVoices] = useState([]);
  const [highlightedWords, setHighlightedWords] = useState([]);
  const [isAvailable, setIsAvailable] = useState(false);
  
  const utteranceRef = useRef(null);
  const words = useRef([]);
  const speechRef = useRef(null);

  // Initialize speech synthesis and split content into words
  useEffect(() => {
    const checkAvailability = () => {
      const available = 'speechSynthesis' in window;
      setIsAvailable(available);
      
      if (available) {
        // Load available voices
        const loadVoices = () => {
          const availableVoices = speechSynthesis.getVoices();
          setVoices(availableVoices);
          
          // Try to find a natural-sounding English voice
          const preferredVoice = availableVoices.find(v => 
            v.lang.includes('en') && v.name.includes('Natural')
          ) || availableVoices.find(v => v.lang.includes('en-US')) || availableVoices[0];
          
          setVoice(preferredVoice);
        };
        
        loadVoices();
        speechSynthesis.onvoiceschanged = loadVoices;
      }
    };
    
    checkAvailability();
    
    // Split content into words for highlighting
    if (articleContent) {
      const text = articleContent.replace(/[^\w\s]/g, ' ');
      words.current = text.split(/\s+/).filter(word => word.length > 0);
    }
    
    return () => {
      if (speechRef.current) {
        speechSynthesis.cancel();
      }
    };
  }, [articleContent]);

  // Create speech utterance
  const createUtterance = useCallback((text) => {
    if (!isAvailable || !voice) return null;
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = voice;
    utterance.rate = playbackRate;
    utterance.pitch = 1;
    utterance.volume = 1;
    
    // Track word boundaries
    let wordIndex = 0;
    
    utterance.onboundary = (event) => {
      if (event.name === 'word') {
        const wordStart = event.charIndex;
        const wordLength = event.charLength;
        
        // Find which word this corresponds to in our words array
        const textBefore = text.substring(0, wordStart);
        const wordsBefore = textBefore.split(/\s+/).filter(w => w.length > 0);
        const currentWordIdx = wordsBefore.length;
        
        setCurrentWordIndex(currentWordIdx);
        
        // Highlight current word and surrounding words
        const startIdx = Math.max(0, currentWordIdx - 2);
        const endIdx = Math.min(words.current.length, currentWordIdx + 3);
        setHighlightedWords(Array.from({ length: endIdx - startIdx }, (_, i) => startIdx + i));
      }
    };
    
    utterance.onstart = () => {
      setIsPlaying(true);
      setIsPaused(false);
    };
    
    utterance.onend = () => {
      setIsPlaying(false);
      setCurrentWordIndex(0);
      setHighlightedWords([]);
    };
    
    utterance.onpause = () => {
      setIsPaused(true);
    };
    
    utterance.onresume = () => {
      setIsPaused(false);
    };
    
    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event.error);
      setIsPlaying(false);
      setIsPaused(false);
    };
    
    return utterance;
  }, [isAvailable, voice, playbackRate]);

  // Play speech
  const play = useCallback(() => {
    if (!isAvailable) {
      alert('Text-to-speech is not supported in your browser. Try Chrome or Edge.');
      return;
    }
    
    if (isPaused) {
      speechSynthesis.resume();
      return;
    }
    
    // Cancel any ongoing speech
    speechSynthesis.cancel();
    
    if (!articleContent) return;
    
    // Create and speak the utterance
    utteranceRef.current = createUtterance(articleContent);
    if (utteranceRef.current) {
      speechSynthesis.speak(utteranceRef.current);
      speechRef.current = utteranceRef.current;
    }
  }, [isAvailable, isPaused, articleContent, createUtterance]);

  // Pause speech
  const pause = useCallback(() => {
    if (isAvailable && isPlaying) {
      speechSynthesis.pause();
      setIsPaused(true);
    }
  }, [isAvailable, isPlaying]);

  // Stop speech
  const stop = useCallback(() => {
    if (isAvailable) {
      speechSynthesis.cancel();
      setIsPlaying(false);
      setIsPaused(false);
      setCurrentWordIndex(0);
      setHighlightedWords([]);
    }
  }, [isAvailable]);

  // Skip forward
  const skipForward = useCallback((seconds = 30) => {
    if (!utteranceRef.current || !isAvailable) return;
    
    // This is a simplified skip - in a real app you'd need more complex logic
    // to handle word-level skipping
    stop();
    
    // Find new starting point
    const wordsToSkip = Math.floor(seconds * (playbackRate * 2)); // Approximate words per second
    const newIndex = Math.min(words.current.length, currentWordIndex + wordsToSkip);
    
    // Create new utterance from the new position
    const remainingText = words.current.slice(newIndex).join(' ');
    if (remainingText.trim()) {
      utteranceRef.current = createUtterance(remainingText);
      if (utteranceRef.current) {
        speechSynthesis.speak(utteranceRef.current);
        setCurrentWordIndex(newIndex);
      }
    }
  }, [stop, currentWordIndex, playbackRate, isAvailable, createUtterance]);

  // Skip backward
  const skipBackward = useCallback((seconds = 30) => {
    if (!utteranceRef.current || !isAvailable) return;
    
    stop();
    
    const wordsToSkip = Math.floor(seconds * (playbackRate * 2));
    const newIndex = Math.max(0, currentWordIndex - wordsToSkip);
    
    const remainingText = words.current.slice(newIndex).join(' ');
    if (remainingText.trim()) {
      utteranceRef.current = createUtterance(remainingText);
      if (utteranceRef.current) {
        speechSynthesis.speak(utteranceRef.current);
        setCurrentWordIndex(newIndex);
      }
    }
  }, [stop, currentWordIndex, playbackRate, isAvailable, createUtterance]);

  // Change playback rate
  const changeRate = useCallback((newRate) => {
    setPlaybackRate(newRate);
    
    // If currently playing, restart with new rate
    if (isPlaying && utteranceRef.current) {
      const wasPaused = isPaused;
      stop();
      
      if (!wasPaused) {
        setTimeout(() => {
          const remainingText = words.current.slice(currentWordIndex).join(' ');
          if (remainingText.trim()) {
            utteranceRef.current = createUtterance(remainingText);
            if (utteranceRef.current) {
              speechSynthesis.speak(utteranceRef.current);
            }
          }
        }, 100);
      }
    }
  }, [isPlaying, isPaused, stop, currentWordIndex, createUtterance]);

  // Change voice
  const changeVoice = useCallback((newVoice) => {
    setVoice(newVoice);
    
    // If currently playing, restart with new voice
    if (isPlaying && utteranceRef.current) {
      const wasPaused = isPaused;
      stop();
      
      if (!wasPaused) {
        setTimeout(() => {
          const remainingText = words.current.slice(currentWordIndex).join(' ');
          if (remainingText.trim()) {
            utteranceRef.current = createUtterance(remainingText);
            if (utteranceRef.current) {
              speechSynthesis.speak(utteranceRef.current);
            }
          }
        }, 100);
      }
    }
  }, [isPlaying, isPaused, stop, currentWordIndex, createUtterance]);

  // Get progress percentage
  const getProgress = useCallback(() => {
    if (words.current.length === 0) return 0;
    return (currentWordIndex / words.current.length) * 100;
  }, [currentWordIndex]);

  // Get time remaining
  const getTimeRemaining = useCallback(() => {
    const wordsRemaining = words.current.length - currentWordIndex;
    const wordsPerMinute = playbackRate * 150; // Average reading speed
    const minutesRemaining = wordsRemaining / wordsPerMinute;
    
    const totalMinutes = Math.floor(minutesRemaining);
    const seconds = Math.floor((minutesRemaining - totalMinutes) * 60);
    
    return { totalMinutes, seconds };
  }, [currentWordIndex, playbackRate]);

  return {
    // State
    isPlaying,
    isPaused,
    isAvailable,
    currentWordIndex,
    playbackRate,
    voice,
    voices,
    highlightedWords,
    totalWords: words.current.length,
    progress: getProgress(),
    timeRemaining: getTimeRemaining(),
    
    // Controls
    play,
    pause,
    stop,
    skipForward,
    skipBackward,
    changeRate,
    changeVoice,
    
    // Utils
    getWordAt: (index) => words.current[index] || '',
    getWordsInRange: (start, end) => words.current.slice(start, end),
  };
};

export default useTextToSpeech;
