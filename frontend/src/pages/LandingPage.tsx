import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Users,
    MessageSquare,
    Clock,
    ArrowRight,
    Upload,
    Bell,
    PieChart,
    Heart,
    Menu,
    X,
    Play,
    Check
} from 'lucide-react';

const LandingPage: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    return (
        <div className="min-h-screen bg-white">
            {/* Navbar */}
            <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-20 items-center">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-gradient-to-tr from-purple-700 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-200">
                                <span className="text-white font-bold text-xl">S</span>
                            </div>
                            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-800 to-indigo-700">ShaadiFlow</span>
                        </div>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center gap-10">
                            <a href="#features" className="text-slate-600 hover:text-purple-700 font-medium transition-colors">Features</a>
                            <a href="#how-it-works" className="text-slate-600 hover:text-purple-700 font-medium transition-colors">How It Works</a>
                            <a href="#pricing" className="text-slate-600 hover:text-purple-700 font-medium transition-colors">Pricing</a>
                            <a href="#testimonials" className="text-slate-600 hover:text-purple-700 font-medium transition-colors">Testimonials</a>
                        </div>

                        <div className="hidden md:flex items-center gap-4">
                            <Link to="/login" className="text-slate-700 hover:text-purple-700 font-semibold px-4 py-2 transition-colors">Log In</Link>
                            <Link to="/login" className="bg-purple-700 hover:bg-purple-800 text-white px-6 py-2.5 rounded-full font-bold shadow-lg shadow-purple-200 transition-all hover:scale-105">
                                Start Free
                            </Link>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden">
                            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-slate-600">
                                {isMenuOpen ? <X /> : <Menu />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile menu items */}
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="md:hidden bg-white border-b border-slate-100 p-4"
                    >
                        <div className="flex flex-col gap-4">
                            <a href="#features" className="text-slate-600 font-medium">Features</a>
                            <a href="#how-it-works" className="text-slate-600 font-medium">How It Works</a>
                            <a href="#pricing" className="text-slate-600 font-medium">Pricing</a>
                            <Link to="/login" className="text-slate-600 font-medium">Log In</Link>
                            <Link to="/login" className="bg-purple-700 text-white px-6 py-3 rounded-xl font-bold text-center">Start Free</Link>
                        </div>
                    </motion.div>
                )}
            </nav>

            {/* Hero Section */}
            <section className="pt-40 pb-20 px-4">
                <div className="max-w-7xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="inline-flex items-center gap-2 bg-purple-50 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold mb-8 border border-purple-100">
                            <Heart className="w-4 h-4 fill-purple-700" />
                            India's #1 Wedding Guest Management Platform
                        </div>

                        <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-6 leading-tight">
                            Manage Your Entire <br />
                            Wedding Guest List <br />
                            <span className="text-purple-700 italic">Without the Chaos</span>
                        </h1>

                        <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
                            Automate WhatsApp invitations, track RSVPs in real-time, and split guests by Bride & Groom side — all from one beautiful dashboard.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                            <Link to="/login" className="bg-purple-700 hover:bg-purple-800 text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-xl shadow-purple-200 transition-all hover:scale-105 flex items-center gap-2">
                                Start Free <ArrowRight className="w-5 h-5" />
                            </Link>
                            <button className="bg-white border-2 border-slate-200 hover:border-purple-200 hover:bg-purple-50 px-10 py-5 rounded-2xl font-bold text-lg text-slate-700 transition-all flex items-center gap-2">
                                <Play className="w-5 h-5 fill-slate-700" /> Book a Demo
                            </button>
                        </div>

                        <p className="text-slate-400 text-sm">No credit card required · Set up in 2 minutes</p>
                    </motion.div>

                    {/* Dashboard Preview mockup */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="mt-20 relative max-w-5xl mx-auto"
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 to-transparent blur-3xl -z-10 rounded-full h-[60%] w-[80%] mx-auto bottom-0"></div>
                        <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden ring-8 ring-slate-100/50">
                            {/* Realistic Dashboard UI */}
                            <div className="p-8 text-left bg-white">
                                {/* Header */}
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                                    <div>
                                        <h3 className="text-2xl font-bold text-slate-900">Priya & Rahul's Wedding</h3>
                                        <p className="text-slate-500 text-sm font-medium">December 15, 2026 · Jaipur</p>
                                    </div>
                                    <div className="flex flex-wrap gap-2 text-[10px] font-bold uppercase tracking-wider">
                                        <span className="bg-green-100 text-green-700 px-3 py-1.5 rounded-full border border-green-200">830 Accepted</span>
                                        <span className="bg-amber-100 text-amber-700 px-3 py-1.5 rounded-full border border-amber-200">145 Pending</span>
                                        <span className="bg-red-100 text-red-700 px-3 py-1.5 rounded-full border border-red-200">25 Declined</span>
                                    </div>
                                </div>

                                {/* Stats Grid */}
                                <div className="grid grid-cols-2 md:grid-cols-4 border border-slate-100 rounded-2xl overflow-hidden mb-8">
                                    <div className="p-6 border-r border-b md:border-b-0 border-slate-100 text-center">
                                        <div className="text-2xl font-black text-slate-900">1,000</div>
                                        <div className="text-[10px] font-bold text-slate-400 uppercase">Total Guests</div>
                                    </div>
                                    <div className="p-6 border-r border-b md:border-b-0 border-slate-100 text-center">
                                        <div className="text-2xl font-black text-purple-700">520</div>
                                        <div className="text-[10px] font-bold text-slate-400 uppercase">Bride Side</div>
                                    </div>
                                    <div className="p-6 border-r border-slate-100 text-center">
                                        <div className="text-2xl font-black text-amber-600">480</div>
                                        <div className="text-[10px] font-bold text-slate-400 uppercase">Groom Side</div>
                                    </div>
                                    <div className="p-6 text-center">
                                        <div className="text-2xl font-black text-slate-900">97.5%</div>
                                        <div className="text-[10px] font-bold text-slate-400 uppercase">Response Rate</div>
                                    </div>
                                </div>

                                {/* Table Mockup */}
                                <div className="border border-slate-100 rounded-2xl overflow-hidden">
                                    <div className="bg-slate-50/50 grid grid-cols-4 p-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">
                                        <span>Family</span>
                                        <span>Size</span>
                                        <span>Side</span>
                                        <span>Status</span>
                                    </div>
                                    {[
                                        { name: 'Sharma Family', size: '6 people', side: 'Bride', status: 'Accepted', color: 'text-green-600', sideColor: 'bg-purple-100 text-purple-700' },
                                        { name: 'Kapoor Family', size: '4 people', side: 'Groom', status: 'Pending', color: 'text-amber-600', sideColor: 'bg-amber-100 text-amber-700' },
                                        { name: 'Patel Family', size: '8 people', side: 'Bride', status: 'Accepted', color: 'text-green-600', sideColor: 'bg-purple-100 text-purple-700' },
                                        { name: 'Mehta Family', size: '3 people', side: 'Groom', status: 'Declined', color: 'text-red-500', sideColor: 'bg-amber-100 text-amber-700' }
                                    ].map((row, i) => (
                                        <div key={i} className="grid grid-cols-4 p-4 items-center border-b border-slate-50 last:border-0 hover:bg-slate-50/30 transition-colors">
                                            <span className="text-sm font-bold text-slate-800">{row.name}</span>
                                            <span className="text-xs text-slate-500">{row.size}</span>
                                            <div>
                                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${row.sideColor}`}>{row.side}</span>
                                            </div>
                                            <span className={`text-xs font-bold ${row.color}`}>{row.status}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* A dashboard you'll actually love */}
            <section className="py-24 bg-slate-50/50 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                            A dashboard you'll <span className="text-purple-700 italic">actually love</span>
                        </h2>
                        <p className="text-slate-500 text-lg max-w-2xl mx-auto font-medium">
                            Everything at a glance. No spreadsheets, no confusion.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative max-w-5xl mx-auto"
                    >
                        <div className="bg-white rounded-[2rem] shadow-2xl shadow-purple-100 border border-slate-100 overflow-hidden p-6 md:p-10">
                            {/* Realistic Dashboard UI - Reuse same design for consistency or slightly different data */}
                            <div className="text-left">
                                {/* Header */}
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                                    <div>
                                        <h3 className="text-2xl font-bold text-slate-900">Priya & Rahul's Wedding</h3>
                                        <p className="text-slate-500 text-sm font-medium">December 15, 2026 · Jaipur</p>
                                    </div>
                                    <div className="flex flex-wrap gap-2 text-[10px] font-bold uppercase tracking-wider">
                                        <span className="bg-green-100 text-green-700 px-3 py-1.5 rounded-full border border-green-200">830 Accepted</span>
                                        <span className="bg-amber-100 text-amber-700 px-3 py-1.5 rounded-full border border-amber-200">145 Pending</span>
                                        <span className="bg-red-100 text-red-700 px-3 py-1.5 rounded-full border border-red-200">25 Declined</span>
                                    </div>
                                </div>

                                {/* Stats Grid */}
                                <div className="grid grid-cols-2 md:grid-cols-4 border border-slate-100 rounded-2xl overflow-hidden mb-8">
                                    <div className="p-6 border-r border-b md:border-b-0 border-slate-100 text-center">
                                        <div className="text-2xl font-black text-slate-900">1,000</div>
                                        <div className="text-[10px] font-bold text-slate-400 uppercase">Total Guests</div>
                                    </div>
                                    <div className="p-6 border-r border-b md:border-b-0 border-slate-100 text-center">
                                        <div className="text-2xl font-black text-purple-700">520</div>
                                        <div className="text-[10px] font-bold text-slate-400 uppercase">Bride Side</div>
                                    </div>
                                    <div className="p-6 border-r border-slate-100 text-center">
                                        <div className="text-2xl font-black text-amber-600">480</div>
                                        <div className="text-[10px] font-bold text-slate-400 uppercase">Groom Side</div>
                                    </div>
                                    <div className="p-6 text-center">
                                        <div className="text-2xl font-black text-slate-900">97.5%</div>
                                        <div className="text-[10px] font-bold text-slate-400 uppercase">Response Rate</div>
                                    </div>
                                </div>

                                {/* Table Mockup */}
                                <div className="border border-slate-100 rounded-2xl overflow-hidden">
                                    <div className="bg-slate-50/50 grid grid-cols-4 p-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">
                                        <span>Family</span>
                                        <span>Size</span>
                                        <span>Side</span>
                                        <span>Status</span>
                                    </div>
                                    {[
                                        { name: 'Sharma Family', size: '6 people', side: 'Bride', status: 'Accepted', color: 'text-green-600', sideColor: 'bg-purple-100 text-purple-700' },
                                        { name: 'Kapoor Family', size: '4 people', side: 'Groom', status: 'Pending', color: 'text-amber-600', sideColor: 'bg-amber-100 text-amber-700' },
                                        { name: 'Patel Family', size: '8 people', side: 'Bride', status: 'Accepted', color: 'text-green-600', sideColor: 'bg-purple-100 text-purple-700' },
                                        { name: 'Mehta Family', size: '3 people', side: 'Groom', status: 'Declined', color: 'text-red-500', sideColor: 'bg-amber-100 text-amber-700' },
                                        { name: 'Gupta Family', size: '5 people', side: 'Bride', status: 'Accepted', color: 'text-green-600', sideColor: 'bg-purple-100 text-purple-700' }
                                    ].map((row, i) => (
                                        <div key={i} className="grid grid-cols-4 p-4 items-center border-b border-slate-50 last:border-0 hover:bg-slate-50/30 transition-colors">
                                            <span className="text-sm font-bold text-slate-800">{row.name}</span>
                                            <span className="text-xs text-slate-500">{row.size}</span>
                                            <div>
                                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${row.sideColor}`}>{row.side}</span>
                                            </div>
                                            <span className={`text-xs font-bold ${row.color}`}>{row.status}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
                        <div>
                            <div className="text-4xl font-bold text-slate-900 mb-2">5,000+</div>
                            <p className="text-slate-500 font-medium text-sm">Weddings Managed</p>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-slate-900 mb-2">12L+</div>
                            <p className="text-slate-500 font-medium text-sm">Guests Tracked</p>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-slate-900 mb-2">98%</div>
                            <p className="text-slate-500 font-medium text-sm">RSVP Response Rate</p>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-slate-900 mb-2">4.9★</div>
                            <p className="text-slate-500 font-medium text-sm">Planner Rating</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Problem Section */}
            <section className="py-32 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                        Wedding planning is <span className="text-purple-700">stressful enough</span>
                    </h2>
                    <p className="text-slate-500 text-lg mb-16 max-w-xl mx-auto">
                        Managing 300-2000+ guests shouldn't add to the chaos.
                    </p>

                    <div className="grid md:grid-cols-4 gap-8">
                        {[
                            { icon: Users, title: "Who is actually coming?", desc: "Families confirm verbally, then change plans. You never have a clear headcount." },
                            { icon: MessageSquare, title: "How many per family?", desc: "Uncle said 4, now bringing 8. Tracking family sizes is a nightmare." },
                            { icon: Clock, title: "Last-minute confusion", desc: "The caterer needs final numbers tomorrow and half the list hasn't responded." },
                            { icon: Bell, title: "Manual WhatsApp chaos", desc: "Copying, pasting, sending 500+ messages one by one. Sound familiar?" }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ y: -10 }}
                                className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 text-left"
                            >
                                <div className="w-12 h-12 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mb-6">
                                    <item.icon size={24} />
                                </div>
                                <h3 className="font-bold text-lg mb-3 text-slate-900">"{item.title}"</h3>
                                <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Solution Section */}
            <section id="features" className="py-32 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-20">
                        <span className="bg-amber-100 text-amber-700 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6 inline-block">THE SOLUTION</span>
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                            ShaadiFlow makes it <span className="text-amber-600">effortless</span>
                        </h2>
                        <p className="text-slate-500 text-lg">Four simple steps to stress-free guest management.</p>
                    </div>

                    <div className="grid md:grid-cols-4 gap-12 relative">
                        {/* Connector lines on desktop */}
                        <div className="hidden md:block absolute top-[60px] left-[15%] right-[15%] h-[2px] bg-slate-100 -z-0"></div>

                        {[
                            { num: 1, icon: Upload, title: "Upload your guest list", desc: "Import from Excel or add manually. Organize by family, side, and event." },
                            { num: 2, icon: ArrowRight, title: "Send WhatsApp invites", desc: "Personalized invitations sent at scale with one click." },
                            { num: 3, icon: MessageSquare, title: "Collect responses automatically", desc: "Guests RSVP via WhatsApp. No app downloads needed." },
                            { num: 4, icon: PieChart, title: "Track everything live", desc: "Real-time dashboard with headcount, family sizes, and Bride vs Groom split." }
                        ].map((step, i) => (
                            <div key={i} className="text-center group relative z-10">
                                <div className="w-24 h-24 bg-white border-2 border-slate-100 group-hover:border-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-sm transition-all relative">
                                    <div className="absolute -top-3 -right-3 w-8 h-8 bg-purple-700 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-lg">
                                        {step.num}
                                    </div>
                                    <div className="text-slate-400 group-hover:text-purple-700 transition-colors">
                                        <step.icon size={32} />
                                    </div>
                                </div>
                                <h3 className="font-bold text-lg mb-3 text-slate-900">{step.title}</h3>
                                <p className="text-slate-500 text-sm leading-relaxed px-4">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-32 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                        Everything you need, <span className="text-purple-700">nothing you don't</span>
                    </h2>
                    <p className="text-slate-500 text-lg mb-20">Purpose-built for Indian weddings with 300-2000+ guests.</p>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 text-left">
                            <Users className="w-10 h-10 text-purple-600 mb-6" />
                            <h3 className="text-xl font-bold mb-4">Guest Management</h3>
                            <p className="text-slate-500 leading-relaxed text-sm">Upload & organize guests by family, event, and side. Handle 2000+ guests effortlessly.</p>
                        </div>
                        <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 text-left">
                            <MessageSquare className="w-10 h-10 text-purple-600 mb-6" />
                            <h3 className="text-xl font-bold mb-4">WhatsApp Invitations</h3>
                            <p className="text-slate-500 leading-relaxed text-sm">Send personalized invites at scale. Beautiful templates with family names, event details, and RSVP links.</p>
                        </div>
                        <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 text-left">
                            <PieChart className="w-10 h-10 text-purple-600 mb-6" />
                            <h3 className="text-xl font-bold mb-4">RSVP Tracking</h3>
                            <p className="text-slate-500 leading-relaxed text-sm">Real-time response tracking with headcount, dietary preferences, and attendance status.</p>
                        </div>
                        <div className="bg-purple-700 p-10 rounded-3xl shadow-xl text-left text-white md:col-span-2 relative overflow-hidden group">
                            <div className="absolute top-4 right-4 bg-amber-400 text-amber-950 text-xs font-bold px-3 py-1 rounded-full uppercase">HIGHLIGHT</div>
                            <Heart className="w-10 h-10 text-purple-200 mb-6" />
                            <h3 className="text-2xl font-bold mb-4">Bride vs Groom Split</h3>
                            <p className="text-purple-100 leading-relaxed max-w-md">Separate guest lists, budgets, and tracking for each side. Handle the feature every Indian wedding needs.</p>
                            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
                        </div>
                        <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 text-left">
                            <Clock className="w-10 h-10 text-purple-600 mb-6" />
                            <h3 className="text-xl font-bold mb-4">Automated Reminders</h3>
                            <p className="text-slate-500 leading-relaxed text-sm">Smart follow-ups via WhatsApp. No more manually chasing 200 families for a response.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section id="pricing" className="py-32 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                            Simple, <span className="text-purple-700">transparent</span> pricing
                        </h2>
                        <p className="text-slate-500 text-lg">Less than what you'd spend on one extra guest's dinner plate.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 items-end">
                        {/* Free/Small Plan */}
                        <div className="bg-white p-10 rounded-3xl border border-slate-100 shadow-sm text-center">
                            <h3 className="text-xl font-bold mb-2">Per Wedding</h3>
                            <p className="text-slate-400 text-sm mb-6">Perfect for families managing a single wedding.</p>
                            <div className="text-4xl font-extrabold text-slate-900 mb-8">₹4,999 <span className="text-sm text-slate-400 font-normal">one-time</span></div>
                            <Link to="/login" className="block w-full bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold py-4 rounded-xl mb-8 transition-colors">Start Free</Link>
                            <ul className="text-left space-y-4 text-slate-600 text-sm">
                                <li className="flex items-center gap-3"><Check className="w-5 h-5 text-green-500" /> Up to 500 guests</li>
                                <li className="flex items-center gap-3"><Check className="w-5 h-5 text-green-500" /> WhatsApp invitations</li>
                                <li className="flex items-center gap-3"><Check className="w-5 h-5 text-green-500" /> RSVP Tracking</li>
                            </ul>
                        </div>

                        {/* Popular Plan */}
                        <div className="bg-white p-10 rounded-[2.5rem] border-2 border-purple-600 shadow-2xl shadow-purple-200 text-center relative z-10 scale-105">
                            <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-amber-400 text-amber-950 text-xs font-bold px-4 py-1.5 rounded-full uppercase shadow-lg">MOST POPULAR</div>
                            <h3 className="text-xl font-bold mb-2">Premium Wedding</h3>
                            <p className="text-slate-400 text-sm mb-6">For grand weddings with large guest lists.</p>
                            <div className="text-5xl font-extrabold text-slate-900 mb-8">₹9,999 <span className="text-sm text-slate-400 font-normal">one-time</span></div>
                            <Link to="/login" className="block w-full bg-gradient-to-r from-purple-700 to-indigo-600 hover:from-purple-800 hover:to-indigo-700 text-white font-bold py-4 rounded-xl mb-8 shadow-lg shadow-purple-200 transition-all hover:scale-105">Start Free</Link>
                            <ul className="text-left space-y-4 text-slate-600">
                                <li className="flex items-center gap-3"><Check className="w-5 h-5 text-green-500" /> Up to 2,000 guests</li>
                                <li className="flex items-center gap-3"><Check className="w-5 h-5 text-green-500" /> Everything in Per Wedding</li>
                                <li className="flex items-center gap-3"><Check className="w-5 h-5 text-green-500" /> Dedicated Manager</li>
                            </ul>
                        </div>

                        {/* Planner Plan */}
                        <div className="bg-white p-10 rounded-3xl border border-slate-100 shadow-sm text-center">
                            <h3 className="text-xl font-bold mb-2">Planner Plan</h3>
                            <p className="text-slate-400 text-sm mb-6">For wedding planners managing multiple clients.</p>
                            <div className="text-4xl font-extrabold text-slate-900 mb-8">₹2,499 <span className="text-sm text-slate-400 font-normal">/month</span></div>
                            <button className="block w-full bg-indigo-900 text-white font-bold py-4 rounded-xl mb-8 hover:bg-indigo-950 transition-colors">Book Demo</button>
                            <ul className="text-left space-y-4 text-slate-600 text-sm">
                                <li className="flex items-center gap-3"><Check className="w-5 h-5 text-green-500" /> Unlimited weddings</li>
                                <li className="flex items-center gap-3"><Check className="w-5 h-5 text-green-500" /> Unlimited guests</li>
                                <li className="flex items-center gap-3"><Check className="w-5 h-5 text-green-500" /> Custom branding</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-slate-900 py-20 text-white">
                <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-12">
                    <div className="col-span-2">
                        <div className="flex items-center gap-2 mb-8">
                            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-lg">S</span>
                            </div>
                            <span className="text-2xl font-bold">ShaadiFlow</span>
                        </div>
                        <p className="text-slate-400 max-w-sm mb-8">
                            Simplifying Indian wedding guest management with the power of WhatsApp automation.
                        </p>
                        <div className="flex gap-4">
                            <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-purple-600 transition-colors cursor-pointer">
                                <MessageSquare className="w-5 h-5" />
                            </div>
                            <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-purple-600 transition-colors cursor-pointer">
                                <Users className="w-5 h-5" />
                            </div>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-bold mb-6">Product</h4>
                        <ul className="space-y-4 text-slate-400 text-sm">
                            <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">How It Works</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-6">Company</h4>
                        <ul className="space-y-4 text-slate-400 text-sm">
                            <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                        </ul>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto px-4 border-t border-slate-800 mt-20 pt-8 text-center text-slate-500 text-sm">
                    © 2026 ShaadiFlow. All rights reserved. Made with ❤️ for Indian Weddings.
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
