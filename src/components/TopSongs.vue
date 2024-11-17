<template>
  <div class="bg-black/20 rounded-lg backdrop-blur-sm">
    <div class="p-4 border-b border-[#00ff00]/10">
      <h2 class="text-xl font-semibold flex items-center gap-2 mb-4 text-[#00ff00] drop-shadow-[0_0_4px_rgba(0,255,0,0.5)]">
        <Music2 class="h-5 w-5" />
        MERC Trending
      </h2>
      <div class="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-[#00ff00]/30 scrollbar-track-[#00ff00]/5">
        <button
          v-for="(category, index) in categories"
          :key="index"
          class="flex items-center gap-2 px-4 py-2 bg-[#00ff00]/10 rounded-full hover:bg-[#00ff00]/20 transition-colors text-[#00ff00] whitespace-nowrap drop-shadow-[0_0_4px_rgba(0,255,0,0.5)]"
        >
          <component :is="category.icon" class="h-4 w-4" />
          <span class="text-sm">{{ category.label }}</span>
        </button>
      </div>
    </div>
    <div class="divide-y divide-[#00ff00]/10">
      <button
        v-for="song in songs"
        :key="song.id"
        @click="$emit('selectSong', song)"
        :class="[
          'w-full px-4 py-3 flex items-center gap-4 hover:bg-[#00ff00]/5 transition-colors',
          currentSong?.id === song.id ? 'bg-[#00ff00]/10' : ''
        ]"
      >
        <div class="w-12 h-12 shrink-0">
          <img
            :src="song.coverUrl"
            :alt="song.title"
            class="w-full h-full object-cover rounded-md"
          />
        </div>
        <div class="flex-1 text-left">
          <h3 class="font-medium truncate text-[#00ff00] drop-shadow-[0_0_4px_rgba(0,255,0,0.5)]">{{ song.title }}</h3>
          <p class="text-sm text-[#00ff00]/70 truncate">{{ song.artist }}</p>
        </div>
        <div class="text-sm text-[#00ff00]/70">{{ song.duration }}</div>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Music2, Blocks, Bot, Coins } from 'lucide-vue-next'
import type { Song } from '../types'

defineProps<{
  currentSong: Song | null
}>()

defineEmits<{
  (e: 'selectSong', song: Song): void
}>()

const categories = [
  { icon: Blocks, label: "区块链音乐" },
  { icon: Bot, label: "数字人音乐" },
  { icon: Coins, label: "NFT音乐专辑" },
]

