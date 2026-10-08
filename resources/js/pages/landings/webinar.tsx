// Landing page WEBINAR PINTAR, pendaftaran webinar online.
// Halaman ini TIDAK memakai AuthenticatedLayout, header/nav + footer inline, self-contained.
// Tidak menerima props.
import { useMemo, useState, type FormEvent } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { StickyMobileCta } from '@/components/sticky-mobile-cta';
import { CountdownTimer } from '@/components/countdown-timer';
import { StatCounter } from '@/components/stat-counter';
import {
    Award,
    CalendarDays,
    CheckCircle2,
    Clock,
    Download,
    Gift,
    Laptop,
    Menu,
    Mic,
    MonitorPlay,
    Quote,
    Users,
    Video,
    X,
    Zap,
} from 'lucide-react';

// ---------- Data ----------

const PEMBICARA = [
    {
        inisial: 'RS',
        nama: 'Rina Saputra',
        jabatan: 'Head of Digital Marketing, Tokopedia-style Marketplace',
        topik: 'Strategi konten yang mengubah penonton jadi pembeli',
        art: 'from-violet-600 to-purple-800',
        foto: '/images/landing-webinar/pembicara-1.jpg',
    },
    {
        inisial: 'DA',
        nama: 'Dimas Arya',
        jabatan: 'Founder, Kopi Nusantara (120 gerai)',
        topik: 'Membangun brand lokal yang bertahan 10 tahun',
        art: 'from-fuchsia-600 to-violet-800',
        foto: '/images/landing-webinar/pembicara-2.jpg',
    },
    {
        inisial: 'LN',
        nama: 'Laras Nabila',
        jabatan: 'Certified Financial Planner',
        topik: 'Mengelola cashflow bisnis di tengah ketidakpastian',
        art: 'from-indigo-600 to-fuchsia-800',
        foto: '/images/landing-webinar/pembicara-3.jpg',
    },
];

const AGENDA = [
    { jam: '09.00, 09.15', kegiatan: 'Pembukaan & sambutan', pembicara: 'MC' },
    { jam: '09.15, 10.00', kegiatan: 'Sesi 1: Strategi konten yang mengubah penonton jadi pembeli', pembicara: 'Rina Saputra' },
    { jam: '10.00, 10.45', kegiatan: 'Sesi 2: Membangun brand lokal yang bertahan 10 tahun', pembicara: 'Dimas Arya' },
    { jam: '10.45, 11.00', kegiatan: 'Istirahat & kuis berhadiah', pembicara: ', ' },
    { jam: '11.00, 11.45', kegiatan: 'Sesi 3: Mengelola cashflow bisnis di tengah ketidakpastian', pembicara: 'Laras Nabila' },
    { jam: '11.45, 12.15', kegiatan: 'Panel diskusi & tanya jawab terbuka', pembicara: 'Semua pembicara' },
    { jam: '12.15, 12.30', kegiatan: 'Penutupan & pengumuman doorprize', pembicara: 'MC' },
];

const MATERI = [
    'Framework konten 3 lapis: edukasi, bukti sosial, dan ajakan bertindak',
    'Cara membaca data iklan sederhana tanpa perlu jadi analis',
    'Teknik pricing psikologis untuk produk di bawah Rp100 ribu',
    'Template cashflow 13 minggu yang dipakai CFO startup',
    'Checklist audit brand 30 menit untuk bisnismu sendiri',
    'Studi kasus nyata: dari omzet stagnan ke tumbuh 3x dalam setahun',
];

const FAQ = [
    {
        q: 'Apakah webinar ini gratis?',
        a: 'Ya, 100% gratis. Kamu hanya perlu mendaftar lewat formulir di halaman ini. Tautan Zoom dan pengingat akan dikirim ke email dan WhatsApp-mu.',
    },
    {
        q: 'Apakah ada rekaman setelah acara?',
        a: 'Ada. Rekaman tersedia selama 7 hari khusus untuk peserta terdaftar. Materi slide juga bisa diunduh dalam format PDF.',
    },
    {
        q: 'Apakah saya mendapat sertifikat?',
        a: 'Ya. E-sertifikat kehadiran dikirim maksimal 3 hari kerja setelah webinar ke email yang kamu daftarkan.',
    },
    {
        q: 'Bagaimana jika saya tidak bisa hadir tepat waktu?',
        a: 'Kamu tetap bisa bergabung kapan pun selama acara berlangsung. Sesi yang terlewat bisa ditonton ulang lewat rekaman.',
    },
    {
        q: 'Apakah ada doorprize?',
        a: 'Ada! Tiga peserta beruntung mendapat voucher belanja total Rp1.500.000 dan 1 sesi konsultasi bisnis 1-on-1 dengan para pembicara.',
    },
];

