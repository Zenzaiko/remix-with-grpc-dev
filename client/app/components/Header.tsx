import { Link } from "@remix-run/react";

export default function Header() {
  return (
    <header className="bg-gray-800 text-white p-4">
      <h1 className="text-2xl">掲示板サイト</h1>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="hover:underline">
              ホーム
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
