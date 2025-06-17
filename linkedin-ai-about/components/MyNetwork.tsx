'use client';

import React, { useState, useEffect } from 'react';
import ConnectRequest from './ConnectRequest';
import { ConnectRequestData } from '../types/network';

interface MyNetworkProps {
  userId: string;
}

const MyNetwork: React.FC<MyNetworkProps> = ({ userId }) => {
  const [connectRequests, setConnectRequests] = useState<ConnectRequestData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchConnectRequests();
  }, [userId]);

  const fetchConnectRequests = async () => {
    try {
      const response = await fetch(`/api/connect-requests?userId=${userId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Check if data is an array before sorting
      if (!Array.isArray(data)) {
        console.error('Expected array but got:', data);
        setConnectRequests([]);
        return;
      }
      
      // Sort requests: verified matches first, then others
      const sortedRequests = data.sort((a: ConnectRequestData, b: ConnectRequestData) => {
        if (a.isVerifiedMatch && !b.isVerifiedMatch) return -1;
        if (!a.isVerifiedMatch && b.isVerifiedMatch) return 1;
        return 0;
      });
      
      setConnectRequests(sortedRequests);
    } catch (error) {
      console.error('Error fetching connect requests:', error);
      setConnectRequests([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptRequest = async (requestId: string) => {
    try {
      const response = await fetch('/api/connect-requests/accept', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ requestId, userId }),
      });

      if (response.ok) {
        // Remove the accepted request from the list
        setConnectRequests(prev => prev.filter(req => req.id !== requestId));
      }
    } catch (error) {
      console.error('Error accepting request:', error);
    }
  };

  const handleDeclineRequest = async (requestId: string) => {
    try {
      const response = await fetch('/api/connect-requests/decline', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ requestId, userId }),
      });

      if (response.ok) {
        // Remove the declined request from the list
        setConnectRequests(prev => prev.filter(req => req.id !== requestId));
      }
    } catch (error) {
      console.error('Error declining request:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">My Network</h1>
        <p className="text-gray-600">
          {connectRequests.length} pending invitation{connectRequests.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Connect Requests Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Invitations</h2>
        </div>
        
        <div className="divide-y divide-gray-200">
          {connectRequests.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              <p>No pending invitations</p>
            </div>
          ) : (
            connectRequests.map((request) => (
              <ConnectRequest
                key={request.id}
                request={request}
                onAccept={handleAcceptRequest}
                onDecline={handleDeclineRequest}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MyNetwork; 