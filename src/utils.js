// // export const url="https://bulkmsg-backend.onrender.com"
// export const url="http://0.0.0.0:5000"


const isElectron = () =>
  typeof window !== 'undefined' &&
  window.process &&
  window.process.type === 'renderer';

export const url = isElectron()
  ? "https://backend.nirvinfertilizerandpesticidesprivatelimited.com"
  : "http://localhost:5000";               
