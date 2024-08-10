import DefaultHeader from "@/components/common/DefaultHeader";
import Footer from "@/components/common/default-footer";
import MobileMenu from "@/components/common/mobile-menu";
import ProperteyFiltering from "@/components/listing/grid-view/sell-board/ProperteyFiltering";
import React from "react";
export const metadata = {
    title: "Grid Full 3 Column || Homez - Real Estate NextJS Template",
};

const GridFull3Col = () => {
    return (
        <>
            {/* Main Header Nav */}
            <DefaultHeader />
            {/* End Main Header Nav */}

            {/* Mobile Nav */}
            <MobileMenu />
            {/* End Mobile Nav */}

            {/* Breadcumb Sections */}
            <section className="breadcumb-section bgc-f7">
                <div className="container d-flex justify-content-between align-items-center">
                    <div className="breadcumb-style1">
                        <h2 className="title">방 내놓아요</h2>
                        <div className="breadcumb-list">
                            <p className="text">간편하게 방 내놓기</p>
                        </div>
                    </div>
                    <a href="/sell-board-add" className="ud-btn btn-thm">
                        글 작성하기
                        <i className="fal fa-pencil-alt" />
                    </a>
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