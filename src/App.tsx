import { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";

/* Every route is code-split; the three.js stack loads only with the home hero. */
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Network = lazy(() => import("./pages/Network"));
const Services = lazy(() => import("./pages/Services"));
const CorporateHealth = lazy(() => import("./pages/CorporateHealth"));
const Consulting = lazy(() => import("./pages/Consulting"));
const MedicalTechnology = lazy(() => import("./pages/MedicalTechnology"));
const Partnerships = lazy(() => import("./pages/Partnerships"));
const HowWeWork = lazy(() => import("./pages/HowWeWork"));
const Resources = lazy(() => import("./pages/Resources"));
const Downloads = lazy(() => import("./pages/Downloads"));
const CaseStudies = lazy(() => import("./pages/CaseStudies"));
const Careers = lazy(() => import("./pages/Careers"));
const Contact = lazy(() => import("./pages/Contact"));
const Privacy = lazy(() => import("./pages/Privacy"));
const NotFound = lazy(() => import("./pages/NotFound"));

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/network" element={<Network />} />
        <Route path="/services" element={<Services />} />
        <Route path="/corporate-health" element={<CorporateHealth />} />
        <Route path="/consulting" element={<Consulting />} />
        <Route path="/medical-technology" element={<MedicalTechnology />} />
        <Route path="/partnerships" element={<Partnerships />} />
        <Route path="/how-we-work" element={<HowWeWork />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/downloads" element={<Downloads />} />
        <Route path="/case-studies" element={<CaseStudies />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
