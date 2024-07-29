'use client'

import DefaultHeader from "@/components/common/DefaultHeader";
import Footer from "@/components/common/default-footer";
import MobileMenu from "@/components/common/mobile-menu";
import { useRouter } from "next/navigation";
import PropertyAptFilteringList from "@/components/listing/list-view/list-v1/PropertyAptFilteringList";

import React from "react";

const ListV1 = () => {
    const router = useRouter();


    const navigateTo = (path: string) => {
        router.push(path);
    };
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
                                <h2 className="title">아파트 내놓아요</h2>
                                <div className="breadcumb-list">
                                    <div className="widget-wrapper mb20">
                                        <div className="btn-area d-grid align-items-center">
                                            <button
                                                className="ud-btn btn-thm custom-button"
                                                onClick={() => navigateTo("/sell-board/apt")}
                                            >
                                                <span className="flaticon-search align-text-top pr10" />
                                                아파트
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="breadcumb-list">
                                    <div className="widget-wrapper mb20">
                                        <div className="btn-area d-grid align-items-center">
                                            <button
                                                className="ud-btn btn-thm custom-button"
                                                onClick={() => navigateTo("/sell-board/office")}
                                            >
                                                <span className="flaticon-search align-text-top pr10" />
                                                오피스텔
                                            </button>
                                        </div>
                                    </div>
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
            <PropertyAptFilteringList />

            {/* Property Filtering */}

            {/* Start Our Footer */}
            <section className="footer-style1 pt60 pb-0">
                <Footer />
            </section>
            {/* End Our Footer */}
        </>
    );
};

export default ListV1;