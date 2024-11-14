<style>
:root {
  --foreground: #28282d;
}

html,
body {
  margin: 0;
  min-height: 100vh;
  overflow-x: hidden;
  background-image: url("/background.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

body {
  color: var(--foreground);
  background: var(--background);
  font-family: Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>

<template>
  <div>
    <Gallery />
  </div>
</template>
