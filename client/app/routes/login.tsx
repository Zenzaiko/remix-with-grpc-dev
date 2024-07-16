import { Link } from "@remix-run/react";

export default function Login() {
  return (
    <div className="absolute inset-0 top-16 flex flex-col gap-4 justify-center items-center">
      <div>
        <h1 className="text-4xl animate-focus-in-contract">
          Tell me your name
        </h1>
      </div>
      <div>
        <input
          type="text"
          id="name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
          placeholder="My name is..."
        />
      </div>
      <div className="animate-fade-in">
        <Link to={"/"}>
          <div className="bg-gray-800 hover:bg-gray-700 text-white rounded px-4 py-2">
            Go to home
          </div>
        </Link>
      </div>
    </div>
  );
}
