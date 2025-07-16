// // export const url="https://bulkmsg-backend.onrender.com"
// export const url="http://localhost:5000"

const isElectron = () =>
  typeof window !== 'undefined' &&
  window.process &&
  window.process.type === 'renderer';

export const url = isElectron()
  ? "http://98.81.180.104:5000" // for Electron build
  : "http://localhost:5000";               // for local dev
