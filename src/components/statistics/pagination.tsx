"use client";
import React from "react";

const Pagination = ({
  pageNumber,
  setPageNumber,
  data,
  pageCapacity
}) => {
  const totalPages = Math.ceil(data.length / pageCapacity);
  const paginationRange = 2; // Number of pages around the current page

  const createPageRange = (start: number, end: number) => {
    let range: number[] = [];
    for (let i = start; i <= end; i++) {
      range.push(i);
    }
    return range;
  };

  const getPageNumbers = () => {
    if (totalPages <= 5) {
      // Less than 5 total pages so show all
      return createPageRange(1, totalPages);
    } else {
      // More than 5 total pages
      if (pageNumber < 4) {
        // Current page near the start
        return [...createPageRange(1, 3), '...', totalPages];
      } else if (pageNumber > totalPages - 3) {
        // Current page near the end
        return [1, '...', ...createPageRange(totalPages - 2, totalPages)];
      } else {
        // Current page somewhere in the middle
        return [1, '...', ...createPageRange(pageNumber - 1, pageNumber + 1), '...', totalPages];
      }
    }
  };

  const handlePrevious = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  const handleNext = () => {
    if (pageNumber < totalPages) {
      setPageNumber(pageNumber + 1);
    }
  };

  return (
    <div className="mbp_pagination text-center">
      <ul className="page_navigation">
        <li className="page-item">
          <span className="page-link pointer" onClick={handlePrevious}>
            <span className="fas fa-angle-left" />
          </span>
        </li>

        {getPageNumbers().map((page, index) => (
          <li key={index} className={`page-item ${pageNumber === page ? "active" : ""}`} onClick={() => typeof page === 'number' && setPageNumber(page)}>
            {page === '...' ? (
              <span className="page-link">...</span>
            ) : (
              <span className="page-link pointer">{page}</span>
            )}
          </li>
        ))}

        <li className="page-item">
          <span className="page-link pointer" onClick={handleNext}>
            <span className="fas fa-angle-right" />
          </span>
        </li>
      </ul>
      <p className="mt10 pagination_page_count text-center">
        {data.length} 개의 학교 중 {((pageNumber - 1) * pageCapacity) + 1}번부터 {Math.min(pageNumber * pageCapacity, data.length)}번 학교
      </p>
    </div>
  );
};

export default Pagination