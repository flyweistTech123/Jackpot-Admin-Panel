import React from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

const Pagination = ({
    currentPage,
    totalPages,
    onPageChange,
    hasPrevPage,
    hasNextPage,
}) => {
    if (totalPages <= 1) return null;

    const getPageNumbers = () => {
        const pages = [];

        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 3) {
                pages.push(1, 2, 3, 4, "...", totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
            } else {
                pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
            }
        }

        return pages;
    };

    const handlePrev = () => {
        if (hasPrevPage) onPageChange(currentPage - 1);
    };

    const handleNext = () => {
        if (hasNextPage) onPageChange(currentPage + 1);
    };

    const pages = getPageNumbers();

    return (
        <div className="flex flex-wrap items-center justify-end gap-2 mt-2 mb-5">
            <button
                onClick={handlePrev}
                disabled={!hasPrevPage}
                className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition ${hasPrevPage
                        ? "bg-primary text-white hover:bg-primary/90 cursor-pointer"
                        : "bg-gray-200 text-gray-500 cursor-not-allowed"
                    }`}
            >
                <IoChevronBack /> Prev
            </button>

            <div className="flex flex-wrap items-center gap-1">
                {pages.map((page, index) =>
                    page === "..." ? (
                        <span
                            key={`ellipsis-${index}`}
                            className="px-4 py-2 rounded-md text-sm font-medium text-gray-500"
                        >
                            ...
                        </span>
                    ) : (
                        <button
                            key={page}
                            onClick={() => onPageChange(page)}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition border ${currentPage === page
                                    ? "bg-primary text-white border-primary"
                                    : "bg-white text-gray-700 border-gray-300 hover:bg-primary/10"
                                }`}
                        >
                            {page}
                        </button>
                    )
                )}
            </div>

            <button
                onClick={handleNext}
                disabled={!hasNextPage}
                className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition ${hasNextPage
                        ? "bg-primary text-white hover:bg-primary/90 cursor-pointer"
                        : "bg-gray-200 text-gray-500 cursor-not-allowed"
                    }`}
            >
                Next <IoChevronForward />
            </button>
        </div>
    );
};

export default Pagination;
