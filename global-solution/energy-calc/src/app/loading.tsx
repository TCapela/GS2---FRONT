export default function LoadingPage() {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-semibold">Carregando...</h1>
      <p className="text-lg mt-4">Aguarde enquanto carregamos o conteúdo.</p>
      <div className="mt-6 flex justify-center">
        <div className="animate-spin">
          <svg
            className="w-12 h-12 text-green-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>
        </div>
      </div>
    </div>
    );
  }