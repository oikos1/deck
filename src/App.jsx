import { useState, useRef, useEffect, useCallback } from 'react';
import { isMobile } from 'react-device-detect';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import BackgroundCanvas from './components/BackgroundCanvas';
import BackgroundControls from './components/BackgroundControls';
import LanguageSelector from './components/LanguageSelector';
import EditModeToggle from './components/EditModeToggle';
import HeroSlide from './components/slides/HeroSlide';
import MissionSlide from './components/slides/MissionSlide';
import MarketSlide from './components/slides/MarketSlide';
import ProblemFoundersSlide from './components/slides/ProblemFoundersSlide';
import ProblemHoldersSlide from './components/slides/ProblemHoldersSlide';
import SolutionSlide from './components/slides/SolutionSlide';
import TechSlide from './components/slides/TechSlide';
import FeaturesSlide from './components/slides/FeaturesSlide';
import CreatorsSlide from './components/slides/CreatorsSlide';
import LaunchpadSlide from './components/slides/LaunchpadSlide';
import BusinessSlide from './components/slides/BusinessSlide';
import NomaTokenSlide from './components/slides/NomaTokenSlide';
import HoldersSlide from './components/slides/HoldersSlide';
import RoadmapSlide from './components/slides/RoadmapSlide';
import ContactSlide from './components/slides/ContactSlide';
import './App.css';

const slides = [
    HeroSlide,
    MissionSlide,
    MarketSlide,
    ProblemFoundersSlide,
    ProblemHoldersSlide,
    SolutionSlide,
    TechSlide,
    FeaturesSlide,
    CreatorsSlide,
    LaunchpadSlide,
    HoldersSlide,
    BusinessSlide,
    NomaTokenSlide,
    RoadmapSlide,
    ContactSlide,
];

function PitchDeck() {
    const { t } = useLanguage();
    const [currentSlide, setCurrentSlide] = useState(0);
    const [bgOpacity, setBgOpacity] = useState(0.2);
    const bgCanvasRef = useRef(null);

    const totalSlides = slides.length;
    const progress = ((currentSlide + 1) / totalSlides) * 100;

    const nextSlide = useCallback(() => {
        if (currentSlide < totalSlides - 1) {
            setCurrentSlide(prev => prev + 1);
        }
    }, [currentSlide, totalSlides]);

    const prevSlide = useCallback(() => {
        if (currentSlide > 0) {
            setCurrentSlide(prev => prev - 1);
        }
    }, [currentSlide]);

    const handleSwitchBg = (type) => {
        if (bgCanvasRef.current) {
            bgCanvasRef.current.switchEffect(type);
        }
    };

    const handleOpacityChange = (value) => {
        setBgOpacity(value);
    };

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            // Don't trigger navigation when user is typing in an input or textarea
            const activeElement = document.activeElement;
            const isEditing = activeElement?.tagName === 'INPUT' ||
                              activeElement?.tagName === 'TEXTAREA' ||
                              activeElement?.isContentEditable;

            if (isEditing) return;

            if (e.key === 'ArrowRight' || e.key === ' ') {
                e.preventDefault();
                nextSlide();
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                prevSlide();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [nextSlide, prevSlide]);

    return (
        <>
            <BackgroundCanvas ref={bgCanvasRef} opacity={bgOpacity} />
            <EditModeToggle />
            <LanguageSelector />
            <BackgroundControls
                onSwitchBg={handleSwitchBg}
                onOpacityChange={handleOpacityChange}
            />

            <div className="slides-container">
                <div className="progress" style={{ width: `${progress}%` }} />

                {slides.map((SlideComponent, index) => (
                    <SlideComponent key={index} isActive={currentSlide === index} />
                ))}

                <div className="controls" style={{marginBottom: (isMobile ? "auto" : 40)}}>
                    <span style={{ marginRight: '1rem', color: '#6b7280' }}>
                        {currentSlide + 1} / {totalSlides}
                    </span>
                    <button
                        onClick={prevSlide}
                        disabled={currentSlide === 0}
                    >
                        {t('controls_prev')}
                    </button>
                    <button
                        onClick={nextSlide}
                        disabled={currentSlide === totalSlides - 1}
                    >
                        {t('controls_next')}
                    </button>
                </div>
            </div>

            {/* Mobile indicator - shows device type */}
            {isMobile && (
                <div style={{
                    position: 'fixed',
                    bottom: '70px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    fontSize: '0.7rem',
                    color: '#4b5563',
                    opacity: 0.5
                }}>
                    Mobile View
                </div>
            )}
        </>
    );
}

function App() {
    return (
        <LanguageProvider>
            <PitchDeck />
        </LanguageProvider>
    );
}

export default App;
