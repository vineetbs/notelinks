import { Button } from "../components/Button";
import Card from "../components/Card";
import { CreateContent } from "../components/CreateContent";
import { AddIcon } from "../icons/AddIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { Sidebar } from "../components/Sidebar";
import { useEffect, useState } from "react";
import { Usecontent } from "../hooks/Usecontent";
import { ShareContent } from "../components/ShareContent";

export const Dashboard = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const { content, fetchBe } = Usecontent();
  const [filterContent, setfilterContent] = useState(content);
  useEffect(() => {
    setfilterContent(content);
  }, [content]);
  return (
    <div className="flex">
      <div className="sm:w-56 w-20 ">
        <Sidebar
          content={content}
          setfilterContent={setfilterContent}
          logged={true}
        />
      </div>

      <div className="flex flex-col flex-grow w-full">
        <CreateContent
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onContentAdd={fetchBe}
        />
        <ShareContent open={shareOpen} onClose={() => setShareOpen(false)} />

        {modalOpen || shareOpen ? (
          <div className="sticky top-0 w-full h-16 flex justify-end bg-slate-600 z-10 px-4"></div>
        ) : (
          <div className="sticky top-0 w-full h-16 flex justify-end [background-color:var(--color-secbg)] z-10 px-4">
            <Button
              variant="primary"
              title="Add "
              startIcon={<AddIcon />}
              onClick={() => setModalOpen(!modalOpen)}
            />
            <Button
              variant="secondary"
              title="Share"
              startIcon={<ShareIcon />}
              onClick={() => setShareOpen(!shareOpen)}
            />
          </div>
        )}

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
                  onContentDelete={fetchBe}
                  logged={true}
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
  );
};
