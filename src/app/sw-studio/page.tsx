'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SWLogo } from '@/components/SWLogo';
import {
  Lock,
  LayoutDashboard,
  FileText,
  BookOpen,
  Image as ImageIcon,
  MessageSquare,
  Settings,
  Eye,
  Plus,
  Trash2,
  Save,
  CheckCircle2,
  Send,
  Sparkles,
  LogOut,
  RefreshCw,
} from 'lucide-react';
import {
  SiteContent,
  Course,
  GalleryItem,
  Enquiry,
} from '@/lib/types';
import {
  getStoredContent,
  saveStoredContent,
  getStoredCourses,
  saveStoredCourses,
  getStoredGallery,
  saveStoredGallery,
  getStoredEnquiries,
  saveStoredEnquiries,
} from '@/lib/cms-store';

export default function SWStudioAdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');

  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'hero' | 'about' | 'courses' | 'gallery' | 'enquiries' | 'settings'
  >('dashboard');

  const [livePreview, setLivePreview] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Content States
  const [siteContent, setSiteContent] = useState<SiteContent>(getStoredContent());
  const [courses, setCourses] = useState<Course[]>(getStoredCourses());
  const [gallery, setGallery] = useState<GalleryItem[]>(getStoredGallery());
  const [enquiries, setEnquiries] = useState<Enquiry[]>(getStoredEnquiries());

  // New Course Draft State
  const [newCourse, setNewCourse] = useState<Partial<Course>>({
    title: '',
    category: 'Fashion',
    subtitle: '',
    description: '',
    duration: '1 Year Diploma',
    eligibility: '10th / 12th Passout',
    highlights: ['Sketching & Design', 'Digital Marketing Included'],
    image: '/images/hero_fashion_model.jpg',
    accentColor: '#F20D63',
  });
  const [showAddCourse, setShowAddCourse] = useState(false);

  // New Gallery Item Draft State
  const [newGalleryItem, setNewGalleryItem] = useState<Partial<GalleryItem>>({
    title: '',
    category: 'Fashion',
    image: '/images/hero_fashion_model.jpg',
    studentName: '',
    year: '2026',
    aspectRatio: 'square',
  });
  const [showAddGallery, setShowAddGallery] = useState(false);

  useEffect(() => {
    // Check if session token exists
    const token = localStorage.getItem('sw_admin_auth');
    if (token === 'authenticated') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === 'swadmin2026' || passcode === 'admin' || passcode === 'studio') {
      setIsAuthenticated(true);
      localStorage.setItem('sw_admin_auth', 'authenticated');
      setAuthError('');
    } else {
      setAuthError('Invalid Admin Authorization Passcode. (Demo Key: swadmin2026)');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('sw_admin_auth');
  };

  const handleSaveAll = () => {
    saveStoredContent(siteContent);
    saveStoredCourses(courses);
    saveStoredGallery(gallery);
    saveStoredEnquiries(enquiries);

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleUpdateEnquiryStatus = (id: string, status: Enquiry['status']) => {
    const updated = enquiries.map((e) => (e.id === id ? { ...e, status } : e));
    setEnquiries(updated);
    saveStoredEnquiries(updated);
  };

  const handleDeleteEnquiry = (id: string) => {
    const updated = enquiries.filter((e) => e.id !== id);
    setEnquiries(updated);
    saveStoredEnquiries(updated);
  };

  const handleCreateCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCourse.title) return;
    const courseToAdd: Course = {
      id: `course-${Date.now()}`,
      title: newCourse.title || 'NEW COURSE',
      category: newCourse.category || 'Fashion',
      subtitle: newCourse.subtitle || '',
      description: newCourse.description || '',
      duration: newCourse.duration || '1 Year Diploma',
      eligibility: newCourse.eligibility || '10th / 12th Passout',
      highlights: newCourse.highlights || ['Practical Training'],
      image: newCourse.image || '/images/hero_fashion_model.jpg',
      accentColor: newCourse.accentColor || '#F20D63',
      featured: true,
    };
    const updated = [...courses, courseToAdd];
    setCourses(updated);
    saveStoredCourses(updated);
    setShowAddCourse(false);
  };

  const handleDeleteCourse = (id: string) => {
    const updated = courses.filter((c) => c.id !== id);
    setCourses(updated);
    saveStoredCourses(updated);
  };

  const handleCreateGalleryItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGalleryItem.title) return;
    const itemToAdd: GalleryItem = {
      id: `g-${Date.now()}`,
      title: newGalleryItem.title || 'Project Showcase',
      category: newGalleryItem.category || 'Fashion',
      image: newGalleryItem.image || '/images/hero_fashion_model.jpg',
      studentName: newGalleryItem.studentName || 'SW Student',
      year: newGalleryItem.year || '2026',
      aspectRatio: newGalleryItem.aspectRatio || 'square',
    };
    const updated = [...gallery, itemToAdd];
    setGallery(updated);
    saveStoredGallery(updated);
    setShowAddGallery(false);
  };

  const handleDeleteGalleryItem = (id: string) => {
    const updated = gallery.filter((g) => g.id !== id);
    setGallery(updated);
    saveStoredGallery(updated);
  };

  // LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0B0B0D] text-white flex items-center justify-center p-4 selection:bg-[#F20D63]">
        <div className="w-full max-w-md bg-[#121216] border border-white/15 rounded-3xl p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <SWLogo layout="vertical" variant="light" size="lg" className="mx-auto" />
            <div className="pt-4 flex items-center justify-center gap-2 text-xs font-mono text-[#F20D63] font-bold uppercase tracking-widest">
              <Lock className="w-4 h-4" />
              <span>MASTER ADMIN CMS PORTAL</span>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-xs font-semibold">
            <div>
              <label className="block text-neutral-300 uppercase mb-2">
                ADMIN AUTHORIZATION PASSCODE
              </label>
              <input
                type="password"
                required
                placeholder="Enter passcode (Demo: swadmin2026)"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 focus:border-[#F20D63] focus:outline-none text-white text-sm"
              />
            </div>

            {authError && (
              <p className="text-[#F20D63] text-xs font-bold text-center bg-[#F20D63]/10 p-2.5 rounded-xl border border-[#F20D63]/30">
                {authError}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-full bg-[#F20D63] text-white font-black text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors flex items-center justify-center gap-2 shadow-lg shadow-pink-600/30"
            >
              <span>ACCESS STUDIO CMS</span>
            </button>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => {
                  setPasscode('swadmin2026');
                  setIsAuthenticated(true);
                  localStorage.setItem('sw_admin_auth', 'authenticated');
                }}
                className="text-[11px] text-[#FFB800] hover:underline font-mono"
              >
                ⚡ Click for Quick Client Demo Login
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // ADMIN CMS MAIN DASHBOARD
  return (
    <div className="min-h-screen bg-[#0B0B0D] text-white flex flex-col font-sans selection:bg-[#F20D63]">
      {/* Top Admin Bar */}
      <header className="bg-[#121216] border-b border-white/10 px-6 py-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <SWLogo layout="horizontal" variant="light" size="sm" />
          <span className="hidden sm:inline-block px-3 py-1 rounded-full bg-[#F20D63] text-white text-[10px] font-mono font-bold uppercase tracking-widest">
            MASTER CMS
          </span>
        </div>

        <div className="flex items-center gap-4">
          {/* Live Preview Split Toggle */}
          <button
            onClick={() => setLivePreview(!livePreview)}
            className={`px-4 py-2 rounded-full text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 transition-all ${
              livePreview
                ? 'bg-[#1749C6] text-white shadow-lg'
                : 'bg-white/10 text-neutral-300 hover:bg-white/20'
            }`}
          >
            <Eye className="w-4 h-4" />
            <span>{livePreview ? 'HIDE LIVE PREVIEW' : 'LIVE PREVIEW'}</span>
          </button>

          {/* Global Save Button */}
          <button
            onClick={handleSaveAll}
            className="px-5 py-2.5 rounded-full bg-[#F20D63] text-white text-xs font-black uppercase tracking-wider hover:bg-white hover:text-black transition-colors flex items-center gap-2 shadow-lg shadow-pink-500/25"
          >
            <Save className="w-4 h-4" />
            <span>SAVE CHANGES</span>
          </button>

          <button
            onClick={handleLogout}
            className="p-2 rounded-full bg-white/10 text-neutral-400 hover:text-white hover:bg-white/20 transition-colors"
            title="Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Save Success Alert Banner */}
      <AnimatePresence>
        {savedSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-[#25D366] text-black font-black text-xs uppercase tracking-widest text-center py-2.5 px-4 flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>ALL CMS CHANGES SAVED LOCALLY & PUBLIC SITE UPDATED LIVE!</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Workspace Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Nav */}
        <aside className="w-64 bg-[#121216] border-r border-white/10 p-4 space-y-1 shrink-0 hidden md:block">
          <div className="px-4 py-2 text-[10px] font-mono text-neutral-500 uppercase tracking-widest font-bold">
            STUDIO SECTIONS
          </div>

          {[
            { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
            { id: 'enquiries', label: `Enquiries (${enquiries.length})`, icon: MessageSquare, badge: true },
            { id: 'courses', label: `Courses (${courses.length})`, icon: BookOpen },
            { id: 'gallery', label: `Gallery (${gallery.length})`, icon: ImageIcon },
            { id: 'hero', label: 'Hero Section', icon: Sparkles },
            { id: 'about', label: 'About Story', icon: FileText },
            { id: 'settings', label: 'Contact Settings', icon: Settings },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-[#F20D63] text-white shadow-lg shadow-pink-600/30'
                    : 'text-neutral-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
              </button>
            );
          })}

          <div className="pt-8 px-4">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="w-full py-2.5 px-4 rounded-xl bg-white/5 border border-white/10 hover:border-[#1749C6] text-xs font-mono font-bold text-neutral-300 hover:text-white flex items-center justify-center gap-2 transition-colors"
            >
              <span>OPEN PUBLIC WEBSITE ↗</span>
            </a>
          </div>
        </aside>

        {/* Main Work Area */}
        <div className="flex-1 flex overflow-hidden">
          {/* Form & Controls Panel */}
          <main className="flex-1 p-6 md:p-8 overflow-y-auto space-y-8">
            {/* OVERVIEW DASHBOARD */}
            {activeTab === 'dashboard' && (
              <div className="space-y-8">
                <div>
                  <h1 className="text-3xl font-black uppercase">STUDIO OVERVIEW</h1>
                  <p className="text-xs text-neutral-400 mt-1">
                    Manage enquiries, programs, gallery projects, and site copy in real time.
                  </p>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
                    <span className="text-xs font-mono text-neutral-400 uppercase">TOTAL ENQUIRIES</span>
                    <span className="block text-4xl font-black text-[#F20D63] mt-2">
                      {enquiries.length}
                    </span>
                    <span className="text-[10px] text-neutral-500 font-mono mt-1 block">
                      {enquiries.filter((e) => e.status === 'New').length} New Leads Pending
                    </span>
                  </div>

                  <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
                    <span className="text-xs font-mono text-neutral-400 uppercase">ACTIVE DIPLOMAS</span>
                    <span className="block text-4xl font-black text-[#1749C6] mt-2">
                      {courses.length}
                    </span>
                    <span className="text-[10px] text-neutral-500 font-mono mt-1 block">
                      Fashion & Interior Programs
                    </span>
                  </div>

                  <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
                    <span className="text-xs font-mono text-neutral-400 uppercase">GALLERY SHOWCASES</span>
                    <span className="block text-4xl font-black text-[#FFB800] mt-2">
                      {gallery.length}
                    </span>
                    <span className="text-[10px] text-neutral-500 font-mono mt-1 block">
                      Student Work Projects
                    </span>
                  </div>

                  <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
                    <span className="text-xs font-mono text-neutral-400 uppercase">ADMISSIONS</span>
                    <span className="block text-xl font-black text-emerald-400 mt-3 uppercase">
                      {siteContent.admissionsOpen ? 'OPEN (2026)' : 'CLOSED'}
                    </span>
                    <span className="text-[10px] text-neutral-500 font-mono mt-1 block">
                      Digital Marketing Included
                    </span>
                  </div>
                </div>

                {/* Recent Enquiries Quick Table */}
                <div className="p-6 rounded-3xl bg-white/5 border border-white/10 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-black uppercase">RECENT ADMISSION ENQUIRIES</h3>
                    <button
                      onClick={() => setActiveTab('enquiries')}
                      className="text-xs font-mono text-[#F20D63] hover:underline"
                    >
                      VIEW ALL ({enquiries.length}) →
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-white/10 text-neutral-400 font-mono uppercase">
                          <th className="pb-3">NAME</th>
                          <th className="pb-3">PHONE</th>
                          <th className="pb-3">COURSE</th>
                          <th className="pb-3">STATUS</th>
                          <th className="pb-3">ACTION</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 font-medium">
                        {enquiries.slice(0, 5).map((enq) => (
                          <tr key={enq.id}>
                            <td className="py-3.5 font-bold text-white">{enq.name}</td>
                            <td className="py-3.5 font-mono text-neutral-300">{enq.phone}</td>
                            <td className="py-3.5 text-[#FFB800]">{enq.course}</td>
                            <td className="py-3.5">
                              <span
                                className={`px-2.5 py-1 rounded-full text-[10px] font-mono uppercase ${
                                  enq.status === 'New'
                                    ? 'bg-[#F20D63]/20 text-[#F20D63]'
                                    : enq.status === 'Contacted'
                                    ? 'bg-[#1749C6]/20 text-[#1749C6]'
                                    : 'bg-emerald-500/20 text-emerald-400'
                                }`}
                              >
                                {enq.status}
                              </span>
                            </td>
                            <td className="py-3.5">
                              <a
                                href={`https://wa.me/${enq.phone.replace(/[^\d]/g, '')}?text=Hello%20${encodeURIComponent(enq.name)}!%20This%20is%20SW%20Institute%20regarding%20your%20admission%20enquiry.`}
                                target="_blank"
                                rel="noreferrer"
                                className="px-3 py-1 rounded-lg bg-[#25D366]/20 text-[#25D366] hover:bg-[#25D366] hover:text-black font-bold transition-colors"
                              >
                                WHATSAPP ↗
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* ENQUIRIES MANAGER */}
            {activeTab === 'enquiries' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-3xl font-black uppercase">ADMISSION LEADS & ENQUIRIES</h1>
                    <p className="text-xs text-neutral-400 mt-1">
                      Direct customer lead tracker with instant WhatsApp integration.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setEnquiries(getStoredEnquiries());
                    }}
                    className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-neutral-300"
                    title="Refresh Enquiries"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-4">
                  {enquiries.map((enq) => (
                    <div
                      key={enq.id}
                      className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-white/30 transition-colors"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <span className="text-lg font-black text-white">{enq.name}</span>
                          <span className="text-xs font-mono px-3 py-0.5 rounded-full bg-[#FFB800] text-black font-bold">
                            {enq.course}
                          </span>
                          <span className="text-xs font-mono text-neutral-400">Age: {enq.age || 'N/A'}</span>
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-neutral-300">
                          <span>Phone: {enq.phone}</span>
                          {enq.email && <span>Email: {enq.email}</span>}
                          <span className="text-neutral-500">{enq.timestamp}</span>
                        </div>
                        {enq.message && (
                          <p className="text-xs text-neutral-300 italic pt-1">
                            "{enq.message}"
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        {/* Status Select */}
                        <select
                          value={enq.status}
                          onChange={(e) =>
                            handleUpdateEnquiryStatus(enq.id, e.target.value as any)
                          }
                          className="px-3 py-2 rounded-xl bg-black border border-white/20 text-xs font-bold text-white"
                        >
                          <option value="New">New</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Enrolled">Enrolled</option>
                          <option value="Archived">Archived</option>
                        </select>

                        <a
                          href={`https://wa.me/${enq.phone.replace(/[^\d]/g, '')}?text=Hello%20${encodeURIComponent(enq.name)}!%20This%20is%20SW%20Institute%20regarding%20your%20enquiry%20for%20${encodeURIComponent(enq.course)}.`}
                          target="_blank"
                          rel="noreferrer"
                          className="px-4 py-2 rounded-xl bg-[#25D366] text-black font-bold text-xs flex items-center gap-1.5 hover:bg-white transition-colors"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>WHATSAPP</span>
                        </a>

                        <button
                          onClick={() => handleDeleteEnquiry(enq.id)}
                          className="p-2 rounded-xl bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* COURSES MANAGER */}
            {activeTab === 'courses' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-3xl font-black uppercase">COURSES & DIPLOMAS</h1>
                    <p className="text-xs text-neutral-400 mt-1">
                      Add, update, or remove diploma programs.
                    </p>
                  </div>
                  <button
                    onClick={() => setShowAddCourse(!showAddCourse)}
                    className="px-5 py-2.5 rounded-full bg-[#F20D63] text-white font-black text-xs uppercase flex items-center gap-2 shadow-lg"
                  >
                    <Plus className="w-4 h-4" />
                    <span>ADD NEW COURSE</span>
                  </button>
                </div>

                {/* Add Course Form */}
                {showAddCourse && (
                  <form
                    onSubmit={handleCreateCourse}
                    className="p-6 rounded-3xl bg-white/10 border border-white/20 space-y-4 text-xs font-semibold"
                  >
                    <h3 className="text-lg font-black uppercase text-[#FFB800]">
                      CREATE NEW PROGRAM
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-neutral-300 uppercase mb-1">Title</label>
                        <input
                          type="text"
                          required
                          placeholder="DIPLOMA IN CREATIVE FASHION"
                          value={newCourse.title}
                          onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl bg-black border border-white/20 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-neutral-300 uppercase mb-1">Category</label>
                        <select
                          value={newCourse.category}
                          onChange={(e) => setNewCourse({ ...newCourse, category: e.target.value as any })}
                          className="w-full px-4 py-2.5 rounded-xl bg-black border border-white/20 text-white"
                        >
                          <option value="Fashion">Fashion</option>
                          <option value="Interior">Interior</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-neutral-300 uppercase mb-1">Subtitle</label>
                      <input
                        type="text"
                        placeholder="Garment Styling & Brand Launch"
                        value={newCourse.subtitle}
                        onChange={(e) => setNewCourse({ ...newCourse, subtitle: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-black border border-white/20 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-neutral-300 uppercase mb-1">Description</label>
                      <textarea
                        rows={2}
                        placeholder="Full course description..."
                        value={newCourse.description}
                        onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-black border border-white/20 text-white"
                      />
                    </div>
                    <div className="flex gap-4">
                      <button
                        type="submit"
                        className="px-6 py-3 rounded-full bg-[#F20D63] text-white font-bold uppercase"
                      >
                        SAVE COURSE
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowAddCourse(false)}
                        className="px-6 py-3 rounded-full bg-white/10 text-white font-bold uppercase"
                      >
                        CANCEL
                      </button>
                    </div>
                  </form>
                )}

                {/* Course List */}
                <div className="space-y-4">
                  {courses.map((course) => (
                    <div
                      key={course.id}
                      className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-6"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={course.image}
                          alt={course.title}
                          className="w-20 h-20 rounded-xl object-cover"
                        />
                        <div>
                          <span className="text-[10px] font-mono text-[#F20D63] uppercase font-bold">
                            {course.category} DIPLOMA
                          </span>
                          <h3 className="text-xl font-black uppercase text-white">{course.title}</h3>
                          <p className="text-xs text-neutral-400 mt-0.5">{course.subtitle}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleDeleteCourse(course.id)}
                          className="p-2.5 rounded-xl bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* GALLERY MANAGER */}
            {activeTab === 'gallery' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-3xl font-black uppercase">STUDENT WORK & GALLERY</h1>
                    <p className="text-xs text-neutral-400 mt-1">
                      Manage "Made at SW" editorial portfolio items.
                    </p>
                  </div>
                  <button
                    onClick={() => setShowAddGallery(!showAddGallery)}
                    className="px-5 py-2.5 rounded-full bg-[#FFB800] text-black font-black text-xs uppercase flex items-center gap-2 shadow-lg"
                  >
                    <Plus className="w-4 h-4" />
                    <span>ADD SHOWCASE</span>
                  </button>
                </div>

                {/* Add Gallery Form */}
                {showAddGallery && (
                  <form
                    onSubmit={handleCreateGalleryItem}
                    className="p-6 rounded-3xl bg-white/10 border border-white/20 space-y-4 text-xs font-semibold"
                  >
                    <h3 className="text-lg font-black uppercase text-[#F20D63]">
                      NEW STUDENT SHOWCASE ITEM
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-neutral-300 uppercase mb-1">Project Title</label>
                        <input
                          type="text"
                          required
                          placeholder="Haute Couture Collection"
                          value={newGalleryItem.title}
                          onChange={(e) => setNewGalleryItem({ ...newGalleryItem, title: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl bg-black border border-white/20 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-neutral-300 uppercase mb-1">Category</label>
                        <select
                          value={newGalleryItem.category}
                          onChange={(e) => setNewGalleryItem({ ...newGalleryItem, category: e.target.value as any })}
                          className="w-full px-4 py-2.5 rounded-xl bg-black border border-white/20 text-white"
                        >
                          <option value="Fashion">Fashion</option>
                          <option value="Interior">Interior</option>
                          <option value="Sketches">Sketches</option>
                          <option value="Workshops">Workshops</option>
                          <option value="Events">Events</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-neutral-300 uppercase mb-1">Student Creator Name</label>
                        <input
                          type="text"
                          placeholder="Aanya Sharma"
                          value={newGalleryItem.studentName}
                          onChange={(e) => setNewGalleryItem({ ...newGalleryItem, studentName: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl bg-black border border-white/20 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-neutral-300 uppercase mb-1">Academic Year</label>
                        <input
                          type="text"
                          placeholder="2026"
                          value={newGalleryItem.year}
                          onChange={(e) => setNewGalleryItem({ ...newGalleryItem, year: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl bg-black border border-white/20 text-white"
                        />
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <button type="submit" className="px-6 py-3 rounded-full bg-[#FFB800] text-black font-bold uppercase">
                        ADD ITEM
                      </button>
                      <button type="button" onClick={() => setShowAddGallery(false)} className="px-6 py-3 rounded-full bg-white/10 text-white font-bold uppercase">
                        CANCEL
                      </button>
                    </div>
                  </form>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {gallery.map((g) => (
                    <div
                      key={g.id}
                      className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between"
                    >
                      <img
                        src={g.image}
                        alt={g.title}
                        className="w-full h-40 object-cover rounded-xl mb-3"
                      />
                      <div>
                        <span className="text-[10px] font-mono text-[#FFB800] uppercase font-bold">
                          {g.category}
                        </span>
                        <h4 className="font-black text-sm uppercase text-white">{g.title}</h4>
                        <p className="text-xs text-neutral-400 mt-1">Student: {g.studentName || 'N/A'}</p>
                      </div>
                      <div className="mt-4 pt-3 border-t border-white/10 flex justify-end">
                        <button
                          onClick={() => handleDeleteGalleryItem(g.id)}
                          className="p-2 rounded-xl bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* HERO EDITOR */}
            {activeTab === 'hero' && (
              <div className="space-y-6 max-w-3xl">
                <div>
                  <h1 className="text-3xl font-black uppercase">HERO SECTION COPY</h1>
                  <p className="text-xs text-neutral-400 mt-1">Edit primary hero headlines and announcements.</p>
                </div>

                <div className="space-y-4 text-xs font-semibold">
                  <div>
                    <label className="block text-neutral-300 uppercase mb-1">Hero Main Headline</label>
                    <input
                      type="text"
                      value={siteContent.heroHeading}
                      onChange={(e) => setSiteContent({ ...siteContent, heroHeading: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-black border border-white/20 text-white font-bold text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-neutral-300 uppercase mb-1">Institute Subheading</label>
                    <input
                      type="text"
                      value={siteContent.heroSubheading}
                      onChange={(e) => setSiteContent({ ...siteContent, heroSubheading: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-black border border-white/20 text-white text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-neutral-300 uppercase mb-1">Top Announcement Badge</label>
                    <input
                      type="text"
                      value={siteContent.announcement}
                      onChange={(e) => setSiteContent({ ...siteContent, announcement: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-black border border-white/20 text-white text-sm"
                    />
                  </div>

                  <button
                    onClick={handleSaveAll}
                    className="px-8 py-3.5 rounded-full bg-[#F20D63] text-white font-bold uppercase tracking-wider"
                  >
                    SAVE HERO SETTINGS
                  </button>
                </div>
              </div>
            )}

            {/* ABOUT EDITOR */}
            {activeTab === 'about' && (
              <div className="space-y-6 max-w-3xl">
                <div>
                  <h1 className="text-3xl font-black uppercase">ABOUT SECTION STORY</h1>
                  <p className="text-xs text-neutral-400 mt-1">Refine the editorial narrative.</p>
                </div>

                <div className="space-y-4 text-xs font-semibold">
                  <div>
                    <label className="block text-neutral-300 uppercase mb-1">Headline</label>
                    <input
                      type="text"
                      value={siteContent.aboutHeadline}
                      onChange={(e) => setSiteContent({ ...siteContent, aboutHeadline: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-black border border-white/20 text-white text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-neutral-300 uppercase mb-1">Story Paragraph</label>
                    <textarea
                      rows={4}
                      value={siteContent.aboutStory}
                      onChange={(e) => setSiteContent({ ...siteContent, aboutStory: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-black border border-white/20 text-white text-sm"
                    />
                  </div>

                  <button
                    onClick={handleSaveAll}
                    className="px-8 py-3.5 rounded-full bg-[#F20D63] text-white font-bold uppercase tracking-wider"
                  >
                    SAVE ABOUT STORY
                  </button>
                </div>
              </div>
            )}

            {/* CONTACT SETTINGS */}
            {activeTab === 'settings' && (
              <div className="space-y-6 max-w-3xl">
                <div>
                  <h1 className="text-3xl font-black uppercase">CONTACT & LOCATION SETTINGS</h1>
                  <p className="text-xs text-neutral-400 mt-1">Update campus numbers, email, and address.</p>
                </div>

                <div className="space-y-4 text-xs font-semibold">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-neutral-300 uppercase mb-1">Phone Number</label>
                      <input
                        type="text"
                        value={siteContent.contactPhone}
                        onChange={(e) => setSiteContent({ ...siteContent, contactPhone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-black border border-white/20 text-white text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-neutral-300 uppercase mb-1">WhatsApp Number</label>
                      <input
                        type="text"
                        value={siteContent.contactWhatsapp}
                        onChange={(e) => setSiteContent({ ...siteContent, contactWhatsapp: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-black border border-white/20 text-white text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-neutral-300 uppercase mb-1">Official Email</label>
                    <input
                      type="email"
                      value={siteContent.contactEmail}
                      onChange={(e) => setSiteContent({ ...siteContent, contactEmail: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-black border border-white/20 text-white text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-neutral-300 uppercase mb-1">Bhilai Address</label>
                    <textarea
                      rows={2}
                      value={siteContent.contactAddress}
                      onChange={(e) => setSiteContent({ ...siteContent, contactAddress: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-black border border-white/20 text-white text-sm"
                    />
                  </div>

                  <button
                    onClick={handleSaveAll}
                    className="px-8 py-3.5 rounded-full bg-[#F20D63] text-white font-bold uppercase tracking-wider"
                  >
                    SAVE CONTACT SETTINGS
                  </button>
                </div>
              </div>
            )}
          </main>

          {/* Optional Embedded Live Preview Panel */}
          {livePreview && (
            <div className="w-1/2 bg-neutral-900 border-l border-white/15 flex flex-col hidden lg:flex">
              <div className="p-3 bg-black border-b border-white/10 text-xs font-mono flex items-center justify-between text-neutral-400">
                <span>LIVE PREVIEW SIMULATOR (swinstitute.in)</span>
                <span className="text-[#25D366] font-bold">● REACTIVE INTERACTION ACTIVE</span>
              </div>
              <div className="flex-1 overflow-hidden">
                <iframe
                  src="/"
                  title="SW Institute Live Website Preview"
                  className="w-full h-full border-0"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
