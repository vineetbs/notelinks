import axios from "axios";
import { useEffect, useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { BackendUrl } from "../config";

import Card from "../components/Card";

export const SharePage = () => {
  const [content, setContent] = useState<any[]>([]);

  const [user, setUser] = useState("");
  const queryParameters = new URLSearchParams(window.location.search);
  const id = queryParameters.get("id");
  const [filterContent, setfilterContent] = useState<any[]>([]);

  useEffect(() => {
    setfilterContent(content);
  }, [content]);

  const fetchShare = async () => {
    const response = await axios.get<any>(`${BackendUrl}/api/v1/note/${id}`);

    setContent(response.data.content);
    setUser(response.data.username);
  };
  useEffect(() => {
    fetchShare();
  }, []);
  return (
    <div>
      <div className="flex">
        <div className="sm:w-56 w-20 ">
          <Sidebar
            content={content}
            setfilterContent={setfilterContent}
            logged={false}
          />
        </div>

        <div className="flex flex-col flex-grow w-full">
          <div className="sticky top-0 w-full h-16 flex justify-center z-10 px-4 pt-4 text-[36px] font-semibold  [background-color:var(--color-secbg)] ">
            {`${user}'s Links`}
          </div>

          <div className="pt-8">
            {filterContent.length > 0 ? (
              <div className="grid md:grid-cols-3 grid-cols-1 sm:grid-cols-2 overflow-y-auto">
                {filterContent.map(({ type, title, link, _id }) => (
                  <Card
                    title={title}
                    type={type}
                    link={link}
                    id={_id}
                    key={_id}
                    logged={false}
                  />
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="bg-white p-4">No links available</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
