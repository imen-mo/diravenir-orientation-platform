import React from "react";
import { useNavigate } from 'react-router-dom';
import './About.css';
import orientationImage from '../assets/orientation.png';
import etudiantImage from '../assets/etudiant.png';
import meetingImage from '../assets/meeting.png';
import logo from '../assets/logo.png';
import fondatriceImage from '../assets/Fondatrice.png';
import meryemImage from '../assets/meryemderni.png';
import nadiaImage from '../assets/nadiaboukdir.png';
import raniaImage from '../assets/raniajamoudi.png';
import marouaneImage from '../assets/marouanezahid.png';
import abdellahImage from '../assets/abdellahlouadi.png';
import bouchraImage from '../assets/bouchyalyass.png';
import hamzaImage from '../assets/hamzaaomari.png';
import wiamImage from '../assets/wiamfarih.png';

import GlobalLayout from '../components/GlobalLayout';
import { useTheme } from '../contexts/ThemeContext';

const About = () => {
  const navigate = useNavigate();
  const { getText } = useTheme();

  return (
      <GlobalLayout activePage="about">
        <div className="about-page-modern">

          {/* Main Content - Images à gauche, Textes à droite */}
          <div className="main-content-modern">
            {/* Left Side - Text Content */}
            <div className="content-left-modern">
              <div className="section-title-modern">{getText('aboutUs')}</div>
              <h1 className="main-title-modern">
                {getText('platformForNext')}<br />
                {getText('futureMakers')}<br />
                {getText('makers')}
              </h1>
              <p className="subtitle-modern">
                {getText('transformingEducation')}
              </p>
            </div>

            {/* Right Side - Three Static Images */}
            <div className="content-right-modern">
              <div className="fixed-images-container">
                <div className="fixed-image meeting-image">
                  <img src={meetingImage} alt="Collaboration & Innovation" />
                </div>
                <div className="fixed-image etudiant-image">
                  <img src={etudiantImage} alt="Étudiant" />
                </div>
                <div className="fixed-image orientation-image">
                  <img src={orientationImage} alt="Professional Guidance" />
                </div>
              </div>
            </div>
          </div>

          {/* Our Story Section - Background blanc, image ronde et petite */}
          <section className="our-story-section">
            <div className="story-container">
              <div className="story-content">
                <div className="story-content-inner">
                  <h2 className="story-subtitle">{getText('ourStory')}</h2>
                  <h3 className="story-title">{getText('innovateNewWays')}</h3>
                  <p className="story-text">
                    {getText('ourStoryText1')}
                    <br /><br />
                    {getText('ourStoryText2')}
                    <br /><br />
                    {getText('ourStoryText3')}
                  </p>
                  <div className="story-decoration">
                    <div className="decoration-dot"></div>
                    <div className="decoration-line"></div>
                  </div>
                </div>
              </div>
              <div className="story-image">
                <img src={fondatriceImage} alt="Fondatrice" className="founder-image" />
                {/* Motif de chevrons pointant vers le haut */}
                <div className="chevrons-pattern-left">
                  <div className="chevron">&lt;</div>
                  <div className="chevron">&lt;</div>
                  <div className="chevron">&lt;</div>
                  <div className="chevron">&lt;</div>
                  <div className="chevron">&lt;</div>
                </div>
                {/* Motif de plus à gauche de l'image fondatrice */}
                <div className="plus-pattern-left">
                  <div className="plus">+</div>
                  <div className="plus">+</div>
                  <div className="plus">+</div>
                  <div className="plus">+</div>
                </div>
                {/* 4 plus supplémentaires à côté */}
                <div className="plus-pattern-additional">
                  <div className="plus">+</div>
                  <div className="plus">+</div>
                  <div className="plus">+</div>
                  <div className="plus">+</div>
                </div>
              </div>
            </div>
          </section>

          {/* Mission & Vision Section */}
          <section className="mission-vision-section">
            <div className="mission-vision-container">
              <div className="mission-box">
                <div className="mission-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#FDCB00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <div className="mission-content">
                  <h2 className="section-title">{getText('ourMission')} <span className="highlight">{getText('mission')}</span></h2>
                  <p className="section-text">
                    {getText('missionText')}
                  </p>
                </div>
              </div>

              <div className="vision-box">
                <div className="vision-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#FDCB00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <circle cx="12" cy="12" r="4"></circle>
                    <line x1="4.93" y1="4.93" x2="9.17" y2="9.17"></line>
                    <line x1="14.83" y1="14.83" x2="19.07" y2="19.07"></line>
                    <line x1="14.83" y1="9.17" x2="19.07" y2="4.93"></line>
                    <line x1="4.93" y1="19.07" x2="9.17" y2="14.83"></line>
                  </svg>
                </div>
                <div className="vision-content">
                  <h2 className="section-title">{getText('ourVision')} <span className="highlight">{getText('vision')}</span></h2>
                  <p className="section-text">
                    {getText('visionText')}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Our Values Section */}
          <section className="values-section">
            <div className="container">
              <h2 className="values-title">
                <span className="values-our">{getText('ourValues')}</span> <span className="values-values">{getText('values')}</span>
              </h2>

              <div className="values-grid">
                {/* Honesty Card */}
                <div className="value-card">
                  <div className="value-icon-wrapper">
                    <svg className="value-icon" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"></path>
                      <path d="M9 12l2 2 4-4"></path>
                    </svg>
                  </div>
                  <h3 className="value-card-title">{getText('honesty')}</h3>
                  <p className="value-card-text">
                    {getText('honestyText')}
                  </p>
                </div>

                {/* Students Focus Card */}
                <div className="value-card">
                  <div className="value-icon-wrapper">
                    <svg className="value-icon" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                      <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                    </svg>
                  </div>
                  <h3 className="value-card-title">{getText('studentsFocus')}</h3>
                  <p className="value-card-text">
                    {getText('studentsFocusText')}
                  </p>
                </div>

                {/* Growth Oriented Card */}
                <div className="value-card">
                  <div className="value-icon-wrapper">
                    <svg className="value-icon" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 3v18h18"></path>
                      <path d="m9 12 2 2 4-4"></path>
                      <path d="M18 9v3a2 2 0 0 1-2 2h-2"></path>
                    </svg>
                  </div>
                  <h3 className="value-card-title">{getText('growthOriented')}</h3>
                  <p className="value-card-text">
                    {getText('growthOrientedText')}
                  </p>
                </div>

                {/* Believe Card */}
                <div className="value-card">
                  <div className="value-icon-wrapper">
                    <svg className="value-icon" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                  </div>
                  <h3 className="value-card-title">{getText('believe')}</h3>
                  <p className="value-card-text">
                    {getText('believeText')}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Our Team Section */}
          <section className="team-section">
            <div className="container">
              <h2 className="team-title">
                <span className="team-our">{getText('ourTeam')}</span> <span className="team-team">{getText('team')}</span>
              </h2>

              {/* All Team Members in one horizontal scrollable row */}
              <div className="team-members-row">
                <div className="team-members-scroll">
                  {/* Meryem Derni - Co Founder */}
                  <div className="team-member">
                    <div className="team-image-container">
                      <img src={meryemImage} alt="Meryem Derni" className="team-image" />
                    </div>
                    <h3 className="team-member-name">Meryem Derni</h3>
                    <p className="team-member-role">{getText('coFounder')}</p>
                  </div>

                  {/* Nadia Boukdir - Co Founder */}
                  <div className="team-member">
                    <div className="team-image-container">
                      <img src={nadiaImage} alt="Nadia Boukdir" className="team-image" />
                    </div>
                    <h3 className="team-member-name">Nadia Boukdir</h3>
                    <p className="team-member-role">{getText('coFounder')}</p>
                  </div>

                  {/* Abdellah Louadi */}
                  <div className="team-member">
                    <div className="team-image-container">
                      <img src={abdellahImage} alt="Abdellah Louadi" className="team-image" />
                    </div>
                    <h3 className="team-member-name">Abdellah Louadi</h3>
                    <p className="team-member-role">{getText('educationalConsultant')}</p>
                  </div>

                  {/* Hamza Aomari */}
                  <div className="team-member">
                    <div className="team-image-container">
                      <img src={hamzaImage} alt="Hamza Aomari" className="team-image" />
                    </div>
                    <h3 className="team-member-name">Hamza Aomari</h3>
                    <p className="team-member-role">{getText('educationalConsultant')}</p>
                  </div>

                  {/* Wiam Farih */}
                  <div className="team-member">
                    <div className="team-image-container">
                      <img src={wiamImage} alt="Wiam Farih" className="team-image" />
                    </div>
                    <h3 className="team-member-name">Wiam Farih</h3>
                    <p className="team-member-role">{getText('educationalConsultant')}</p>
                  </div>

                  {/* Marouane Zahid */}
                  <div className="team-member">
                    <div className="team-image-container">
                      <img src={marouaneImage} alt="Marouane Zahid" className="team-image" />
                    </div>
                    <h3 className="team-member-name">Marouane Zahid</h3>
                    <p className="team-member-role">{getText('educationalConsultant')}</p>
                  </div>

                  {/* Rania Jamoudi */}
                  <div className="team-member">
                    <div className="team-image-container">
                      <img src={raniaImage} alt="Rania Jamoudi" className="team-image" />
                    </div>
                    <h3 className="team-member-name">Rania Jamoudi</h3>
                    <p className="team-member-role">{getText('admissionCoordinator')}</p>
                  </div>

                  {/* Bouchra Lyass */}
                  <div className="team-member">
                    <div className="team-image-container">
                      <img src={bouchraImage} alt="Bouchra Lyass" className="team-image" />
                    </div>
                    <h3 className="team-member-name">Bouchra Lyass</h3>
                    <p className="team-member-role">{getText('marketingCoordinator')}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>


        </div>
      </GlobalLayout>
  );
};

export default About;