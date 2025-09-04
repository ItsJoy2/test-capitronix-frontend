import Link from "next/link";

type Props = {
  total: number;
  perPage: number;
  currentPage: number;
  route: string;
};

const Pagination = ({ total, perPage, currentPage, route }: Props) => {
  const totalPages = Math.ceil(total / perPage);

  const createPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }

    return pages;
  };

  const pages = createPageNumbers();
  //   console.log(currentPage)

  return (
    <div className="flex justify-center mt-8">
      <div className="bg-white px-4 py-2 rounded-lg shadow flex items-center space-x-1">
        {/* Prev button */}
        <Link
          href={`${route}?page=${currentPage - 1}`}
          className={`w-8 h-8 flex items-center justify-center rounded-md ${
            currentPage === 1
              ? "text-gray-400 bg-gray-100 cursor-not-allowed"
              : "hover:bg-gray-200 text-gray-600"
          }`}
        >
          &lt;
        </Link>

        {/* Page numbers */}
        {pages.map((page, idx) => {
          if (page === "...") {
            return (
              <span
                key={`ellipsis-${idx}`}
                className="px-2 py-1 text-gray-500 text-sm"
              >
                ...
              </span>
            );
          }

          return (
            <Link
              key={page}
              href={`${route}?page=${page}`}
              className={`w-8 h-8 flex items-center justify-center rounded-md text-sm font-medium ${
                page === currentPage
                  ? "bg-cyan-800 text-white shadow"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
            >
              {page}
            </Link>
          );
        })}

        {/* Next button */}
        <Link
          href={`${route}?page=${currentPage + 1}`}
          className={`w-8 h-8 flex items-center justify-center rounded-md ${
            currentPage === totalPages
              ? "text-gray-400 bg-gray-100 cursor-not-allowed"
              : "hover:bg-gray-200 text-gray-600"
          }`}
        >
          &gt;
        </Link>
      </div>
    </div>
  );
};

export default Pagination;
