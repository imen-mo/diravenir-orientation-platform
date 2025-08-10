import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import cyprusImage from '../assets/chypre.jpg';
import Footer from '../components/Footer';
import './CountryPage.css';

const Cyprus = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const universities = [
    {
      name: "Cyprus International University",
      location: "Nicosia",
      ranking: "Top Private University",
      programs: ["Computer Science", "Engineering", "Business", "Medicine"],
      image: "https://via.placeholder.com/300x200/4F46E5/FFFFFF?text=CIU"
    },
    {
      name: "Final International University",
      location: "Kyrenia",
      ranking: "Leading Private University",
      programs: ["Arts", "Humanities", "Social Sciences", "Natural Sciences"],
      image: "https://via.placeholder.com/300x200/7C3AED/FFFFFF?text=FIU"
    },
    {
      name: "University of Cyprus",
      location: "Nicosia",
      ranking: "Top Public University",
      programs: ["Engineering", "Medicine", "Management", "Science"],
      image: "https://via.placeholder.com/300x200/059669/FFFFFF?text=UCY"
    }
  ];

  const programs = [
    {
      name: "Computer Science & Engineering",
      duration: "4 years",
      language: "English",
      cost: "€4,500/year",
      requirements: "High school diploma, English proficiency (IELTS 6.0)"
    },
    {
      name: "Business Administration",
      duration: "4 years",
      language: "English",
      cost: "€4,000/year",
      requirements: "High school diploma, English proficiency (IELTS 6.0)"
    },
    {
      name: "Mechanical Engineering",
      duration: "4 years",
      language: "English",
      cost: "€5,000/year",
      requirements: "High school diploma, Math & Science background"
    },
    {
      name: "Medicine",
      duration: "6 years",
      language: "English",
      cost: "€8,000/year",
      requirements: "High school diploma, Biology & Chemistry"
    }
  ];

  const workInfo = [
    {
      title: "Part-time Work",
      description: "Students can work up to 20 hours per week during semester",
      requirements: "Valid student visa, university approval",
      opportunities: "Teaching English, Tourism, Retail, Hospitality"
    },
    {
      title: "Internships",
      description: "Many universities offer internship programs with local and international companies",
      requirements: "Good academic standing, English language skills",
      opportunities: "Tech companies, Tourism industry, Financial services, Research institutes"
    },
    {
      title: "Post-graduation Work",
      description: "Graduates can apply for work permits in Cyprus",
      requirements: "Bachelor's degree, job offer, company sponsorship",
      opportunities: "Technology, Tourism, Finance, Education, Healthcare"
    }
  ];

  const schedule = [
    {
      period: "Fall Semester",
      months: "September - December",
      activities: "Core courses, Language support, Cultural orientation"
    },
    {
      period: "Winter Break",
      months: "December - January",
      activities: "Holiday break, Travel opportunities, Cultural events"
    },
    {
      period: "Spring Semester",
      months: "February - May",
      activities: "Specialized courses, Internships, Research projects"
    },
    {
      period: "Summer Break",
      months: "June - August",
      activities: "Summer programs, Internships, Travel, Preparation for next year"
    }
  ];

  return (
    <div className="country-page">
      {/* Hero Section with Background Image */}
      <div className="hero-section" style={{ backgroundImage: `url(${cyprusImage})` }}>
        <div className="hero-overlay">
          <div className="hero-content">
            <h1>Study in Cyprus</h1>
            <p>Experience Mediterranean charm with European education standards</p>
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-number">1.2M</span>
                <span className="stat-label">Population</span>
              </div>
              <div className="stat">
                <span className="stat-number">50+</span>
                <span className="stat-label">Universities</span>
              </div>
              <div className="stat">
                <span className="stat-number">25K+</span>
                <span className="stat-label">International Students</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="tab-navigation">
        <button 
          className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={`tab-btn ${activeTab === 'universities' ? 'active' : ''}`}
          onClick={() => setActiveTab('universities')}
        >
          Universities
        </button>
        <button 
          className={`tab-btn ${activeTab === 'programs' ? 'active' : ''}`}
          onClick={() => setActiveTab('programs')}
        >
          Programs
        </button>
        <button 
          className={`tab-btn ${activeTab === 'work' ? 'active' : ''}`}
          onClick={() => setActiveTab('work')}
        >
          Work & Internships
        </button>
        <button 
          className={`tab-btn ${activeTab === 'schedule' ? 'active' : ''}`}
          onClick={() => setActiveTab('schedule')}
        >
          Academic Schedule
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === 'overview' && (
          <div className="overview-section">
            <div className="overview-grid">
              <div className="overview-card">
                <h3>Why Study in Cyprus?</h3>
                <ul>
                  <li>European Union member with high education standards</li>
                  <li>Beautiful Mediterranean climate and lifestyle</li>
                  <li>Affordable tuition fees compared to other EU countries</li>
                  <li>English as the primary language of instruction</li>
                  <li>Safe and welcoming environment for international students</li>
                </ul>
              </div>
              <div className="overview-card">
                <h3>Cost of Living</h3>
                <div className="cost-item">
                  <span>Accommodation:</span>
                  <span>€300 - €600/month</span>
                </div>
                <div className="cost-item">
                  <span>Food:</span>
                  <span>€200 - €400/month</span>
                </div>
                <div className="cost-item">
                  <span>Transportation:</span>
                  <span>€50 - €100/month</span>
                </div>
                <div className="cost-item">
                  <span>Total:</span>
                  <span>€600 - €1,200/month</span>
                </div>
              </div>
              <div className="overview-card">
                <h3>Language Requirements</h3>
                <p>Most programs are taught entirely in English, making it ideal for international students:</p>
                <ul>
                  <li>No need to learn Greek (though it's beneficial)</li>
                  <li>IELTS 6.0 or equivalent required</li>
                  <li>English language support available</li>
                  <li>Multicultural environment</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'universities' && (
          <div className="universities-section">
            <h2>Top Universities in Cyprus</h2>
            <div className="universities-grid">
              {universities.map((uni, index) => (
                <div key={index} className="university-card">
                  <div className="university-image">
                    <img src={uni.image} alt={uni.name} />
                  </div>
                  <div className="university-info">
                    <h3>{uni.name}</h3>
                    <p className="university-location">{uni.location}</p>
                    <p className="university-ranking">{uni.ranking}</p>
                    <div className="university-programs">
                      <h4>Popular Programs:</h4>
                      <ul>
                        {uni.programs.map((program, idx) => (
                          <li key={idx}>{program}</li>
                        ))}
                      </ul>
                    </div>
                    <button className="apply-btn">Learn More</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'programs' && (
          <div className="programs-section">
            <h2>Available Programs</h2>
            <div className="programs-grid">
              {programs.map((program, index) => (
                <div key={index} className="program-card">
                  <h3>{program.name}</h3>
                  <div className="program-details">
                    <div className="detail-item">
                      <span className="label">Duration:</span>
                      <span className="value">{program.duration}</span>
                    </div>
                    <div className="detail-item">
                      <span className="label">Language:</span>
                      <span className="value">{program.language}</span>
                    </div>
                    <div className="detail-item">
                      <span className="label">Annual Cost:</span>
                      <span className="value">{program.cost}</span>
                    </div>
                    <div className="detail-item">
                      <span className="label">Requirements:</span>
                      <span className="value">{program.requirements}</span>
                    </div>
                  </div>
                  <button className="apply-btn">Apply Now</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'work' && (
          <div className="work-section">
            <h2>Work Opportunities & Internships</h2>
            <div className="work-grid">
              {workInfo.map((info, index) => (
                <div key={index} className="work-card">
                  <h3>{info.title}</h3>
                  <p className="work-description">{info.description}</p>
                  <div className="work-requirements">
                    <h4>Requirements:</h4>
                    <p>{info.requirements}</p>
                  </div>
                  <div className="work-opportunities">
                    <h4>Opportunities:</h4>
                    <p>{info.opportunities}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'schedule' && (
          <div className="schedule-section">
            <h2>Academic Calendar</h2>
            <div className="schedule-timeline">
              {schedule.map((period, index) => (
                <div key={index} className="timeline-item">
                  <div className="timeline-period">
                    <h3>{period.period}</h3>
                    <span className="timeline-months">{period.months}</span>
                  </div>
                  <div className="timeline-content">
                    <p>{period.activities}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Call to Action */}
      <div className="cta-section">
        <div className="cta-content">
          <h2>Ready to Start Your Journey in Cyprus?</h2>
          <p>Join thousands of international students already studying in Cyprus</p>
          <div className="cta-buttons">
            <button className="cta-btn primary">Apply Now</button>
            <button className="cta-btn secondary">Contact Advisor</button>
          </div>
        </div>
      </div>


    </div>
  );
};

export default Cyprus;
