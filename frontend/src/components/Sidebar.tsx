import { ReactElement } from "react";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { TwitterIcon } from "../icons/TwitterIcon";
import { Logo } from "../icons/Logo";

export const Sidebar = () => {
  return (
    <div className="bg-white h-screen top-0 left-0 fixed border w-58 border-slate-300">
      <div className="font-bold text-2xl p-4 flex">
        <div className="pr-2 items-center text-blue-800 ">{<Logo />}</div>
        Note App
      </div>
      <div className="pt-10 text-xl gap-3 ">
        <SidebarIcon text="Youtube" icon={<YoutubeIcon />} />
        <SidebarIcon text="Twitter" icon={<TwitterIcon />} />
      </div>
    </div>
  );
};

interface iconProp {
  text: string;
  icon: ReactElement;
}

export const SidebarIcon = ({ text, icon }: iconProp) => {
  return (
    <div className="flex p-2 hover:bg-gray-100 rounded-xl pl-4 transition-all duration-200">
      <div className="pl-2 pt-2 pr-1">{icon}</div>
      <div className="items-center justify-center pt-2">{text}</div>
    </div>
  );
};