const songs: Song[] = [
  {
    id: 1,
    title: "BTC Anthem",
    artist: "MERC Crypto",
    coverUrl: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=400&auto=format&fit=crop",
    duration: "3:45",
    rank: 1,
    audioUrl: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3",
    lyrics: ["Digital gold in the night", "Satoshi's vision shining bright", "Decentralized we unite", "Bitcoin leading us to light"]
  },
  {
    id: 2,
    title: "Web3 Revolution",
    artist: "MERC Chain",
    coverUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&auto=format&fit=crop",
    duration: "4:20",
    rank: 2,
    audioUrl: "https://cdn.pixabay.com/download/audio/2022/10/25/audio_946b147b6a.mp3",
    lyrics: ["Breaking free from the old ways", "Web3 leading through the haze", "Decentralized amazing phase", "Future's bright in crypto days"]
  },
  {
    id: 3,
    title: "NFT Dreams",
    artist: "MERC Collective",
    coverUrl: "https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?w=400&auto=format&fit=crop",
    duration: "3:58",
    rank: 3,
    audioUrl: "https://cdn.pixabay.com/download/audio/2023/02/28/audio_b39079c34d.mp3",
    lyrics: ["Digital art in cyberspace", "NFTs moving at their pace", "Building future's marketplace", "Decentralized embrace"]
  },
  {
    id: 4,
    title: "HODL Life",
    artist: "MERC Beats",
    coverUrl: "https://images.unsplash.com/photo-1609554496796-c345a5335ceb?w=400&auto=format&fit=crop",
    duration: "4:15",
    rank: 4,
    audioUrl: "https://cdn.pixabay.com/download/audio/2023/03/19/audio_e243a239df.mp3",
    lyrics: ["HODL strong through day and night", "Diamond hands holding tight", "To the moon we take flight", "Future's looking crypto bright"]
  },
  {
    id: 5,
    title: "Digital Future",
    artist: "MERC Protocol",
    coverUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&auto=format&fit=crop",
    duration: "3:33",
    rank: 5,
    audioUrl: "https://cdn.pixabay.com/download/audio/2022/11/22/audio_038b53dd0f.mp3",
    lyrics: ["In the code we trust", "Breaking banks to dust", "Decentralized is just", "Crypto's rise is must"]
  },
  {
    id: 6,
    title: "Blockchain Beat",
    artist: "MERC Mining",
    coverUrl: "https://images.unsplash.com/photo-1642790551116-18e150f248e5?w=400&auto=format&fit=crop",
    duration: "4:02",
    rank: 6,
    audioUrl: "https://cdn.pixabay.com/download/audio/2023/05/15/audio_1b1b6f5e64.mp3",
    lyrics: ["Mining blocks in cyberspace", "Digital gold sets the pace", "Decentralized embrace", "Future money finds its place"]
  },
  {
    id: 7,
    title: "Metaverse Nights",
    artist: "MERC Virtual",
    coverUrl: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=400&auto=format&fit=crop",
    duration: "3:47",
    rank: 7,
    audioUrl: "https://cdn.pixabay.com/download/audio/2023/06/10/audio_8129e43c42.mp3",
    lyrics: ["Virtual worlds come alive", "In the metaverse we thrive", "Digital dreams survive", "New reality we derive"]
  },
  {
    id: 8,
    title: "DeFi Symphony",
    artist: "MERC Finance",
    coverUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&auto=format&fit=crop",
    duration: "4:10",
    rank: 8,
    audioUrl: "https://cdn.pixabay.com/download/audio/2023/07/20/audio_2f93c7c245.mp3",
    lyrics: ["Financial freedom calls", "DeFi breaking down walls", "Traditional banking falls", "New system enthralls"]
  },
  {
    id: 9,
    title: "Smart Contract Love",
    artist: "MERC Code",
    coverUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&auto=format&fit=crop",
    duration: "3:55",
    rank: 9,
    audioUrl: "https://cdn.pixabay.com/download/audio/2023/08/15/audio_1f1e821593.mp3",
    lyrics: ["Code is law in this space", "Smart contracts set the pace", "Trust in math we embrace", "Automation with grace"]
  },
  {
    id: 10,
    title: "Crypto Dawn",
    artist: "MERC Future",
    coverUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&auto=format&fit=crop",
    duration: "4:05",
    rank: 10,
    audioUrl: "https://cdn.pixabay.com/download/audio/2023/09/10/audio_4f2e384729.mp3",
    lyrics: ["New day is breaking through", "Crypto world shining new", "Digital dreams come true", "Future coming into view"]
  },
  {
    id: 11,
    title: "DAO Revolution",
    artist: "MERC Governance",
    coverUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&auto=format&fit=crop",
    duration: "3:50",
    rank: 11,
    audioUrl: "https://cdn.pixabay.com/download/audio/2023/10/05/audio_5a3b492857.mp3",
    lyrics: ["Decentralized we stand", "Governance by our hand", "Community-led band", "Future we command"]
  },
  {
    id: 12,
    title: "Digital Identity",
    artist: "MERC Self",
    coverUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&auto=format&fit=crop",
    duration: "4:12",
    rank: 12,
    audioUrl: "https://cdn.pixabay.com/download/audio/2023/11/01/audio_6c4d593968.mp3",
    lyrics: ["Who we are online", "Digital souls align", "Privacy divine", "Identity redesign"]
  },
  {
    id: 13,
    title: "Chain Harmony",
    artist: "MERC Network",
    coverUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&auto=format&fit=crop",
    duration: "3:40",
    rank: 13,
    audioUrl: "https://cdn.pixabay.com/download/audio/2023/11/20/audio_7d5e694079.mp3",
    lyrics: ["Networks intertwine", "Blockchains all align", "Cross-chain design", "Future so fine"]
  },
  {
    id: 14,
    title: "Zero Knowledge",
    artist: "MERC Privacy",
    coverUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&auto=format&fit=crop",
    duration: "4:08",
    rank: 14,
    audioUrl: "https://cdn.pixabay.com/download/audio/2023/12/10/audio_8f6g795180.mp3",
    lyrics: ["Privacy in code", "Zero knowledge mode", "Security bestowed", "Trust implicitly showed"]
  },
  {
    id: 15,
    title: "Layer 2 Dreams",
    artist: "MERC Scaling",
    coverUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&auto=format&fit=crop",
    duration: "3:58",
    rank: 15,
    audioUrl: "https://cdn.pixabay.com/download/audio/2024/01/05/audio_9h7h896291.mp3",
    lyrics: ["Scaling to the sky", "Layer 2 so high", "Speed and low fees fly", "Future's drawing nigh"]
  },
  {
    id: 16,
    title: "Oracle Rhythm",
    artist: "MERC Data",
    coverUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&auto=format&fit=crop",
    duration: "4:15",
    rank: 16,
    audioUrl: "https://cdn.pixabay.com/download/audio/2024/01/20/audio_0i8i907302.mp3",
    lyrics: ["Data flows so free", "Oracles help us see", "Truth in harmony", "Future's guarantee"]
  },
  {
    id: 17,
    title: "Staking Beats",
    artist: "MERC Validator",
    coverUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&auto=format&fit=crop",
    duration: "3:52",
    rank: 17,
    audioUrl: "https://cdn.pixabay.com/download/audio/2024/02/01/audio_1j9j018413.mp3",
    lyrics: ["Stake your coins with pride", "Validation ride", "Network fortified", "Rewards multiplied"]
  },
  {
    id: 18,
    title: "Gas Fee Blues",
    artist: "MERC Miner",
    coverUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&auto=format&fit=crop",
    duration: "4:05",
    rank: 18,
    audioUrl: "https://cdn.pixabay.com/download/audio/2024/02/15/audio_2k0k129524.mp3",
    lyrics: ["Gas fees running high", "Miners' profits fly", "Users wonder why", "Solutions we try"]
  },
  {
    id: 19,
    title: "Wallet Dance",
    artist: "MERC Security",
    coverUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&auto=format&fit=crop",
    duration: "3:48",
    rank: 19,
    audioUrl: "https://cdn.pixabay.com/download/audio/2024/03/01/audio_3l1l230635.mp3",
    lyrics: ["Keep your keys secure", "Self-custody pure", "Independence sure", "Freedom will endure"]
  },
  {
    id: 20,
    title: "Genesis Block",
    artist: "MERC Origins",
    coverUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&auto=format&fit=crop",
    duration: "4:20",
    rank: 20,
    audioUrl: "https://cdn.pixabay.com/download/audio/2024/03/10/audio_4m2m341746.mp3",
    lyrics: ["From the very start", "Blockchain as an art", "Never shall we part", "Future in our heart"]
  }
]
</script>