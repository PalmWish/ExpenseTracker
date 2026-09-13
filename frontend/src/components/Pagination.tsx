import "../styles/pagination.css"

type Props = {
    page: number;
    totalPages: number;
    onPrevious: () => void;
    onNext: () => void;
};

function Pagination({
    page,
    totalPages,
    onPrevious,
    onNext
}: Props) {
    return (
        <div className="pagination">
            <button
                className="page-button"
                disabled={page === 1}
                onClick={onPrevious}
            >
                Previous
            </button>

            <span className="page-info">
                Page {page} of {totalPages}
            </span>

            <button
                className="page-button"
                disabled={page >= totalPages}
                onClick={onNext}
            >
                Next
            </button>
        </div>
    );
}

export default Pagination;