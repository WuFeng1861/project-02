<template>
  <div class="bg-black/20 rounded-lg p-6 backdrop-blur-sm">
    <template v-if="currentSong">
      <div class="mb-4">
        <h3 class="font-semibold text-lg truncate text-[#00ff00] drop-shadow-[0_0_4px_rgba(0,255,0,0.5)]">
          {{ currentSong.title }}
        </h3>
        <p class="text-[#00ff00]/70 text-sm truncate">{{ currentSong.artist }}</p>
      </div>

      <LyricsDisplay 
        :lyrics="currentSong.lyrics"
        :current-time="currentTime"
      />

      <div class="space-y-4">
        <div class="bg-[#00ff00]/10 rounded-full h-1">
          <div 
            class="bg-[#00ff00] h-full rounded-full transition-all duration-300"
            :style="{ width: `${progress}%` }"
          ></div>
        </div>

        <div class="flex justify-between text-sm text-[#00ff00]/70">
          <span>{{ currentTime }}</span>
          <span>{{ duration }}</span>
        </div>

        <div class="flex items-center justify-center gap-4">
          <button 
            class="p-2 text-[#00ff00] hover:text-[#00ff00]/80 transition-colors disabled:opacity-50"
            :disabled="isLoading"
          >
            <SkipBack class="h-5 w-5" />
          </button>
          <button 
            class="p-3 bg-[#00ff00]/10 rounded-full hover:bg-[#00ff00]/20 transition-colors disabled:opacity-50 text-[#00ff00]"
            @click="$emit('playPause')"
            :disabled="isLoading"
          >
            <component
              :is="isLoading ? Loader2 : isPlaying ? Pause : Play"
              :class="['h-6 w-6', { 'animate-spin': isLoading }]"
            />
          </button>
          <button 
            class="p-2 text-[#00ff00] hover:text-[#00ff00]/80 transition-colors disabled:opacity-50"
            :disabled="isLoading"
          >
            <SkipForward class="h-5 w-5" />
          </button>
        </div>

        <div class="flex items-center gap-2">
          <Volume2 class="h-4 w-4 text-[#00ff00]" />
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            :value="volume"
            @input="handleVolumeChange"
            class="flex-1 h-1 bg-[#00ff00]/10 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#00ff00]"
          />
        </div>
      </div>
    </template>
    <template v-else>
      <p class="text-center text-[#00ff00]/70">选择一首歌曲开始播放</p>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { Play, Pause, SkipForward, SkipBack, Volume2, Loader2 } from 'lucide-vue-next'
import type { Song } from '../types'
import LyricsDisplay from './LyricsDisplay.vue'
import { useAudioPlayer } from '../composables/useAudioPlayer'

const props = defineProps<{
  currentSong: Song | null
  isPlaying: boolean
}>()

defineEmits<{
  (e: 'playPause'): void
}>()

const {
  play,
  pause,
  progress,
  currentTime,
  duration,
  volume,
  setVolume,
  isLoading
} = useAudioPlayer()

watch(
  () => [props.currentSong, props.isPlaying],
  async ([song, playing]) => {
    if (song && playing) {
      await play(song.audioUrl)
    } else {
      pause()
    }
  }
)

const handleVolumeChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  setVolume(parseFloat(target.value))
}
</script>