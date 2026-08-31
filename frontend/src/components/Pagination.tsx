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
        <div>
            <button
                disabled={page === 1}
                onClick={onPrevious}
            >
                Previous
            </button>

            <span>
                Page {page} of {totalPages}
            </span>

            <button
                disabled={page >= totalPages}
                onClick={onNext}
            >
                Next
            </button>
        </div>
    );
}

export default Pagination;