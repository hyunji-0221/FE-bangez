import DefaultHeader from "@/components/common/DefaultHeader";

import Footer from "@/components/common/default-footer";
import MobileMenu from "@/components/common/mobile-menu";

import ProperteyFiltering from "@/components/listing/grid-view/sell-board/ProperteyFiltering";

import React from "react";

export const metadata = {
    title: "Gird Full 3 Column || Homez - Real Estate NextJS Template",
};

const GridFull3Col = () => {
    return (
        <>
            {/* Main Header Nav */}
            <DefaultHeader />
            {/* End Main Header Nav */}

            {/* Mobile Nav  */}
            <MobileMenu />
            {/* End Mobile Nav  */}

            {/* Breadcumb Sections */}
            <section className="breadcumb-section bgc-f7">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="breadcumb-style1">
                                <h2 className="title">방 내놓아요</h2>
                                <div className="breadcumb-list">
                                    <p className="text">간편하게 방 내놓기</p>
                                </div>
                                <a
                                    className="filter-btn-left mobile-filter-btn d-block d-lg-none"
                                    data-bs-toggle="offcanvas"
                                    href="#listingSidebarFilter"
                                    role="button"
                                    aria-controls="listingSidebarFilter"
                                >
                                    <span className="flaticon-settings" /> Filter
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* End Breadcumb Sections */}

            {/* Property Filtering */}
            <ProperteyFiltering />
            {/* Property Filtering */}

            {/* Start Our Footer */}
            <section className="footer-style1 pt60 pb-0">
                <Footer />
            </section>
            {/* End Our Footer */}
        </>
    );
};

export default GridFull3Col;
