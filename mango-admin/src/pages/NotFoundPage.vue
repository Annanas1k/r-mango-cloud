<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const COMMAND = "cd /search-page";
const typedCommand = ref("");
const showError = ref(false);
const showTitle = ref(false);
const showHint = ref(false);
const cursorVisible = ref(true);

let cursorInterval: number | undefined;
const timeouts: number[] = [];

function typeCommand() {
  let i = 0;
  const step = () => {
    if (i <= COMMAND.length) {
      typedCommand.value = COMMAND.slice(0, i);
      i++;
      timeouts.push(window.setTimeout(step, 45 + Math.random() * 40));
    } else {
      timeouts.push(window.setTimeout(() => (showError.value = true), 350));
      timeouts.push(window.setTimeout(() => (showTitle.value = true), 700));
      timeouts.push(window.setTimeout(() => (showHint.value = true), 1050));
    }
  };
  timeouts.push(window.setTimeout(step, 400));
}

function goHome() {
  router.push("/");
}

onMounted(() => {
  typeCommand();
  cursorInterval = window.setInterval(() => {
    cursorVisible.value = !cursorVisible.value;
  }, 530);
});

onUnmounted(() => {
  if (cursorInterval) clearInterval(cursorInterval);
  timeouts.forEach((id) => clearTimeout(id));
});
</script>

<template>
  <main class="term-page">
    <div class="term-window" role="main" aria-label="Pagină negăsită">
      <div class="term-titlebar">
        <div class="term-dots">
          <span class="dot dot-red" />
          <span class="dot dot-yellow" />
          <span class="dot dot-green" />
        </div>
        <span class="term-titlebar-label">rmango-cloud-admin — zsh — 80×24</span>
      </div>

      <div class="term-body">
        <p class="term-line">
          <span class="term-prompt">admin@rmango-cloud</span><span class="term-sep">:</span><span class="term-path">~</span><span class="term-sep">$</span>
          <span class="term-cmd">&nbsp;{{ typedCommand }}</span><span
            v-if="!showError"
            class="term-cursor"
            :class="{ 'term-cursor--off': !cursorVisible }"
          >█</span>
        </p>

        <p v-if="showError" class="term-line term-output">
          zsh: no such file or directory: /search_page
        </p>

        <div v-if="showTitle" class="term-status">
          <pre class="term-ascii" aria-hidden="true">
 ██╗  ██╗ ██████╗ ██╗  ██╗
 ██║  ██║██╔═████╗██║  ██║
 ███████║██║██╔██║███████║
 ╚════██║████╔╝██║╚════██║
      ██║╚██████╔╝     ██║
      ╚═╝ ╚═════╝      ╚═╝</pre>
          <p class="term-status-text">page not found</p>
        </div>



        <p v-if="showHint" class="term-line term-final">
          <span class="term-prompt">admin@rmango-cloud</span><span class="term-sep">:</span><span class="term-path">~</span><span class="term-sep">$</span>
          <button type="button" class="term-btn" @click="goHome">
            &nbsp;cd&nbsp;~
          </button>
          <span class="term-cursor" :class="{ 'term-cursor--off': !cursorVisible }">█</span>
        </p>
      </div>
    </div>
  </main>
</template>

<style scoped>
.term-page {
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0a0d0a;
  background-image:
    radial-gradient(ellipse 80% 60% at 50% 0%, rgba(74, 222, 128, 0.06), transparent),
    repeating-linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.012) 0px,
      rgba(255, 255, 255, 0.012) 1px,
      transparent 1px,
      transparent 3px
    );
  padding: 24px;
}

.term-window {
  width: 100%;
  max-width: 640px;
  background: #0d100d;
  border: 1px solid #1f2a1f;
  border-radius: 10px;
  box-shadow:
    0 0 0 1px rgba(74, 222, 128, 0.04),
    0 24px 60px -20px rgba(0, 0, 0, 0.8),
    0 0 40px -10px rgba(74, 222, 128, 0.08);
  overflow: hidden;
}

.term-titlebar {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  background: #12160f;
  border-bottom: 1px solid #1f2a1f;
}

.term-dots {
  display: flex;
  gap: 7px;
}

.dot {
  width: 11px;
  height: 11px;
  border-radius: 50%;
  opacity: 0.85;
}

.dot-red { background: #ef4444; }
.dot-yellow { background: #eab308; }
.dot-green { background: #22c55e; }

.term-titlebar-label {
  font-family: "JetBrains Mono", "Fira Code", ui-monospace, monospace;
  font-size: 11.5px;
  color: #5c6b5c;
  margin: 0 auto;
  transform: translateX(-16px);
}

.term-body {
  padding: 24px 22px 28px;
  font-family: "JetBrains Mono", "Fira Code", ui-monospace, SFMono-Regular, monospace;
  font-size: 14px;
  line-height: 1.7;
  min-height: 320px;
}

.term-line {
  margin: 0 0 4px;
  white-space: pre-wrap;
  word-break: break-word;
}

.term-prompt {
  color: #4ade80;
  font-weight: 600;
}

.term-sep {
  color: #4ade80;
}

.term-path {
  color: #7dd3fc;
}

.term-cmd {
  color: #e5e7eb;
}

.term-cursor {
  display: inline-block;
  color: #4ade80;
  margin-left: 1px;
  transform: translateY(1px);
}

.term-cursor--off {
  opacity: 0;
}

.term-output {
  color: #f87171;
  margin-bottom: 18px;
}

.term-status {
  margin: 8px 0 20px;
  animation: term-fade-in 0.35s ease-out;
}

.term-ascii {
  margin: 0;
  color: #4ade80;
  font-size: 11px;
  line-height: 1.15;
  text-shadow: 0 0 18px rgba(74, 222, 128, 0.35);
  white-space: pre;
  overflow-x: auto;
}

.term-status-text {
  margin: 6px 0 0;
  color: #9ca3af;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  font-size: 11.5px;
}

.term-hint {
  color: #6b7a6b;
  margin-bottom: 22px;
  animation: term-fade-in 0.35s ease-out;
}

.term-final {
  animation: term-fade-in 0.35s ease-out;
}

.term-btn {
  all: unset;
  color: #e5e7eb;
  cursor: pointer;
  border-bottom: 1px solid transparent;
  transition: color 0.15s ease, border-color 0.15s ease;
}

.term-btn:hover,
.term-btn:focus-visible {
  color: #4ade80;
  border-bottom-color: #4ade80;
}

.term-btn:focus-visible {
  outline: 2px solid #4ade80;
  outline-offset: 3px;
  border-radius: 2px;
}

@keyframes term-fade-in {
  from {
    opacity: 0;
    transform: translateY(3px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .term-cursor {
    animation: none !important;
    opacity: 1 !important;
  }
  .term-status,
  .term-hint,
  .term-final {
    animation: none;
  }
}

@media (max-width: 480px) {
  .term-body {
    padding: 18px 16px 22px;
    font-size: 12.5px;
  }
  .term-ascii {
    font-size: 8.5px;
  }
  .term-titlebar-label {
    display: none;
  }
}
</style>