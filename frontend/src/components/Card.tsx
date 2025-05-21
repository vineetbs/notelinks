import axios from "axios";
import { Trash2 } from "lucide-react";
import { SquareArrowOutUpRight } from "lucide-react";
import { BackendUrl } from "../config";
import { useEffect, useRef } from "react";

type Cardprops = {
  title: string;
  link: string;
  type: "youtube" | "twitter" | "instagram";
  id: string;
  onContentDelete?: () => void;
  logged: boolean;
};

export default function Card({
  title,
  link,
  type,
  id,
  onContentDelete,
  logged,
}: Cardprops) {
  const deleteContent = async () => {
    if (window.confirm("Do you want to delete this link?")) {
      try {
        await axios.delete(BackendUrl + "/api/v1/content", {
          headers: { authorization: localStorage.getItem("token") },
          data: { contentId: id },
        });
        if (onContentDelete) {
          onContentDelete();
        }

        window.alert("Link deleted successfully");
      } catch (error) {
        console.log(error);
      }
    } else {
      window.alert("Link not deleted");
    }
  };

  const extractYtUrl = (link: string) => {
    const regex =
      /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/;
    const match = link.match(regex);
    return match ? match[1] : null;
  };
  const ytVideoId = extractYtUrl(link);
  const ytUrl = `https://www.youtube.com/embed/${ytVideoId}`;

  const extractTwtUrl = (link: string) => {
    const regex = /(?:twitter\.com|x\.com)\/[^/]+\/status\/(\d+)/;
    const match = link.match(regex);
    return match ? match[1] : null;
  };
  const twtId = extractTwtUrl(link);

  const tweetRef = useRef<HTMLDivElement>(null);
  //twt widget
  useEffect(() => {
    if (type === "twitter" && tweetRef.current) {
      tweetRef.current.innerHTML = "";
      const loadAndRender = () => {
        (window as any).twttr.widgets.createTweet(twtId, tweetRef.current);
      };
      if (!(window as any).twttr) {
        const s = document.createElement("script");
        s.src = "https://platform.twitter.com/widgets.js";
        s.async = true;
        s.onload = loadAndRender;
        document.body.appendChild(s);
      } else {
        loadAndRender();
      }
    }
  }, [type, twtId]);

  const extractInstaId = (link: string) => {
    const regex =
      /(?:instagram\.com|www\.instagram\.com)\/(reel|p)\/([^/?#&]+)/;
    const match = link.match(regex);
    return match ? match[2] : null;
  };
  const instaRef = useRef<HTMLDivElement>(null);
  const instaId = extractInstaId(link);

  useEffect(() => {
    if (type === "instagram" && instaRef.current && instaId) {
      instaRef.current.innerHTML = `
      <blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/p/${instaId}/" data-instgrm-version="14"></blockquote>
    `;

      const loadAndRender = () => {
        (window as any).instgrm.Embeds.process();
      };

      if (!(window as any).instgrm) {
        const script = document.createElement("script");
        script.src = "https://www.instagram.com/embed.js";
        script.async = true;
        script.onload = loadAndRender;
        document.body.appendChild(script);
      } else {
        loadAndRender();
      }
    }
  }, [type, instaId]);

  return (
    <div className="[background-color:var(--color-terfg)] text-black border  border-gray-300  rounded-md min-h-48 p-4 m-4 gap-2 max-w-md ">
      <div className="">
        <div className="items-center justify-between flex w-full h-20 ">
          <div className="text-gray-700 pr-4">
            <a href={link} target="_blank">
              <SquareArrowOutUpRight />
            </a>
          </div>
          <div className="font-semibold text-xl pr-4">{title}</div>
          {logged && (
            <div className="flex  gap-1.5 text-gray-600">
              <div className="pr-2"></div>
              <div onClick={() => deleteContent()}>
                <Trash2 />
              </div>
            </div>
          )}
        </div>
        <div className="pt-10 items-center ">
          {type === "youtube" && (
            <iframe
              className="w-full "
              src={ytUrl}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          )}

          {type === "twitter" && (
            <div
              ref={tweetRef}
              className="flex justify-center items-center overflow-hidden w-full "
            />
          )}
          {type === "instagram" && (
            <div
              ref={instaRef}
              className="flex justify-center items-center overflow-hidden max-h-[240px] w-full "
            />
          )}
        </div>
      </div>
    </div>
  );
}
