import { Link } from "react-router";

function NotFound() {
  return (
    <div className="flex min-h-screen items-center px-4 py-12 sm:px-6 md:px-8 lg:px-12 xl:px-16">
      <div className="w-full space-y-6 text-center">
        <div className="space-y-3">
          <h1 className="text-foreground animate-bounce text-4xl font-bold tracking-tighter sm:text-5xl">
            404
          </h1>
          <p className="text-gray-500">
            Looks like you've ventured into the unknown digital realm.
          </p>
        </div>
        <Link
          to="/"
          className="bg-foreground inline-flex h-10 items-center rounded-md px-8 text-sm font-medium text-gray-50 shadow transition-colors"
        >
          Return to website
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
