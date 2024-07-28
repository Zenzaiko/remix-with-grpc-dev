import { Link } from "@remix-run/react";
import type { MouseEventHandler } from "react";
import { ButtonIcon } from "./ui/ButtonIcon";
import { PanelLeft } from "lucide-react";

type Props = {
  handleSideBarOpen: MouseEventHandler<HTMLButtonElement>;
};

export default function ChatHeader(props: Props) {
  return (
    <header className="p-2">
      <nav>
        <ul className="flex space-x-4">
          <ButtonIcon className="border-none" onClick={props.handleSideBarOpen}>
            <PanelLeft className="h-4 w-4" />
          </ButtonIcon>
          {/* <li> */}
          {/*   <Link to="/chat" className="hover:underline"> */}
          {/*     ホーム */}
          {/*   </Link> */}
          {/* </li> */}
        </ul>
      </nav>
    </header>
  );
}
