<template>
  <div class="container">
    <div class="content">
      <div class="number">404</div>
      <div class="text">Página perdida no espaço</div>
      <button class="home-button" @click="goHome">
        Voltar para casa
      </button>
    </div>

    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 800 600"
      class="space"
    >
      <circle cx="400" cy="300" r="150" class="planet" />
      <circle cx="650" cy="150" r="30" class="star" />
      <circle cx="200" cy="450" r="20" class="star" />
      <path d="M400 150L450 220 400 220Z" class="comet" />
      <path d="M150 200L180 230 150 230Z" class="comet" />
    </svg>
  </div>
</template>

<script setup lang="ts">
const goHome = () => {
  window.location.href = '/';
};
</script>

<style scoped>
.container {
  min-height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.content {
  text-align: center;
  position: relative;
  z-index: 2;
}

.number {
  font-size: 20vw;
  font-weight: 900;
  color: #2d3436;
  opacity: 0.1;
  margin-bottom: -5vw;
  animation: float 3s ease-in-out infinite;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.text {
  font-size: 1.5rem;
  color: #2d3436;
  margin-bottom: 2rem;
  font-weight: 500;
  opacity: 0.8;
}

.home-button {
  background: #0984e3;
  border: none;
  color: white;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(9, 132, 227, 0.2);
}

.home-button:hover {
  background: #74b9ff;
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(116, 185, 255, 0.3);
}

.space {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0.15;
}

.planet {
  fill: #d63031;
  animation: rotate 20s linear infinite;
}

.star {
  fill: #fdcb6e;
  animation: pulse 1.5s ease-in-out infinite alternate;
}

.comet {
  fill: #00b894;
  animation: cometMove 10s linear infinite;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes pulse {
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.1);
  }
}

@keyframes cometMove {
  0% {
    transform: translate(-100px, -100px);
  }
  100% {
    transform: translate(900px, 600px);
  }
}

@media (max-width: 768px) {
  .number {
    font-size: 30vw;
  }

  .text {
    font-size: 1.2rem;
  }

  .home-button {
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
  }
}
</style>
