import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        // changeOrigin true karne se host headers backend ke mutabiq adjust ho jate hain
        changeOrigin: true,
        // Secure false kar dein agar aap local development mein http use kar rahe hain
        secure: false,
      },
    },
  },
});