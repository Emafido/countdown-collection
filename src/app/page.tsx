'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { Rocket, Plus, Trash2, Edit2, X, Clock, CheckCircle2, ArchiveRestore } from 'lucide-react';
import { differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds } from 'date-fns';
import Swal from 'sweetalert2';
import confetti from 'canvas-confetti';

export interface CountdownEvent {
  id: string;
  name: string;
  targetDate: string;
  description?: string;
  status?: 'active' | 'completed';
}

const playSound = (type: 'delete' | 'click' | 'success') => {
  const audio = new Audio(
    type === 'delete' 
      ? 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3' 
      : type === 'success'
      ? 'https://assets.mixkit.co/active_storage/sfx/1114/1114-preview.mp3'
      : 'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3'
  );
  audio.play().catch(() => {}); 
};

const TimerCard = ({ event, onDelete, onEdit, onComplete, isHero = false }: { event: CountdownEvent, onDelete: (id: string) => void, onEdit: (event: CountdownEvent) => void, onComplete: (id: string) => void, isHero?: boolean }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });
  const [isExpired, setIsExpired] = useState(event.status === 'completed');
  const hasAlerted = useRef(false);

  const isCompleted = event.status === 'completed';

  const triggerCompleteAlert = useCallback(() => {
    playSound('click');
    Swal.fire({
      title: 'Milestone Reached!',
      html: `<p class="text-slate-500">The countdown for <strong class="text-slate-800">${event.name}</strong> has finished.</p>`,
      icon: 'success',
      confirmButtonText: 'Mark as Completed',
      confirmButtonColor: '#2563eb',
      showCancelButton: true,
      cancelButtonText: 'Keep viewing',
      customClass: {
        popup: 'rounded-3xl font-sans',
        confirmButton: 'rounded-xl shadow-md',
        cancelButton: 'rounded-xl'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        onComplete(event.id);
      }
    });
  }, [event, onComplete]);

  useEffect(() => {
    const calculateTime = () => {
      if (isCompleted) {
        setIsExpired(true);
        setTimeLeft({ days: 0, hours: 0, mins: 0, secs: 0 });
        return;
      }

      const target = new Date(event.targetDate).getTime();
      const now = new Date().getTime();
      
      if (target <= now) {
        setIsExpired(true);
        setTimeLeft({ days: 0, hours: 0, mins: 0, secs: 0 });
        
        if (!hasAlerted.current) {
          hasAlerted.current = true;
          triggerCompleteAlert();
        }
      } else {
        setIsExpired(false);
        setTimeLeft({
          days: Math.max(0, differenceInDays(target, now)),
          hours: Math.max(0, differenceInHours(target, now) % 24),
          mins: Math.max(0, differenceInMinutes(target, now) % 60),
          secs: Math.max(0, differenceInSeconds(target, now) % 60),
        });
      }
    };

    calculateTime();

    if (isCompleted) return;

    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [event.targetDate, isCompleted, triggerCompleteAlert]);

  const totalDays = 30; 
  const progress = isExpired ? 1 : Math.min(timeLeft.days / totalDays, 1);
  const strokeDashoffset = 283 - (283 * progress);
  const isUrgent = timeLeft.days <= 3 && !isExpired;

  return (
    <div className={`${isHero ? 'bg-slate-900 text-white' : 'bg-white text-slate-800'} rounded-3xl p-6 shadow-sm border ${isHero ? 'border-slate-800 shadow-xl' : 'border-slate-100'} flex flex-col items-center relative transition-all hover:-translate-y-1`}>
      <div className="absolute top-4 right-4 flex gap-2">
        {!isCompleted && (
          <button onClick={triggerCompleteAlert} className={`${isHero ? 'text-slate-400 hover:text-green-400' : 'text-slate-300 hover:text-green-500'} transition-colors p-1`} title="Mark Completed">
            <CheckCircle2 className="w-4 h-4" />
          </button>
        )}
        {!isCompleted && (
          <button onClick={() => { playSound('click'); onEdit(event); }} className={`${isHero ? 'text-slate-400 hover:text-white' : 'text-slate-300 hover:text-blue-500'} transition-colors p-1`}>
            <Edit2 className="w-4 h-4" />
          </button>
        )}
        <button onClick={() => { playSound('delete'); onDelete(event.id); }} className={`${isHero ? 'text-slate-400 hover:text-red-400' : 'text-slate-300 hover:text-red-500'} transition-colors p-1`}>
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      <div className="relative w-32 h-32 mb-4 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90 transition-all duration-1000 ease-in-out" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="none" stroke={isHero ? "#334155" : "#f1f5f9"} strokeWidth="8" />
          <circle 
            cx="50" cy="50" r="45" fill="none" stroke={isExpired ? "#10b981" : isUrgent ? "#ef4444" : "#3b82f6"} 
            strokeWidth="8" strokeDasharray="283" strokeDashoffset={strokeDashoffset} strokeLinecap="round" 
          />
        </svg>
        <div className="absolute flex flex-col items-center text-center">
          {isExpired ? (
            <CheckCircle2 className={`w-10 h-10 ${isHero ? 'text-green-400' : 'text-green-500'}`} />
          ) : (
            <>
              <span className="text-3xl font-bold tracking-tighter tabular-nums">{timeLeft.days}</span>
              <span className={`text-[0.6rem] font-bold ${isHero ? 'text-slate-400' : 'text-slate-400'} tracking-widest uppercase mt-1`}>Days Left</span>
            </>
          )}
        </div>
      </div>
      
      <h3 className={`text-xl font-bold mb-1 text-center`}>{event.name}</h3>
      {event.description && <p className={`text-xs mb-4 text-center ${isHero ? 'text-slate-400' : 'text-slate-500'}`}>{event.description}</p>}
      
      {isExpired ? (
        <div className={`mt-2 py-2 px-6 rounded-full text-xs font-bold tracking-widest uppercase ${isHero ? 'bg-slate-800 text-green-400' : 'bg-green-50 text-green-600'}`}>
          Event Completed
        </div>
      ) : (
        <div className="flex w-full justify-around text-center px-4 mt-2">
          <div>
            <p className="text-lg font-bold tabular-nums">{timeLeft.hours.toString().padStart(2, '0')}</p>
            <p className="text-[0.6rem] font-bold text-slate-400 tracking-widest uppercase">Hours</p>
          </div>
          <div className={`w-px ${isHero ? 'bg-slate-700' : 'bg-slate-200'}`}></div>
          <div>
            <p className="text-lg font-bold tabular-nums">{timeLeft.mins.toString().padStart(2, '0')}</p>
            <p className="text-[0.6rem] font-bold text-slate-400 tracking-widest uppercase">Mins</p>
          </div>
          <div className={`w-px ${isHero ? 'bg-slate-700' : 'bg-slate-200'}`}></div>
          <div>
            <p className={`text-lg font-bold tabular-nums ${isUrgent ? 'text-red-500' : 'text-blue-500'}`}>
              {timeLeft.secs.toString().padStart(2, '0')}
            </p>
            <p className="text-[0.6rem] font-bold text-slate-400 tracking-widest uppercase">Secs</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default function Dashboard() {
  const [events, setEvents] = useState<CountdownEvent[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [editingEvent, setEditingEvent] = useState<CountdownEvent | null>(null);
  const [activeTab, setActiveTab] = useState<'active' | 'completed'>('active');

  useEffect(() => {
    const loadData = () => {
      const savedEvents = localStorage.getItem('chronos_events');
      if (savedEvents) setEvents(JSON.parse(savedEvents));
      setIsMounted(true);
    };
    loadData();
  }, []);

  useEffect(() => {
    if (isMounted) localStorage.setItem('chronos_events', JSON.stringify(events));
  }, [events, isMounted]);

  const handleDelete = (id: string) => setEvents(events.filter(event => event.id !== id));

  const handleComplete = (id: string) => {
    playSound('success');
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.4 },
      colors: ['#2563eb', '#10b981', '#f59e0b']
    });
    setEvents(events.map(event => event.id === id ? { ...event, status: 'completed' } : event));
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEvent) return;
    setEvents(events.map(ev => ev.id === editingEvent.id ? editingEvent : ev));
    setEditingEvent(null);
  };

  if (!isMounted) return null;

  const activeEvents = events.filter(e => e.status !== 'completed').sort((a, b) => new Date(a.targetDate).getTime() - new Date(b.targetDate).getTime());
  const completedEvents = events.filter(e => e.status === 'completed').sort((a, b) => new Date(b.targetDate).getTime() - new Date(a.targetDate).getTime());
  
  const closestEvent = activeEvents[0];
  const upcomingEvents = activeEvents.slice(1);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-24 font-sans selection:bg-blue-100">
      <header className="flex items-center justify-between px-6 py-4 bg-white/70 backdrop-blur-md sticky top-0 z-10 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-2 rounded-lg shadow-sm">
            <Rocket className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-slate-800">CHRONOS</h1>
        </div>
      </header>

      <main className="px-6 py-6 max-w-md mx-auto">
        
        <div className="flex bg-slate-200/60 p-1 rounded-xl mb-8">
          <button 
            onClick={() => { playSound('click'); setActiveTab('active'); }}
            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${activeTab === 'active' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Active
          </button>
          <button 
            onClick={() => { playSound('click'); setActiveTab('completed'); }}
            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${activeTab === 'completed' ? 'bg-white shadow-sm text-green-600' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Completed
          </button>
        </div>

        {activeTab === 'active' && (
          activeEvents.length === 0 ? (
            <div className="text-center py-16 px-6 bg-white border border-slate-200 rounded-3xl shadow-sm flex flex-col items-center">
              <div className="bg-slate-50 p-4 rounded-full mb-4">
                <Clock className="w-8 h-8 text-slate-300" />
              </div>
              <h3 className="text-slate-800 font-bold mb-1">No Active Events</h3>
              <p className="text-slate-500 text-sm mb-6">Securely track your next milestone.</p>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <h2 className="text-sm font-bold text-slate-400 tracking-wider uppercase mb-4">Next Up</h2>
                <TimerCard key={closestEvent.id} event={closestEvent} onDelete={handleDelete} onEdit={setEditingEvent} onComplete={handleComplete} isHero={true} />
              </div>

              {upcomingEvents.length > 0 && (
                <div>
                  <h2 className="text-sm font-bold text-slate-400 tracking-wider uppercase mb-4">Upcoming</h2>
                  <div className="space-y-4">
                    {upcomingEvents.map(event => (
                      <TimerCard key={event.id} event={event} onDelete={handleDelete} onEdit={setEditingEvent} onComplete={handleComplete} />
                    ))}
                  </div>
                </div>
              )}
            </>
          )
        )}

        {activeTab === 'completed' && (
          completedEvents.length === 0 ? (
            <div className="text-center py-16 px-6 bg-white border border-slate-200 rounded-3xl shadow-sm flex flex-col items-center">
              <div className="bg-slate-50 p-4 rounded-full mb-4">
                <ArchiveRestore className="w-8 h-8 text-slate-300" />
              </div>
              <h3 className="text-slate-800 font-bold mb-1">No Completed Events</h3>
              <p className="text-slate-500 text-sm mb-6">Your milestones will appear here once achieved.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {completedEvents.map(event => (
                <TimerCard key={event.id} event={event} onDelete={handleDelete} onEdit={setEditingEvent} onComplete={handleComplete} />
              ))}
            </div>
          )
        )}
      </main>

      {editingEvent && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-lg">Edit Event</h3>
              <button onClick={() => setEditingEvent(null)} className="text-slate-400 hover:text-slate-600 bg-slate-50 p-1.5 rounded-full"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Event Name</label>
                <input type="text" required value={editingEvent.name} onChange={(e) => setEditingEvent({...editingEvent, name: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Target Date</label>
                <input type="datetime-local" required value={editingEvent.targetDate} onChange={(e) => setEditingEvent({...editingEvent, targetDate: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3.5 rounded-xl mt-4 hover:bg-blue-700 transition-colors">Save Changes</button>
            </form>
          </div>
        </div>
      )}

      <Link href="/add" onClick={() => playSound('click')} className="fixed bottom-8 right-6 w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-xl shadow-blue-200 hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all z-20">
        <Plus className="w-6 h-6" />
      </Link>
    </div>
  );
}