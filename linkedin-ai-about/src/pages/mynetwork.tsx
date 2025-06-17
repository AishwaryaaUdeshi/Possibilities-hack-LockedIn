import React from 'react';
import Head from 'next/head';
import MyNetwork from '../../components/MyNetwork';

const MyNetworkPage: React.FC = () => {
  // Mock user ID for demo purposes
  const mockUserId = '1';

  return (
    <>
      <Head>
        <title>My Network - LinkedIn Clone</title>
        <meta name="description" content="LinkedIn My Network page with verified matches" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* LinkedIn-style Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <h1 className="text-2xl font-bold text-blue-600">LinkedIn</h1>
                </div>
              </div>
              
              <nav className="flex space-x-8">
                <a href="#" className="text-gray-500 hover:text-gray-700 px-3 py-2 text-sm font-medium">
                  Home
                </a>
                <a href="#" className="text-blue-600 border-b-2 border-blue-600 px-3 py-2 text-sm font-medium">
                  My Network
                </a>
                <a href="#" className="text-gray-500 hover:text-gray-700 px-3 py-2 text-sm font-medium">
                  Jobs
                </a>
                <a href="#" className="text-gray-500 hover:text-gray-700 px-3 py-2 text-sm font-medium">
                  Messaging
                </a>
                <a href="#" className="text-gray-500 hover:text-gray-700 px-3 py-2 text-sm font-medium">
                  Notifications
                </a>
              </nav>

              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="py-8">
          <MyNetwork userId={mockUserId} />
        </main>
      </div>
    </>
  );
};

export default MyNetworkPage; 