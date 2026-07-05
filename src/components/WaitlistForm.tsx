'use client';

import { useState } from 'react';

export default function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('submitting');

    const webhookUrl = 'https://hook.eu1.make.com/5hve7wy9xo2pjdi88yb1okw3q8bl7tzt';
    
    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
          source: 'StackVoice API Waitlist',
          timestamp: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        setStatus('success');
        setEmail('');
      } else {
        throw new Error('Failed to submit.');
      }
    } catch (error) {
      console.error('Waitlist submission error:', error);
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      {status === 'success' ? (
        <div className="py-2.5 px-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center text-emerald-400 text-xs font-bold">
          ✓ Added to Waitlist!
        </div>
      ) : (
        <>
          <input
            type="email"
            placeholder="Developer Email"
            required
            disabled={status === 'submitting'}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2.5 text-xs text-white bg-slate-900/60 border border-slate-800 rounded-xl focus:border-indigo-500 outline-none transition-all placeholder:text-slate-600 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="w-full py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl text-center transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === 'submitting' ? 'Registering...' : 'Apply for API Access'}
          </button>
          {status === 'error' && (
            <p className="text-[10px] text-red-400 text-center">
              Oops! Something went wrong. Please try again.
            </p>
          )}
        </>
      )}
    </form>
  );
}
