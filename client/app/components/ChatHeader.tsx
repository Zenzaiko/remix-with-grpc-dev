import { Link } from "@remix-run/react";
import type { MouseEventHandler } from "react";
import { ButtonIcon } from "./ui/ButtonIcon";
import { PanelLeft, LayoutGrid } from "lucide-react";

type Props = {
  handleSideBarOpen: MouseEventHandler<HTMLButtonElement>;
};

export default function ChatHeader(props: Props) {
  return (
    <header className="p-2">
      <nav>
        <ul className="flex space-x-4 items-center">
          <ButtonIcon className="border-none" onClick={props.handleSideBarOpen}>
            <PanelLeft className="h-4 w-4" />
          </ButtonIcon>
          <Link to="/chat/" unstable_viewTransition>
            <ButtonIcon className="border-none">
              <LayoutGrid className="h-4 w-4" />
            </ButtonIcon>
          </Link>
        </ul>
      </nav>
    </header>
  );
}
