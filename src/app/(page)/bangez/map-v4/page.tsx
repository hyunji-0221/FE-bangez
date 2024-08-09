import DefaultHeader from "@/components/common/DefaultHeader";

import MobileMenu from "@/components/common/mobile-menu";

import Blog from "@/components/common/Blog";

import CallToActions from "@/components/common/CallToActions";

// import Footer from "@/components/common/default-footer";

// import Footer from "@/components/home/home-v4/footer";
import Footer from "@/components/common/default-footer";

import PropertyFilteringMapFive from "@/components/listing/map-style/map-v4/PropertyFilteringMapFive";

import React from "react";
import Header from "@/components/home/home-v2/Header";
import LoginRegiHeader from "@/components/login_register/LoginRegiHeader";

export const metadata = {
  title: "Map V4 || Homez - Real Estate NextJS Template",
};

const MapV4 = () => {
  return (
    <>
      {/* Main Header Nav */}
      <DefaultHeader />
      {/* <Header /> */}
      {/* End Main Header Nav */}

      {/* Mobile Nav  */}
      <MobileMenu />
      {/* End Mobile Nav  */}
      <PropertyFilteringMapFive/>
      {/* Property Filtering */}

      
      <section className="mb75 mb0-md pb30-md">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 m-auto" data-aos="fade-up">              
            </div>
          </div>
          <div className="row" data-aos="fade-up" data-aos-delay="300">
            {/* <Blog /> */}
          </div>
        </div>
      </section>
     

      {/* Our CTA */}
      <section className="our-cta p-0">
        <CallToActions />
      </section>
      {/* Our CTA */}

      {/* Start Our Footer */}
      <section className="footer-style1 at-home4 pt60 pb-0">
        <Footer />
      </section>
      {/* End Our Footer */}
    </>
  );
};

export default MapV4;
