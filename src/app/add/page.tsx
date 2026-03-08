'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { X, Tag, Clock, Plus, AlignLeft } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CountdownEvent } from '../page';

export default function AddEvent() {
  const [name, setName] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !targetDate) return;
    setIsSubmitting(true);
    
    const newEvent: CountdownEvent = {
      id: Date.now().toString(), 
      name,
      targetDate,
      description
    };
    
    const existingData = localStorage.getItem('chronos_events');
    const existingEvents: CountdownEvent[] = existingData ? JSON.parse(existingData) : [];
    localStorage.setItem('chronos_events', JSON.stringify([...existingEvents, newEvent]));
    
    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/1114/1114-preview.mp3');
    audio.play().catch(() => {});
    
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#2563eb', '#ffffff', '#94a3b8'] 
    });

    setTimeout(() => {
      window.location.href = '/';
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col selection:bg-blue-100">
      <header className="flex items-center justify-center py-5 border-b border-slate-200 bg-white sticky top-0 z-10 shadow-sm">
        <Link href="/" className="absolute left-4 p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-full transition-colors">
          <X className="w-5 h-5" />
        </Link>
        <h1 className="text-base font-bold tracking-tight">Add New Event</h1>
      </header>

      <main className="flex-1 px-6 py-8 w-full max-w-md mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="mb-8">
          <h2 className="text-3xl font-bold tracking-tight mb-2 text-slate-800">Create Countdown</h2>
          <p className="text-slate-500 text-sm">Set up a new tracking milestone.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Event Name</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Tag className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
              </div>
              <input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., Engine Deployment Phase 1" className="block w-full pl-11 pr-4 py-4 bg-white border border-slate-200 rounded-2xl text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Target Date & Time</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Clock className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
              </div>
              <input type="datetime-local" required value={targetDate} onChange={(e) => setTargetDate(e.target.value)} className="block w-full pl-11 pr-4 py-4 bg-white border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Optional Description</label>
            <div className="relative group">
              <div className="absolute top-4 left-0 pl-4 flex items-start pointer-events-none">
                <AlignLeft className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
              </div>
              <textarea 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Details about this event..."
                rows={3}
                className="block w-full pl-11 pr-4 py-4 bg-white border border-slate-200 rounded-2xl text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm resize-none"
              />
            </div>
          </div>

          <button type="submit" disabled={isSubmitting} className={`w-full ${isSubmitting ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-transform active:scale-95 mt-8 shadow-md`}>
            <Plus className="w-5 h-5 border-2 border-white rounded-full p-0.5" />
            {isSubmitting ? 'Securing...' : 'Create Countdown'}
          </button>
        </form>
      </main>
    </div>
  );
}