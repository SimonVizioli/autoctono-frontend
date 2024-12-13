const Header: React.FC = () => {
    return (
        <header className="sticky top-0 z-50 flex h-16 w-full items-center justify-between bg-white shadow-sm">
            <div className="flex items-center gap-x-4">
                <img
                    src="https://avatars.githubusercontent.com/u/101882283?v=4"
                    alt="logo"
                    className="h-8 w-8"
                />
                <h1 className="text-2xl font-bold">Autoctono</h1>
            </div>
            <div className="flex items-center gap-x-4">
                <a href="#" className="text-gray-500 hover:text-gray-700">
                    Home
                </a>
                <a href="#" className="text-gray-500 hover:text-gray-700">
                    About
                </a>
                <a href="#" className="text-gray-500 hover:text-gray-700">
                    Portfolio
                </a>
                <a href="#" className="text-gray-500 hover:text-gray-700">
                    Contact
                </a>
            </div>
        </header>
    );
};
export default Header;
