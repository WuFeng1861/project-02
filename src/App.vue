<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black">
    <nav class="border-b border-[#00ff00]/10 p-4 bg-black/20 backdrop-blur-sm">
      <div class="container mx-auto flex items-center justify-between">
        <div class="flex items-center gap-2">
          <Music2 class="h-8 w-8 text-[#00ff00]" />
          <h1 class="text-2xl font-bold text-[#00ff00] drop-shadow-[0_0_8px_rgba(0,255,0,0.5)]">
            MERC Music
          </h1>
        </div>
        <button
          @click="showAIGenerator = true"
          class="flex items-center gap-2 px-4 py-2 bg-[#00ff00]/10 rounded-full hover:bg-[#00ff00]/20 transition-colors text-[#00ff00] drop-shadow-[0_0_4px_rgba(0,255,0,0.5)]"
        >
          <Plus class="h-5 w-5" />
          <span>100枚MERC支付</span>
        </button>
      </div>
    </nav>

    <main class="container mx-auto p-4">
      <div class="grid lg:grid-cols-[1fr,300px] gap-6">
        <div>
          <TopSongs 
            :current-song="currentSong"
            @select-song="handleSongSelect"
          />
        </div>
        
        <div class="lg:border-l lg:border-[#00ff00]/10 lg:pl-6">
          <div class="sticky top-4">
            <h2 class="text-xl font-semibold mb-4 flex items-center gap-2 text-[#00ff00] drop-shadow-[0_0_4px_rgba(0,255,0,0.5)]">
              <List class="h-5 w-5" />
              正在播放
            </h2>
            <MusicPlayer 
              :current-song="currentSong"
              :is-playing="isPlaying"
              @play-pause="isPlaying = !isPlaying"
            />
          </div>
        </div>
      </div>
    </main>

    <AIGenerator
      v-if="showAIGenerator"
      @close="showAIGenerator = false"
      @generate="handleGenerate"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Music2, Plus, List } from 'lucide-vue-next'
import type { Song } from './types'
import TopSongs from './components/TopSongs.vue'
import MusicPlayer from './components/MusicPlayer.vue'
import AIGenerator from './components/AIGenerator.vue'

const currentSong = ref<Song | null>(null)
const isPlaying = ref(false)
const showAIGenerator = ref(false)

const handleSongSelect = (song: Song) => {
  currentSong.value = song
  isPlaying.value = true
}

const handleGenerate = (song: Song) => {
  currentSong.value = song
  isPlaying.value = true
  showAIGenerator.value = false
}
</script>