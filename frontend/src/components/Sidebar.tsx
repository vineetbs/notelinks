import { ReactElement } from "react";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { TwitterIcon } from "../icons/TwitterIcon";
import { Instagram } from "lucide-react";
import { Logo } from "../icons/Logo";
import { UserBar } from "./UserBar";
import { Folders } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Sidebar = ({ setfilterContent, content, logged }: any) => {
  const navigate = useNavigate();
  const filterAll = () => {
    const updatedContent = content;
    setfilterContent(updatedContent);
  };
  const filterYt = () => {
    const updatedContent = content.filter(
      (content: any) => content.type === "youtube"
    );
    setfilterContent(updatedContent);
  };
  const filterTwt = () => {
    const updatedContent = content.filter(
      (content: any) => content.type === "twitter"
    );
    setfilterContent(updatedContent);
  };
  const filterIg = () => {
    const updatedContent = content.filter(
      (content: any) => content.type === "instagram"
    );
    setfilterContent(updatedContent);
  };
  return (
    <div className="[background-color:var(--color-secbg)] h-screen top-0 left-0 fixed border  border-slate-300 justify-between flex flex-col">
      <div>
        <div
          className="font-bold text-2xl p-4 flex"
          onClick={() => navigate("/")}
        >
          <div className="pr-2 items-center text-blue-800  ">{<Logo />}</div>
          <div className="hidden sm:block">NoteLink</div>
        </div>

        <div className="pt-10 text-xl gap-3 ">
          <div onClick={filterAll}>
            <SidebarIcon text="All Links" icon={<Folders />} />
          </div>
          <div onClick={filterYt}>
            <SidebarIcon text="Youtube" icon={<YoutubeIcon />} />
          </div>
          <div onClick={filterIg}>
            <SidebarIcon text="Instagram" icon={<Instagram />} />
          </div>
          <div onClick={filterTwt}>
            <SidebarIcon text="Twitter" icon={<TwitterIcon />} />
          </div>
        </div>
      </div>
      <div className="mb-4">{logged && <UserBar name={"user"} />}</div>
    </div>
  );
};

interface iconProp {
  text: string;
  icon: ReactElement;
}

export const SidebarIcon = ({ text, icon }: iconProp) => {
  return (
    <div className="flex p-2 hover:bg-gray-300  pl-4 transition-all duration-200">
      <div className="pl-2 pt-2 pr-1">{icon}</div>
      <div className="items-center justify-center pt-2 hidden sm:block">
        {text}
      </div>
    </div>
  );
};
