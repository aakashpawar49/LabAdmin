import React, { useState } from 'react';
import PageMeta from '../../components/common/PageMeta';
import { useAuth } from '../../context/AuthContext';

export default function RequestSoftwareForm() {
  const { token } = useAuth();
  const [deviceId, setDeviceId] = useState<number>(0);
  const [softwareName, setSoftwareName] = useState('');
  const [version, setVersion] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsSubmitting(true);

    try {
      const res = await fetch('http://localhost:5285/api/SoftwareRequest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ deviceId, softwareName, version }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || 'Failed to submit software request');
      }

      setSuccess('Software request submitted');
      setDeviceId(0);
      setSoftwareName('');
      setVersion('');
    } catch (err: any) {
      setError(err.message || 'Error submitting request');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <PageMeta title="Request Software" description="Request software installation for a device" />
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="w-full max-w-xl p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Request Software</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="p-3 text-sm text-red-700 bg-red-100 border border-red-300 rounded-lg dark:bg-red-900 dark:text-red-300">{error}</div>}
            {success && <div className="p-3 text-sm text-green-700 bg-green-100 border border-green-300 rounded-lg dark:bg-green-900 dark:text-green-300">{success}</div>}

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Device ID *</label>
              <input type="number" value={deviceId} onChange={(e) => setDeviceId(parseInt(e.target.value || '0'))} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Software Name *</label>
              <input type="text" value={softwareName} onChange={(e) => setSoftwareName(e.target.value)} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="e.g., Visual Studio Code" />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Version (optional)</label>
              <input type="text" value={version} onChange={(e) => setVersion(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="e.g., 1.85.2" />
            </div>

            <button type="submit" disabled={isSubmitting} className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50">
              {isSubmitting ? 'Submitting...' : 'Submit Request'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}


