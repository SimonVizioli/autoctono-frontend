import { SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { isRouteErrorResponse, Link, useRouteError } from "react-router-dom";

const ErrorPage: React.FC = () => {
    const error = useRouteError();
    console.error(error);

    if (isRouteErrorResponse(error)) {
        return (
            <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
                <div className="mt-10 flex items-center justify-center gap-x-6">
                    <SearchX size={250} strokeWidth={0.75} />
                    <div dir="ltr" className="border-s-4 border-teal-500 px-4">
                        <h1 className="text-base font-semibold text-teal-600">
                            Oops!
                        </h1>
                        <h2 className="text-base font-semibold text-teal-600">
                            {error.status}
                        </h2>
                        <p className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                            {error.statusText}
                        </p>
                        {error.data && (
                            <p className="text-3xl font-semibold">
                                {error.data}
                            </p>
                        )}
                    </div>
                </div>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                    <Button>
                        <Link to={""}> Go back home</Link>
                    </Button>
                </div>
            </main>
        );
    } else {
        return (
            <div className="max-w-lg mx-auto my-24 rounded-xl flex justify-center flex-row items-center">
                Oops
            </div>
        );
    }
};

export default ErrorPage;
