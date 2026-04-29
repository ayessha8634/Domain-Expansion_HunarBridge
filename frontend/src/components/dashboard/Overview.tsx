import React from 'react';
import { Eye, Users, Star, Award, TrendingUp, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

const Overview = () => {
  const userName = localStorage.getItem('hunarbridge_user_name') || 'Guest';
  const userRole = localStorage.getItem('hunarbridge_user_role') || 'learner';

  const artisanStats = [
    { label: 'Profile Views', value: '1.2k', icon: Eye, trend: '+12%', color: 'text-blue-500' },
    { label: 'Total Enquiries', value: '48', icon: MessageCircle, trend: '+5%', color: 'text-purple-500' },
    { label: 'Avg Rating', value: '4.9', icon: Star, trend: 'stable', color: 'text-amber-500' },
    { label: 'Trust Score', value: '98%', icon: Award, trend: '+2%', color: 'text-green-500' },
  ];

  const buyerStats = [
    { label: 'Artisans Saved', value: '24', icon: Users, trend: '+3', color: 'text-blue-500' },
    { label: 'Messages Sent', value: '12', icon: MessageCircle, trend: '+2', color: 'text-purple-500' },
    { label: 'Orders Placed', value: '5', icon: Award, trend: 'stable', color: 'text-green-500' },
    { label: 'Reviews Given', value: '4', icon: Star, trend: '+1', color: 'text-amber-500' },
  ];

  const stats = userRole === 'buyer' ? buyerStats : artisanStats;

  const quickActions = userRole === 'artisan' 
    ? ['Update Skills', 'Generate Portfolio PDF', 'Promote Profile', 'View Analytics']
    : userRole === 'buyer'
    ? ['Saved Artisans', 'Recent Enquiries', 'Explore Map', 'Order History']
    : ['Update Skills', 'View Analytics', 'Find Mentor', 'Explore Courses'];

  const chartData = [
    { label: 'Mon', value: 30 },
    { label: 'Tue', value: 45 },
    { label: 'Wed', value: 25 },
    { label: 'Thu', value: 60 },
    { label: 'Fri', value: 80 },
    { label: 'Sat', value: 95 },
    { label: 'Sun', value: 50 },
  ];

  const handleActionClick = (action: string) => {
    if (action === 'Generate Portfolio PDF') {
      window.print();
    } else if (action === 'Explore Map') {
      window.location.href = '/discovery';
    }
  };

  return (
    <div className="space-y-10">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 print:hidden">
        <div>
          <h1 className="text-5xl font-display mb-2">Welcome back, {userName}!</h1>
          <p className="text-brand-dark/40 font-bold uppercase tracking-widest text-xs flex items-center gap-2">
            <Calendar className="w-4 h-4" /> Wednesday, 29 April 2026
          </p>
        </div>
        <div className="flex gap-4">
          <button className="btn-secondary" onClick={() => window.print()}>Download Report</button>
          {userRole === 'artisan' && <button className="btn-primary">Add New Work</button>}
          {userRole === 'buyer' && <button className="btn-primary" onClick={() => window.location.href='/discovery'}>Find Artisans</button>}
        </div>
      </header>

      {/* Hidden print header */}
      <div className="hidden print:block mb-8 border-b-4 border-brand-primary pb-4">
        <h1 className="text-6xl font-display text-brand-dark mb-2">HunarBridge Portfolio</h1>
        <h2 className="text-3xl text-brand-primary">{userName}</h2>
        <p className="text-brand-dark/60 font-bold uppercase tracking-widest mt-2">Professional Artisan Report • April 2026</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass p-8 rounded-[2.5rem] border-brand-primary/5 hover:border-brand-primary/20 transition-all group print:border-2 print:border-brand-dark/10 print:shadow-none"
          >
            <div className="flex items-center justify-between mb-6">
              <div className={`p-4 rounded-2xl bg-brand-light ${stat.color} print:bg-transparent print:p-0`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div className="flex items-center gap-1 text-green-500 font-bold text-xs">
                <TrendingUp className="w-4 h-4" />
                {stat.trend}
              </div>
            </div>
            <h3 className="text-3xl font-display mb-1">{stat.value}</h3>
            <p className="text-brand-dark/40 font-bold uppercase tracking-widest text-[10px]">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass p-10 rounded-[3rem] print:border-2 print:border-brand-dark/10 print:shadow-none">
          <h2 className="text-3xl font-display mb-8">{userRole === 'buyer' ? 'Activity Timeline' : 'Performance Analytics'}</h2>
          
          {/* Custom CSS Bar Chart */}
          <div className="h-64 flex items-end justify-between gap-2 p-6 bg-brand-light/30 rounded-3xl border border-brand-primary/10 print:bg-transparent">
            {chartData.map((data, index) => (
              <div key={index} className="flex flex-col items-center gap-2 flex-1 group">
                <div className="relative w-full h-48 flex items-end justify-center">
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: `${data.value}%` }}
                    transition={{ duration: 1, delay: index * 0.1, ease: "easeOut" }}
                    className="w-full max-w-[40px] bg-brand-primary/20 hover:bg-brand-primary rounded-t-lg transition-colors relative print:bg-brand-primary/40 print:border print:border-brand-primary"
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 print:opacity-100 transition-opacity bg-brand-dark text-white text-xs font-bold py-1 px-2 rounded-lg">
                      {data.value}
                    </div>
                  </motion.div>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-dark/40">{data.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass p-10 rounded-[3rem] print:hidden">
          <h2 className="text-3xl font-display mb-8">Quick Actions</h2>
          <div className="space-y-4">
            {quickActions.map((action) => (
              <button 
                key={action}
                onClick={() => handleActionClick(action)}
                className="w-full text-left p-4 rounded-2xl hover:bg-brand-primary/5 text-brand-dark/60 hover:text-brand-primary font-bold text-sm uppercase tracking-wider transition-all border border-transparent hover:border-brand-primary/10"
              >
                {action}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

import { MessageCircle } from 'lucide-react';
export default Overview;
