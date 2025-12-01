import { useLanguage } from '../../context/LanguageContext';
import EditableText from '../EditableText';

export default function HeroSlide({ isActive }) {
    const { t } = useLanguage();

    return (
        <div className={`slide hero-slide ${isActive ? 'active' : ''}`}>
            <div className="content-wrapper">
                <div className="tag">
                    <img
                        src="/assets/bnb.png"
                        alt="Binance Smart Chain"
                        style={{ height: '1.2em', verticalAlign: 'text-bottom', marginRight: '0.5rem' }}
                    />
                    <EditableText textKey="hero_tag" as="span" />
                </div>
                <img
                    src="/assets/logo.svg"
                    alt="Oikos Protocol Logo"
                    style={{
                        display: 'block',
                        margin: '1.5rem auto',
                        height: '200px',
                        filter: 'drop-shadow(0 0 20px rgba(99, 102, 241, 0.4))'
                    }}
                />
                <EditableText textKey="hero_title" as="h1" />
                <EditableText textKey="hero_subtitle" as="p" style={{ fontSize: '1.5rem', color: '#9ca3af' }} />
                <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    <div style={{ padding: '1rem 2rem', borderLeft: '2px solid var(--accent-primary)', textAlign: 'left' }}>
                        <EditableText textKey="hero_fairness_title" as="div" style={{ color: 'white', fontWeight: 'bold' }} />
                        <EditableText textKey="hero_fairness_desc" as="div" style={{ fontSize: '0.9rem' }} />
                    </div>
                    <div style={{ padding: '1rem 2rem', borderLeft: '2px solid var(--accent-secondary)', textAlign: 'left' }}>
                        <EditableText textKey="hero_liquidity_title" as="div" style={{ color: 'white', fontWeight: 'bold' }} />
                        <EditableText textKey="hero_liquidity_desc" as="div" style={{ fontSize: '0.9rem' }} />
                    </div>
                </div>
            </div>
        </div>
    );
}
