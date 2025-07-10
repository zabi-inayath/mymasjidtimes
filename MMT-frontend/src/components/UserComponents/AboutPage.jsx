import React, { useEffect, useState } from 'react';
import Header from './Header';
import { CodeXml } from 'lucide-react';
import { ThreeDot } from 'react-loading-indicators';
import { redirect } from 'react-router-dom';

const AboutPage = () => {
    const [loading, setLoading] = useState(true);
    const [language, setLanguage] = useState('en');

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1500);
        return () => clearTimeout(timer);
    }, []);

    const translations = {
        en: {
            about: 'About',
            appName: 'myMasjidTimes',
            intro: "is a web app that helps Muslims easily access prayer times for all local masjids, ensuring they never miss praying in congregation jamath. It also guides users to the nearest masjid with an upcoming jamath if they're unsure where to go.",
            features: "Additionally, the app allows users to stay updated with masjid announcements, access Quran tafseer sessions, and view scheduled bayans—keeping them connected to their local Muslim community.",
            growth: "We're starting in Vaniyambadi, but In sha Allah, we aim to grow and serve many more cities in the future!",
            dev: "Meet Developer",
            contact: "Contact",
            feedback: "We welcome your feedback, suggestions, or collaboration ideas!",
            email: "mymasjidtimes@gmail.com",
            submit: "Submit Feedback",
            name: "Your Name",
            phone: "Phone Number",
            message: "Your Message",
        },
        ur: {
            about: 'متعلق',
            appName: 'myMasjidTimes',
            intro: "ایک ویب ایپ ہے جو مسلمانوں کو تمام مقامی مساجد کے نماز کے اوقات تک آسان رسائی فراہم کرتی ہے تاکہ وہ جماعت کی نماز نہ چھوڑیں۔ اگر وہ نہیں جانتے کہاں جانا ہے، تو یہ قریبی مسجد کی رہنمائی بھی کرتا ہے۔",
            features: "یہ ایپ صارفین کو مسجد کی اعلانات، قرآن کی تفسیر، اور بیانات کی تفصیلات سے بھی آگاہ رکھتی ہے تاکہ وہ اپنے مقامی مسلم کمیونٹی سے جڑے رہیں۔",
            growth: "ہم ونییمباڈی سے شروع کر رہے ہیں، ان شاء اللہ جلد ہی کئی اور شہروں میں پھیلیں گے!",
            dev: "ڈیولپر سے ملیے",
            contact: "رابطہ کریں",
            feedback: "ہم آپ کی رائے، تجاویز، یا تعاون کے خیالات کا خیر مقدم کرتے ہیں!",
            email: "mymasjidtimes@gmail.com",
            submit: "تجویز بھیجیں",
            name: "آپ کا نام",
            phone: "فون نمبر",
            message: "آپ کا پیغام",
        },
        ta: {
            about: 'பற்றி',
            appName: 'myMasjidTimes',
            intro: "இது ஒரு வலை பயன்பாடு, இது முஸ்லிம்கள் உள்ளூர் மஸ்ஜித்களில் ஜமாஅத் தொழுகையை தவறவிடாமல் தொழ உதவுகிறது. அருகில் ஜமாஅத் நேரம் உள்ள மஸ்ஜித் எது என்று தெரியவில்லையெனில், அதை காண வழிகாட்டுகிறது.",
            features: "மேலும், மஸ்ஜித் அறிவிப்புகள், குர்ஆன் விளக்க வகுப்புகள் மற்றும் பயான்கள் பற்றிய தகவல்களையும் இது வழங்குகிறது.",
            growth: "நாங்கள் வனியம்பாடியில் தொடங்குகிறோம், இன்ஷா அல்லாஹ் மற்ற நகரங்களுக்கும் விரைவில் விரிவாகப் பரவுவோம்!",
            dev: "டெவலப்பரை சந்திக்கவும்",
            contact: "தொடர்பு கொள்ள",
            feedback: "உங்கள் கருத்துகள், பரிந்துரைகள் மற்றும் ஒத்துழைப்பு எண்ணங்களை வரவேற்கிறோம்!",
            email: "mymasjidtimes@gmail.com",
            submit: "கருத்தை சமர்ப்பிக்கவும்",
            name: "உங்கள் பெயர்",
            phone: "தொலைபேசி எண்",
            message: "உங்கள் செய்தி",
        }
    };

    const t = translations[language];

    if (loading) {
        return (
            <>
                <Header />
                <div className="flex justify-center items-center h-screen">
                    <ThreeDot variant="bounce" color="orange" size="small" />
                </div>
            </>
            
        );
    }

    return (
        <div className="min-h-screen bg-[#fef9ef] flex flex-col">
            <Header />

            {/* Language Selector */}
            <div className="flex justify-end px-4 mt-4">
                <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="border border-yellow-400 text-black bg-white px-3 py-1 rounded-md text-sm"
                >
                    <option value="en">English</option>
                    <option value="ur">Urdu</option>
                    <option value="ta">தமிழ் (Tamil)</option>
                </select>
            </div>

            {/* About Content */}
            <div className="flex-1 px-4 py-6 mb-30">
                <h1 className="text-3xl font-bold text-black mb-8 ml-2 poppins">
                    {t.about} <span className='hagrid text-2xl'>{t.appName}</span>
                </h1>

                <div className="bg-yellow-200 p-6 rounded-2xl mb-8 text-left dm-sans font-medium">
                    <p className="text-black leading-relaxed">
                        <span className='hagrid text-lg font-semibold'>{t.appName}</span> {t.intro}
                        <br /><br />{t.features}
                    </p>
                    <br />
                    <p className="text-black leading-relaxed">{t.growth}</p>
                    <br />
                    <p className="text-black text-center text-sm league-spartan hover:text-yellow-800">
                        Developed with love for the Ummah!
                    </p>
                </div>

                <h2 className="text-3xl font-bold text-black mb-8 ml-2 poppins">{t.dev}</h2>
                <div className="text-center">
                    <div className="bg-gray-600 mb-8 p-4 rounded-2xl flex gap-2 items-center justify-between dm-sans pointer" onClick={() => window.location.href = 'https://zabinayath.space'}>
                        <div className="flex items-center gap-3" >
                            <div className="w-16 h-16 flex items-center justify-center">
                                <img className='rounded-4xl size-15' src='/dev_profile.png' />
                            </div>
                            <div className='text-left'>
                                <h3 className="mb-2 text-white text-2xl hagrid">Syed Zabiullah</h3>
                                <div className='flex gap-3 text-white text-2xl'>
                                    <a href="https://github.com/zabi-inayath"><i className="fa-brands fa-github hover:text-black"></i></a>
                                    <a href="https://www.linkedin.com/in/zabi-inayath/"><i className="fa-brands fa-linkedin hover:text-black"></i></a>
                                    <a href="https://x.com/zabi_inayath"><i className="fa-brands fa-square-x-twitter hover:text-black"></i></a>
                                    <a href="https://www.zabinayath.space"><i className="fa-brands fa-square-instagram hover:text-black"></i></a>
                                </div>
                            </div>
                        </div>

                        <div className="w-12 h-12 flex items-center justify-center mr-2">
                            <CodeXml className='h-8 w-8 text-white' />
                        </div>
                    </div>

                    <h2 className="text-3xl text-left font-bold text-black mb-8 ml-2 poppins">{t.contact}</h2>

                    <div className="bg-yellow-200 p-6 rounded-2xl mb-8">
                        <p className="text-black text-left text-2xl dm-sans leading-relaxed">
                            {t.feedback}
                        </p>
                        <br />
                        <p className="text-black text-left text-xl dm-sans text-center leading-relaxed">
                            {t.email}
                        </p>

                        <form className="mt-6 space-y-4">
                            <input
                                type="text"
                                placeholder={t.name}
                                className="w-full px-4 py-2 rounded-lg bg-white text-gray-700 border border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            />
                            <input
                                type="tel"
                                placeholder={t.phone}
                                className="w-full px-4 py-2 rounded-lg bg-white text-gray-700 border border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            />
                            <textarea
                                placeholder={t.message}
                                rows={4}
                                className="w-full px-4 py-2 rounded-lg bg-white text-gray-700 border border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 resize-none"
                            ></textarea>
                            <button
                                type="submit"
                                className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-2 rounded-xl transition-colors duration-300"
                            >
                                {t.submit}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
