import { ShareIcon } from "../icons/ShareIcon";

type Cardprops = {
  title: string;
  link: string;
  type: "youtube" | "twitter";
};

export default function Card({ title, link, type }: Cardprops) {
  return (
    <div className="bg-white text-black border  border-gray-300  rounded-md min-h-48 p-4 m-4 gap-2 max-w-md ">
      <div className="items-center justify-between flex ">
        <div className="text-gray-700 pr-4">
          <ShareIcon />
        </div>
        <div className="font-semibold text-xl pr-4">{title}</div>
        <div className="flex  gap-1.5 text-gray-600">
          <div className="pr-2">
            <a href={link} target="_blank">
              <ShareIcon />
            </a>
          </div>
          <ShareIcon />
        </div>
      </div>
      <div className="pt-10 items-center ">
        {type === "youtube" && (
          <iframe
            className="w-full "
            src={link.replace("watch", "embed").replace("?v=", "/")}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        )}

        {type === "twitter" && (
          <blockquote className="twitter-tweet ">
            <a href={link.replace("x.com", "twitter.com")}></a>
          </blockquote>
        )}
      </div>
    </div>
  );
}
