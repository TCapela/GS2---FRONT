import { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, // Modo estrito do React para ajudar a identificar problemas no código
  async rewrites() {
    return [
      {
        source: "/api/:path*", // Rota de origem no frontend
        destination: "http://localhost:8080/:path*", // URL de destino no backend
      },
    ];
  },
};

export default nextConfig;
