'use client';

import React, { useState } from 'react';
import Navigation from './Navigation';
import WaitlistForm from '../Waitlist/WaitlistForm';
import PeopleJoined from '../Waitlist/PeopleJoined';
import WaitlistWall from '../WaitlistWall/WaitlistWall';
import HowItWorksVisual from '../HowItWorksVisual/HowItWorksVisual';
import StatusBadge from './StatusBadge';
import { waitlistData } from '../../data/waitlist';
import { MapPin, CalendarDays } from 'lucide-react';
import { cn } from '../../lib/utils/utils';

const Hero: React.FC = () => {
  const [activeTab, setActiveTab] = useState('waitlist');

  return (
    <div className="min-h-screen w-full flex flex-col md:grid md:grid-cols-12 bg-background overflow-x-hidden">
      {/* Left Column (Desktop) / Main Stack (Mobile) */}
      <div className="flex flex-col justify-center px-6 py-8 md:py-12 md:px-12 lg:px-20 md:col-span-6 lg:col-span-5 relative z-10">
        {/* Top Status Badge */}
        <StatusBadge />

        {/* Header Section */}
        <div className="space-y-6 mb-8">
          <div className="space-y-3 animate-in slide-in-from-bottom-5 fade-in duration-700">
            <h1 className="text-4xl md:text-7xl font-bold tracking-tighter text-foreground leading-[1.1] md:leading-[0.9]">
              PIXEL
              <br className="hidden md:block" /> CON
            </h1>
            <p className="text-xl md:text-base font-medium text-foreground md:text-muted md:uppercase md:tracking-wider">
              The Largest Tech Gathering
            </p>
            <p className="text-muted text-sm md:text-base max-w-sm leading-relaxed">
              Join us at PixelCon, the largest gathering for tech enthusiasts, creative minds and industry leaders.
            </p>
          </div>

          <PeopleJoined data={waitlistData} />
        </div>

        {/* Navigation & Form Section */}
        <div className="animate-in slide-in-from-bottom-5 fade-in duration-700 delay-200 w-full">
          <div className="w-full border-t border-border mb-8 hidden md:block" />

          <Navigation activeTab={activeTab} onTabChange={setActiveTab} />

          <div className="mb-8 w-full">
            <WaitlistForm />
          </div>

          {/* Mobile Only: Visual Section Stacked at Bottom */}
          <div className="md:hidden w-full my-8 animate-in fade-in duration-1000">
            {activeTab === 'waitlist' && (
              <div className="border-t border-b border-border py-8 bg-neutral-50/50 -mx-6 px-6">
                <WaitlistWall data={waitlistData} />
              </div>
            )}
            {activeTab === 'how-it-works' && (
              <div className="py-8">
                <HowItWorksVisual />
              </div>
            )}
          </div>

          {/* Footer Info */}
          <div className="mt-4 md:mt-8 flex flex-wrap gap-x-8 gap-y-4 text-sm text-foreground border-t border-border pt-6 md:border-none md:pt-0">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-muted" />
              <div>
                <p className="font-semibold">Neonville</p>
                <p className="text-muted text-xs">Quantum Amphitheater</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <CalendarDays className="w-4 h-4 text-muted" />
              <div>
                <p className="font-semibold">April 20–23</p>
                <p className="text-muted text-xs">2025</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Visuals (Desktop Only) */}
      {/* Hidden on mobile, Flex on desktop */}
      <div className="hidden md:flex md:col-span-6 lg:col-span-7 bg-neutral-50 h-full items-center justify-center p-12 lg:p-12 animate-in fade-in duration-1000 relative overflow-hidden transition-colors">
        {/* Subtle Background Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, black 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}
        />

        <div className="w-full max-w-2xl relative z-10 h-full flex items-center justify-center">
          {/* Mode: Waitlist Wall (Default) */}
          <div
            className={cn(
              'absolute inset-0 transition-all duration-700 flex items-center',
              activeTab === 'waitlist' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'
            )}
          >
            <WaitlistWall data={waitlistData} />
          </div>

          {/* Mode: How It Works */}
          <div
            className={cn(
              'absolute inset-0 transition-all duration-700 delay-100 flex items-center',
              activeTab === 'how-it-works' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'
            )}
          >
            <HowItWorksVisual />
          </div>

          {/* Fallback/Placeholder for other tabs */}
          {activeTab !== 'waitlist' && activeTab !== 'how-it-works' && (
            <div className="text-center animate-in fade-in zoom-in-95 duration-500">
              <p className="text-muted text-lg tracking-widest uppercase">Coming Soon</p>
            </div>
          )}
        </div>
      </div>

      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 opacity-[0.03] pointer-events-none hidden md:block">
        <div className="grid grid-cols-4 gap-4">
          {[...Array(16)].map((_, i) => (
            <div key={i} className="w-8 h-8 bg-black" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