// ---------- Halaman ----------

export default function WebinarLanding() {
    const [menuBuka, setMenuBuka] = useState(false);

    // Webinar dijadwalkan 9 hari dari sekarang, pukul 09.00 WIB.
    const targetWebinar = useMemo(() => {
        const d = new Date();
        d.setDate(d.getDate() + 9);
        d.setHours(9, 0, 0, 0);
        return d;
    }, []);

    const tanggalTampil = useMemo(() => {
        const hari = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
        const bulan = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
        return `${hari[targetWebinar.getDay()]}, ${targetWebinar.getDate()} ${bulan[targetWebinar.getMonth()]} ${targetWebinar.getFullYear()}`;
    }, [targetWebinar]);

    // Form registrasi, tanpa backend, hanya state konfirmasi.
    const [nama, setNama] = useState('');
    const [email, setEmail] = useState('');
    const [noWa, setNoWa] = useState('');
    const [registrasiOk, setRegistrasiOk] = useState(false);

    function kirimRegistrasi(e: FormEvent) {
        e.preventDefault();
        if (!nama.trim() || !email.trim() || !noWa.trim()) return;
        setRegistrasiOk(true);
    }

    const scrollKe = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

    const navLinks = [
        { href: '#beranda', label: 'Beranda' },
        { href: '#pembicara', label: 'Pembicara' },
        { href: '#agenda', label: 'Agenda' },
        { href: '#materi', label: 'Materi' },
        { href: '#faq', label: 'FAQ' },
    ];

    return (
        <div className="min-h-screen bg-violet-50/60 pb-24 text-stone-900 md:pb-0">
            {/* Navbar */}
            <header className="sticky top-0 z-40 border-b border-violet-900/10 bg-white/95 backdrop-blur">
                <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
                    <a href="#beranda" className="flex items-center gap-2.5">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-600">
                            <MonitorPlay className="h-5 w-5 text-white" />
                        </span>
                        <span className="text-xl font-extrabold tracking-tight">
                            WEBINAR <span className="text-violet-600">PINTAR</span>
                        </span>
                    </a>
                    <nav className="ml-8 hidden items-center gap-1 md:flex">
                        {navLinks.map((l) => (
                            <a key={l.href} href={l.href} className="rounded-md px-3 py-2 text-sm font-medium text-stone-600 transition-colors hover:bg-violet-600/5 hover:text-stone-900">
                                {l.label}
                            </a>
                        ))}
                    </nav>
                    <Button className="ml-auto hidden bg-violet-600 hover:bg-violet-700 sm:inline-flex" onClick={() => scrollKe('daftar')}>
                        Daftar Gratis
                    </Button>
                    <Button variant="ghost" size="icon" className="ml-auto sm:hidden" onClick={() => setMenuBuka((v) => !v)} aria-label="Menu">
                        {menuBuka ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </Button>
                </div>
                {menuBuka && (
                    <nav className="border-t border-violet-900/10 px-4 py-2 md:hidden">
                        {navLinks.map((l) => (
                            <a key={l.href} href={l.href} onClick={() => setMenuBuka(false)} className="block rounded-md px-3 py-2 text-sm font-medium text-stone-700 hover:bg-violet-600/5">
                                {l.label}
                            </a>
                        ))}
                    </nav>
                )}
            </header>

            {/* Hero + countdown, 1 proposisi konkret */}
            <section id="beranda" className="relative overflow-hidden bg-violet-950 text-white">
                <img
                    src="/images/landing-webinar/hero.jpg"
                    alt="Suasana seminar bisnis dengan banyak peserta"
                    className="absolute inset-0 h-full w-full object-cover opacity-40"
                    loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-violet-950/85 via-purple-950/80 to-indigo-950/85" aria-hidden />
                <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 20% 20%, rgba(167,139,250,.25) 0, transparent 45%), radial-gradient(circle at 85% 75%, rgba(232,121,249,.18) 0, transparent 45%)' }} aria-hidden />
                <div className="relative mx-auto max-w-6xl px-4 py-14 sm:py-20">
                    <div className="grid items-center gap-10 lg:grid-cols-2">
                        <div>
                            <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
                                3,5 jam live: strategi naikkan omzet dari <span className="text-fuchsia-300">3 praktisi lapangan.</span>
                            </h1>
                            <p className="mt-4 max-w-md text-violet-200">
                                Konten yang mengubah penonton jadi pembeli, brand yang bertahan 10 tahun, dan
                                cashflow yang sehat. Live via Zoom, gratis, plus e-sertifikat.
                            </p>
                            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-violet-200">
                                <span className="flex items-center gap-1.5"><CalendarDays className="h-4 w-4" /> {tanggalTampil}</span>
                                <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> 09.00, 12.30 WIB</span>
                                <span className="flex items-center gap-1.5"><Video className="h-4 w-4" /> Live via Zoom</span>
                            </div>
                            <div className="mt-6 flex flex-wrap items-center gap-4">
                                <Button size="lg" className="bg-fuchsia-500 text-white hover:bg-fuchsia-400" onClick={() => scrollKe('daftar')}>
                                    Amankan Kursimu, Gratis
                                </Button>
                                <button onClick={() => scrollKe('agenda')} className="text-sm font-semibold text-violet-200 underline decoration-fuchsia-400/60 underline-offset-4 hover:text-white">
                                    Lihat rundown dulu
                                </button>
                            </div>
                            <p className="mt-3 flex items-center gap-1.5 text-sm text-violet-300">
                                <Users className="h-4 w-4" /> <span className="tnum"><StatCounter value={2847} /></span> peserta sudah mendaftar
                            </p>
                        </div>
                        <Card className="border-white/10 bg-white/5 backdrop-blur">
                            <CardContent className="p-6 sm:p-8">
                                <p className="flex items-center gap-2 text-sm font-semibold text-fuchsia-300"><Zap className="h-4 w-4" /> Pendaftaran ditutup dalam:</p>
                                <div className="mt-4 [&_span]:!bg-white/10 [&_span]:!text-white">
                                    <CountdownTimer target={targetWebinar} />
                                </div>
                                <div className="mt-6 space-y-2.5 border-t border-white/10 pt-5 text-sm">
                                    {[
                                        'E-sertifikat kehadiran',
                                        'Slide materi (PDF)',
                                        'Rekaman 7 hari',
                                        'Doorprize total Rp1,5 jt',
                                    ].map((label) => (
                                        <p key={label} className="flex items-center gap-2 text-violet-100">
                                            <CheckCircle2 className="h-4 w-4 text-emerald-400" /> {label}
                                        </p>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Pembicara */}
            <section id="pembicara" className="mx-auto max-w-6xl scroll-mt-16 px-4 py-14">
                <div className="max-w-2xl">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-violet-700">Pembicara</p>
                    <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight">Belajar dari praktisi lapangan</h2>
                    <p className="mt-2 text-stone-600">Bukan motivator, mereka yang setiap hari mengerjakan apa yang mereka ajarkan.</p>
                </div>
                <div className="mt-8 grid gap-6 md:grid-cols-3">
                    {PEMBICARA.map((p) => (
                        <Card key={p.nama} className="overflow-hidden transition-shadow hover:shadow-lg">
                            <div className="relative h-56 overflow-hidden">
                                <img src={p.foto} alt={p.nama} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
                                <div className={`absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent`} aria-hidden />
                                <div className="absolute bottom-4 left-4 right-4">
                                    <p className="flex items-center gap-1.5 text-lg font-bold text-white"><Mic className="h-4 w-4 text-fuchsia-300" /> {p.nama}</p>
                                    <p className="mt-0.5 text-xs text-white/75">{p.jabatan}</p>
                                </div>
                            </div>
                            <CardContent className="p-5">
                                <p className="rounded-lg bg-violet-50 p-3 text-sm font-medium text-violet-900">"{p.topik}"</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Agenda, timeline vertikal */}
            <section id="agenda" className="scroll-mt-16 bg-white py-14">
                <div className="mx-auto max-w-3xl px-4">
                    <div className="text-center">
                        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-violet-700">Rundown Acara</p>
                        <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight">Agenda {tanggalTampil}</h2>
                        <p className="mt-2 text-sm text-stone-500">3,5 jam padat, tanpa sesi "motivasi" yang bertele-tele.</p>
                    </div>
                    <div className="relative mt-10 space-y-0 before:absolute before:bottom-4 before:left-[7px] before:top-2 before:w-px before:bg-violet-200">
                        {AGENDA.map((a) => (
                            <div key={a.jam} className="relative pb-6 pl-10 last:pb-0">
                                <span className="absolute left-0 top-1 h-4 w-4 rounded-full border-2 border-violet-600 bg-white" />
                                <p className="text-xs font-bold uppercase tracking-wide text-violet-700">{a.jam} WIB</p>
                                <p className="mt-1 font-semibold text-stone-900">{a.kegiatan}</p>
                                <p className="text-xs text-stone-500">{a.pembicara}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Materi */}
            <section id="materi" className="mx-auto max-w-6xl scroll-mt-16 px-4 py-14">
                <div className="text-center">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-violet-700">Yang Dipelajari</p>
                    <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight">Pulang dengan skill baru</h2>
                    <p className="mx-auto mt-2 max-w-lg text-stone-600">Enam hal praktis yang bisa langsung kamu terapkan ke bisnismu minggu depan.</p>
                </div>
                <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {MATERI.map((m, i) => (
                        <div key={m} className="flex items-start gap-3 rounded-xl border border-violet-900/10 bg-white p-4 shadow-sm">
                            <span className="tnum flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-violet-600 text-sm font-bold text-white">{i + 1}</span>
                            <p className="text-sm font-medium text-stone-700">{m}</p>
                        </div>
                    ))}
                </div>
                <div className="mt-8 flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 p-6 text-white">
                    <Laptop className="h-10 w-10 shrink-0" />
                    <p className="max-w-xl text-sm sm:text-base">
                        <span className="font-bold">Bonus khusus peserta live:</span> template cashflow 13 minggu
                        + checklist audit brand dalam format spreadsheet, gratis.
                    </p>
                </div>
            </section>

            {/* Form registrasi + testimoni alumni teratribusi */}
            <section id="daftar" className="scroll-mt-16 bg-violet-950 py-14 text-white">
                <div className="mx-auto grid max-w-6xl items-start gap-8 px-4 lg:grid-cols-2">
                    <div>
                        <h2 className="font-display text-3xl font-extrabold tracking-tight">Daftar sekarang, gratis</h2>
                        <p className="mt-2 max-w-md text-sm text-violet-200">
                            Kuota Zoom terbatas 1.000 peserta live. Setelah mendaftar, tautan Zoom dan pengingat
                            H-1 dikirim otomatis ke email dan WhatsApp-mu.
                        </p>
                        <blockquote className="mt-6 rounded-2xl bg-white/5 p-5 backdrop-blur">
                            <Quote className="h-6 w-6 text-fuchsia-300" />
                            <p className="mt-2 text-sm italic text-violet-100">
                                "Framework konten dari sesi 1 langsung saya terapkan seminggu setelah webinar.
                                Tiga bulan kemudian, omzet toko batik saya naik 40%."
                            </p>
                            <footer className="mt-2 text-xs text-violet-300">
                                <span className="font-semibold text-white">Rina Marlina</span>, owner Batik Rina, Solo · alumni Batch 21
                            </footer>
                        </blockquote>
                        <img
                            src="/images/landing-webinar/daftar.jpg"
                            alt="Peserta mengikuti webinar dari laptop"
                            className="mt-6 h-48 w-full rounded-2xl object-cover"
                            loading="lazy"
                        />
                        <div className="mt-6 flex items-center gap-4">
                            <div className="text-center">
                                <p className="tnum text-2xl font-extrabold text-fuchsia-300"><StatCounter value={24} /></p>
                                <p className="text-xs text-violet-300">Batch terselenggara</p>
                            </div>
                            <div className="h-10 w-px bg-white/15" />
                            <div className="text-center">
                                <p className="tnum text-2xl font-extrabold text-fuchsia-300"><StatCounter value={41} suffix=" rb" /></p>
                                <p className="text-xs text-violet-300">Total alumni</p>
                            </div>
                            <div className="h-10 w-px bg-white/15" />
                            <div className="text-center">
                                <p className="tnum text-2xl font-extrabold text-fuchsia-300">4.9<span className="text-base">/5</span></p>
                                <p className="text-xs text-violet-300">Rating peserta</p>
                            </div>
                        </div>
                    </div>
                    <Card>
                        <CardHeader>
                            <CardTitle>Daftar Webinar</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {registrasiOk ? (
                                <div className="rounded-xl bg-green-50 p-6 text-center">
                                    <CheckCircle2 className="mx-auto h-12 w-12 text-green-600" />
                                    <p className="mt-3 text-lg font-bold text-green-800">Pendaftaran berhasil!</p>
                                    <p className="mt-1 text-sm text-green-700">
                                        Sampai jumpa, <span className="font-semibold">{nama}</span>! Tautan Zoom telah dikirim
                                        ke {email} dan WhatsApp {noWa}. Pengingat H-1 akan menyusul otomatis.
                                    </p>
                                    <Button variant="outline" className="mt-4" onClick={() => { setRegistrasiOk(false); setNama(''); setEmail(''); setNoWa(''); }}>
                                        Daftarkan orang lain
                                    </Button>
                                </div>
                            ) : (
                                <form onSubmit={kirimRegistrasi} className="space-y-4">
                                    <div className="space-y-1.5">
                                        <Label htmlFor="wb-nama">Nama lengkap</Label>
                                        <Input id="wb-nama" placeholder="cth: Rizky Pratama" value={nama} onChange={(e) => setNama(e.target.value)} required />
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label htmlFor="wb-email">Email</Label>
                                        <Input id="wb-email" type="email" placeholder="nama@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label htmlFor="wb-wa">Nomor WhatsApp</Label>
                                        <Input id="wb-wa" placeholder="cth: 081234567890" inputMode="tel" value={noWa} onChange={(e) => setNoWa(e.target.value)} required />
                                    </div>
                                    <Button type="submit" className="w-full bg-violet-600 hover:bg-violet-700">Daftar Gratis Sekarang</Button>
                                    <p className="text-center text-xs text-stone-500">Data hanya dipakai untuk keperluan webinar ini.</p>
                                </form>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* FAQ */}
            <section id="faq" className="mx-auto max-w-3xl scroll-mt-16 px-4 py-14">
                <div className="text-center">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-violet-700">FAQ</p>
                    <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight">Pertanyaan Umum</h2>
                </div>
                <Accordion type="single" collapsible className="mt-8">
                    {FAQ.map((f, i) => (
                        <AccordionItem key={i} value={`item-${i}`}>
                            <AccordionTrigger className="text-left font-semibold">{f.q}</AccordionTrigger>
                            <AccordionContent className="text-stone-600">{f.a}</AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </section>

            {/* Footer */}
            <footer className="bg-stone-950 text-stone-400">
                <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-3">
                    <div>
                        <div className="flex items-center gap-2.5">
                            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-600">
                                <MonitorPlay className="h-4 w-4 text-white" />
                            </span>
                            <span className="text-lg font-extrabold text-white">WEBINAR <span className="text-violet-400">PINTAR</span></span>
                        </div>
                        <p className="mt-3 text-sm">Webinar bisnis praktis untuk UMKM Indonesia. Gratis, rutin tiap bulan.</p>
                    </div>
                    <div>
                        <p className="font-semibold text-white">Navigasi</p>
                        <ul className="mt-3 space-y-1.5 text-sm">
                            <li><a href="#pembicara" className="hover:text-white">Pembicara</a></li>
                            <li><a href="#agenda" className="hover:text-white">Agenda</a></li>
                            <li><a href="#daftar" className="hover:text-white">Pendaftaran</a></li>
                        </ul>
                    </div>
                    <div>
                        <p className="font-semibold text-white">Kontak</p>
                        <ul className="mt-3 space-y-1.5 text-sm">
                            <li>halo@webinarpintar.id</li>
                            <li>0812-3456-7890</li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-stone-800 py-4 text-center text-xs">© 2026 Webinar Pintar. Sampai jumpa di sesi berikutnya!</div>
            </footer>

            {/* CTA sticky mobile */}
            <StickyMobileCta
                variant="cart"
                title="Webinar Pintar"
                subtitle="Gratis • Kuota terbatas"
                actionLabel="Daftar Sekarang"
                onAction={() => document.getElementById('daftar')?.scrollIntoView({ behavior: 'smooth' })}
            />
        </div>
    );
}
