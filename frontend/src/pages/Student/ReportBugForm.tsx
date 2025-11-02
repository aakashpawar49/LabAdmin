import React, { useState } from 'react';
import PageMeta from '../../components/common/PageMeta';
import { useAuth } from '../../context/AuthContext';

export default function ReportBugForm() {
  const { token } = useAuth();
  const [deviceId, setDeviceId] = useState<number>(0);
  const [description, setDescription] = useState('');
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('DeviceId', String(deviceId));
      formData.append('Description', description);
      if (screenshot) formData.append('Screenshot', screenshot);

      const res = await fetch('http://localhost:5285/api/Ticket/report', {
        method: 'POST',
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        body: formData,
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || 'Failed to submit bug report');
      }

      setSuccess('Bug reported successfully');
      setDeviceId(0);
      setDescription('');
      setScreenshot(null);
    } catch (err: any) {
      setError(err.message || 'Error submitting bug');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <PageMeta title="Report Bug" description="Report a lab issue with optional screenshot" />
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="w-full max-w-xl p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Report a Bug</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="p-3 text-sm text-red-700 bg-red-100 border border-red-300 rounded-lg dark:bg-red-900 dark:text-red-300">{error}</div>}
            {success && <div className="p-3 text-sm text-green-700 bg-green-100 border border-green-300 rounded-lg dark:bg-green-900 dark:text-green-300">{success}</div>}

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Device ID *</label>
              <input type="number" value={deviceId} onChange={(e) => setDeviceId(parseInt(e.target.value || '0'))} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Issue Description *</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} required rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="Describe the problem in detail" />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Screenshot (optional)</label>
              <input type="file" accept="image/*" onChange={(e) => setScreenshot(e.target.files?.[0] || null)} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" />
            </div>

            <button type="submit" disabled={isSubmitting} className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50">
              {isSubmitting ? 'Submitting...' : 'Submit Bug Report'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}


