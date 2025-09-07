const UnauthorizedPage = () => {
    return (
        <div className="h-screen flex flex-col justify-center items-center text-center bg-mine-shaft-900 text-white">
            <h1 className="text-6xl font-bold text-bright-sun-400">403</h1>
            <h2 className="text-2xl mt-4">Access Denied</h2>
            <p className="text-mine-shaft-300 mt-2">You do not have permission to view this page.</p>
        </div>
    );
};

export default UnauthorizedPage;
