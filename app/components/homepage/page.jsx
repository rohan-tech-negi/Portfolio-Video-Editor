import React from 'react'
// import LandingSection from '../../app/sections/page'

import ToolBox from '../herosection/ToolBox'
import ContactSection from '../herosection/Connect'

import ProjectsSection1 from '../herosection/ProjectShowCase2'
import Home from '../sections/Hero2'

import ScrollProgressBar from '../transition/ScollBar'
// import Contact from '../sections/Contact'
// import Projects from '../sections/Projects'
// import LandingSection from '../landingsection/page'

const HomePage = () => {
  return (
    <>
        {/* <LandingSection></LandingSection> */}
        {/* <LandingSection></LandingSection> */}
        {/* <Hero></Hero> */}
        <ScrollProgressBar></ScrollProgressBar>
        <Home></Home>
        {/* <ProjectsSection></ProjectsSection> */}
        <ProjectsSection1></ProjectsSection1>
        <ToolBox></ToolBox>
        <ContactSection></ContactSection>
        {/* <AboutSection></AboutSection> */}
        {/* <ContactReport></ContactReport> */}
        
        
    </>
  )
}

export default HomePage