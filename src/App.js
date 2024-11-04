import React, { useState, useEffect } from 'react';
import { ChevronRight, X, Menu } from 'lucide-react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import "@fontsource/space-grotesk/300.css";
import "@fontsource/space-grotesk/400.css";
import "@fontsource/space-grotesk/500.css";
import "@fontsource/space-grotesk/600.css";
import "@fontsource/space-grotesk/700.css";
import './App.css';
import { InteractiveBubbles } from './components/InteractiveBubbles';


/**
 * Navigation component
 * Enhanced navigation with animations and responsive design
 */
function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Features', action: () => {} },
    { label: 'About Us', action: () => {} },
    { label: 'Account', action: () => {} }
  ];

  return (
    <nav className={`nav-container ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-content">
        <div className="nav-left">
          <div className="nav-logo">PandaCharts</div>
          
          <div className={`nav-items ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
            {navItems.map((item, index) => (
              <button key={index} onClick={item.action} className="nav-item">
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        <button 
          className="try-now-button"
          onClick={() => navigate('/SignUp')}
        >
          Try Now!
        </button>

        <button 
          className="mobile-menu-button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </nav>
  );
}

/**
 * Gantt Chart component
 * Displays a Gantt chart with tasks, durations, and progress
 */
function GanttChart() {
  const ganttData = [
    { 
      id: 1,
      task: 'Design Overview',
      start: 0,
      duration: 3,
      progress: 100,
      progressClass: 'gantt-progress-blue'
    },
    {
      id: 2,
      task: 'Cloud Structure',
      start: 2,
      duration: 4,
      progress: 75,
      progressClass: 'gantt-progress-rose'
    },
    {
      id: 3,
      task: 'UX/UI Packaging',
      start: 5,
      duration: 6,
      progress: 50,
      progressClass: 'gantt-progress-orange'
    }
  ];

  const totalDays = 8;
  const dayWidth = 40;
  
  return (
    <div className="gantt-container">
      <div className="gantt-title">Creative Project</div>
      <div className="gantt-subtitle">GANTT CHART</div>
      <div style={{ width: `${totalDays * dayWidth + 150}px` }}>
        <div className="gantt-header">
          <div className="gantt-task-column">Task</div>
          {Array.from({ length: totalDays }, (_, i) => (
            <div key={i} className="gantt-day">
              {i + 1}
            </div>
          ))}
        </div>
        
        {ganttData.map((task) => (
          <div key={task.id} className="gantt-row">
            <div className="gantt-task-name">{task.task}</div>
            <div className="gantt-bar-container" style={{ marginLeft: `${task.start * dayWidth}px` }}>
              <div 
                className="gantt-progress-bar"
                style={{ width: `${task.duration * dayWidth}px` }}
              >
                <div 
                  className={`gantt-progress ${task.progressClass}`}
                  style={{ width: `${task.progress}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Hero Card component
 * Renders the main hero section with interactive dropdowns
 */
function HeroCard() {
  const [activeContent, setActiveContent] = useState(null);

  const handleClose = () => {
    const dropdown = document.querySelector('.hero-dropdown');
    dropdown.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => setActiveContent(null), 280);
  };

  return (
    <div className="hero-card">
      <h1 className="hero-title">PandaCharts</h1>
      <div className="hero-content-layout">
        <div className="hero-buttons-container">
          <button 
            className="hero-button"
            onClick={() => setActiveContent(activeContent === 'about' ? null : 'about')}
          >
            <span>About Us</span>
            <ChevronRight size={18} />
          </button>

          <button 
            className="hero-button"
            onClick={() => setActiveContent(activeContent === 'benefits' ? null : 'benefits')}
          >
            <span>Our Benefits</span>
            <ChevronRight size={18} />
          </button>
        </div>
        
        <div className="hero-dropdown-container">
          {activeContent === 'benefits' && (
            <div className="hero-dropdown">
              <button 
                onClick={handleClose}
                className="hero-dropdown-close"
              >
                <X size={16} />
              </button>
              <div className="hero-dropdown-content">
                <h4 className="hero-dropdown-heading">Key Benefits:</h4>
                <ul className="hero-dropdown-list">
                  <li>Instant Timeline Clarity: Create professional Gantt charts in minutes</li>
                  <li>Team Alignment: Real-time updates keep everyone synchronized</li>
                  <li>Flexible Planning: Easily adjust timelines and dependencies</li>
                  <li>Resource Optimization: Visual resource allocation prevents bottlenecks</li>
                </ul>
                <p className="hero-dropdown-text">
                  Whether you're managing complex projects or simple tasks, PandaCharts helps you deliver on time, every time. Join thousands of successful teams who've simplified their project visualization.
                </p>
              </div>
            </div>
          )}

          {activeContent === 'about' && (
            <div className="hero-dropdown">
              <button 
                onClick={handleClose}
                className="hero-dropdown-close"
              >
                <X size={16} />
              </button>
              <p className="hero-dropdown-text">
                PandaCharts combines powerful visualization tools with seamless collaboration features to help teams of all sizes track progress effortlessly.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * Content Section component
 * Renders a content section with a title, description, list of items, and a button
 */
function ContentSection({ section }) {
  return (
    <div className="content-card">
      <h3 className="content-title">{section.title}</h3>
      <p className="content-description">{section.description}</p>
      
      <ul className="content-list">
        {section.items.map((item, index) => (
          <li key={index} className="content-list-item">
            {item}
          </li>
        ))}
      </ul>
      
      <button className="modern-button modern-button-primary content-button">
        <span className="modern-button-text">{section.buttonText}</span>
        <ChevronRight size={18} className="modern-button-icon" />
        <div className="modern-button-shine" />
        <div className="modern-button-glow" />
      </button>
    </div>
  );
}

/**
 * Home component containing the main page content
 */
function Home() {
  const contentSections = [
    {
      title: 'Master PandaCharts',
      description: "New to Gantt charts? We've got you covered. Our tutorial section includes:",
      items: [
        'Quick-start guides',
        'Video walkthroughs',
        'Best practice tips',
        'Feature deep-dives'
      ],
      buttonText: 'Explore Tutorials'
    },
    {
      title: 'Create Your Workspace',
      description: 'Transform your project management journey with a dedicated workspace for your team. Get started in minutes with:',
      items: [
        'Unlimited Gantt charts',
        'Team collaboration tools',
        'Real-time updates',
        'Custom project templates'
      ],
      buttonText: 'Create Workspace'
    },
    {
      title: 'Start Your Journey',
      description: 'Perfect for freelancers and individual project managers. Get immediate access to:',
      items: [
        'Personal dashboard',
        'Project tracking tools',
        'Export capabilities',
        'Priority support'
      ],
      buttonText: 'Join Today'
    }
  ];

  return (
    <div className="min-h-screen">
      <InteractiveBubbles />
      <Navigation />

      <div className="hero-section">
        <div className="hero-container">
          <div className="hero-grid">            
            <GanttChart />
            <HeroCard />
          </div>
        </div>
      </div>

      <div className="content-grid">
        {contentSections.map((section, index) => (
          <ContentSection key={index} section={section} />
        ))}
      </div>
    </div>
  );
}

/**
 * Main App component
 */
function App() {
  return (
    <Router basename="/PandaPort">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;