export default function LoadingSpinner() {
    return (
      <div className="flex justify-center items-center min-h-[80vh]">
        <div className="spinner animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }