const ErrorAlert = ({ message }) => {
    if (!message) return null;
  
    return (
      <div role="alert" className="alert alert-info flex items-center bg-red-100 text-red-700 p-4 rounded relative">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6 mr-3">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <span>{message}</span>
      </div>
    );
  };
  export default ErrorAlert;
