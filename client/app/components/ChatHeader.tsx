import { Link } from "@remix-run/react";
import { ButtonIcon } from "./ui/ButtonIcon";
import { PanelLeft, LayoutGrid } from "lucide-react";

type Props = {
  handleSideBarOpen: (isOpen: boolean) => void;
  isSideBarIconShow: boolean;
};

export default function ChatHeader(props: Props) {
  return (
    <header className="p-2">
      <nav>
        <ul className="flex space-x-4 items-center">
          {props.isSideBarIconShow && (
            <ButtonIcon
              className="border-none"
              onClick={() => props.handleSideBarOpen(true)}
            >
              <PanelLeft className="h-4 w-4" />
            </ButtonIcon>
          )}
          <Link
            to="/chat/"
            unstable_viewTransition
            onClick={() => props.handleSideBarOpen(false)}
          >
            <ButtonIcon className="border-none">
              <LayoutGrid className="h-4 w-4" />
            </ButtonIcon>
          </Link>
        </ul>
      </nav>
    </header>
  );
}
