import { ref, onMounted, onUnmounted } from 'vue'

export function useAudioPlayer() {
  const audio = ref<HTMLAudioElement | null>(null)
  const progress = ref(0)
  const currentTime = ref('0:00')
  const duration = ref('0:00')
  const volume = ref(0.7)
  const isLoading = ref(false)

  onMounted(() => {
    audio.value = new Audio()
    audio.value.volume = volume.value
  })

  onUnmounted(() => {
    if (audio.value) {
      audio.value.pause()
      audio.value.src = ''
    }
  })

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const updateProgress = () => {
    if (audio.value) {
      const { currentTime: current, duration: total } = audio.value
      progress.value = (current / total) * 100
      currentTime.value = formatTime(current)
      duration.value = formatTime(total)
    }
  }

  const play = async (url: string) => {
    try {
      isLoading.value = true
      
      if (audio.value) {
        if (audio.value.src !== url) {
          audio.value.src = url
          audio.value.load()
        }
        
        audio.value.addEventListener('loadeddata', () => {
          isLoading.value = false
          void audio.value?.play()
        }, { once: true })
        
        audio.value.addEventListener('timeupdate', updateProgress)
        audio.value.addEventListener('error', (e) => {
          console.error('Error loading audio:', e)
          isLoading.value = false
        })

        await audio.value.play()
      }
    } catch (error) {
      console.error('Error playing audio:', error)
      isLoading.value = false
    }
  }

  const pause = () => {
    audio.value?.pause()
  }

  const setVolumeLevel = (level: number) => {
    if (audio.value) {
      audio.value.volume = level
      volume.value = level
    }
  }

  return {
    play,
    pause,
    progress,
    currentTime,
    duration,
    volume,
    setVolume: setVolumeLevel,
    isLoading
  }
}