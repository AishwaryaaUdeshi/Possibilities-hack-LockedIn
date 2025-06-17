import React from 'react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">
          Hello World
        </h1>
        <p className="text-xl text-gray-600">
          AI-Enhanced LinkedIn About Section
        </p>
        <div className="mt-8">
          <div className="inline-block bg-white rounded-lg shadow-lg p-6">
            <p className="text-gray-700">
              Next.js + Tailwind CSS initialized successfully!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 