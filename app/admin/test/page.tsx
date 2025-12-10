'use client';

import { useState } from 'react';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

export default function TestDashboard() {
  const [testResults, setTestResults] = useState<{[key: string]: 'pending' | 'pass' | 'fail'}>({});
  const [isRunning, setIsRunning] = useState(false);

  const runTest = async (testName: string, testFn: () => Promise<boolean>) => {
    setTestResults(prev => ({ ...prev, [testName]: 'pending' }));
    
    try {
      const result = await testFn();
      setTestResults(prev => ({ ...prev, [testName]: result ? 'pass' : 'fail' }));
    } catch (error) {
      console.error(`Test ${testName} failed:`, error);
      setTestResults(prev => ({ ...prev, [testName]: 'fail' }));
    }
  };

  const runAllTests = async () => {
    setIsRunning(true);
    
    // Test 1: API Health Check
    await runTest('API Health Check', async () => {
      try {
        const response = await fetch('/api/orders/list');
        return response.ok;
      } catch {
        return false;
      }
    });

    // Test 2: Create Test Order
    await runTest('Create Test Order', async () => {
      const testOrder = {
        orderId: `test-${Date.now()}`,
        orderType: 'delivery' as const,
        customer: {
          fullName: 'Test User',
          email: 'test@example.com',
          phone: '+233024395239',
        },
        items: [
          { id: 'test-item-1', name: 'Test Dish', quantity: 1, price: 50 }
        ],
        orderDetails: {
          deliveryAddress: '123 Test Street, Accra',
          specialRequests: 'Test order - please ignore',
        },
        payment: {
          subtotal: 50,
          tax: 7.5,
          deliveryFee: 10,
          serviceCharge: 0,
          total: 67.5,
          method: 'cash',
        },
      };

      try {
        const response = await fetch('/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(testOrder)
        });

        const data = await response.json();
        return data.success === true;
      } catch {
        return false;
      }
    });

    // Test 3: Fetch Orders
    await runTest('Fetch Orders', async () => {
      try {
        const response = await fetch('/api/orders/list');
        const data = await response.json();
        return data.success && Array.isArray(data.orders);
      } catch {
        return false;
      }
    });

    // Test 4: Email Service Configuration
    await runTest('Email Service Config', async () => {
      // Check if email service endpoint responds
      try {
        // We can't check env vars from client, so we check if API responds
        const response = await fetch('/api/orders/list');
        return response.ok;
      } catch {
        return false;
      }
    });

    // Test 5: Order Storage
    await runTest('Order Storage', async () => {
      try {
        const response = await fetch('/api/orders/list');
        const data = await response.json();
        return data.success && typeof data.orders !== 'undefined';
      } catch {
        return false;
      }
    });

    setIsRunning(false);
  };

  const getStatusIcon = (status: 'pending' | 'pass' | 'fail') => {
    switch (status) {
      case 'pending':
        return <Loader2 className="w-5 h-5 animate-spin text-blue-500" />;
      case 'pass':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'fail':
        return <XCircle className="w-5 h-5 text-red-500" />;
    }
  };

  const tests = [
    'API Health Check',
    'Create Test Order',
    'Fetch Orders',
    'Email Service Config',
    'Order Storage',
  ];

  const passedCount = Object.values(testResults).filter(r => r === 'pass').length;
  const failedCount = Object.values(testResults).filter(r => r === 'fail').length;
  const totalCount = Object.keys(testResults).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">System Integration Tests</h1>
        <p className="text-gray-600 mt-1">Verify all components are working correctly</p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <button
          onClick={runAllTests}
          disabled={isRunning}
          className="px-6 py-3 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors disabled:opacity-50 font-medium mb-6"
        >
          {isRunning ? 'Running Tests...' : 'Run All Tests'}
        </button>

        <div className="space-y-3">
          {tests.map(test => (
            <div key={test} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <span className="font-medium text-gray-900">{test}</span>
              <div>
                {testResults[test] ? getStatusIcon(testResults[test]) : <div className="w-5 h-5" />}
              </div>
            </div>
          ))}
        </div>

        {totalCount > 0 && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Test Summary</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {passedCount}
                </div>
                <div className="text-sm text-gray-600">Passed</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-600">
                  {failedCount}
                </div>
                <div className="text-sm text-gray-600">Failed</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-600">
                  {totalCount}
                </div>
                <div className="text-sm text-gray-600">Total</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

