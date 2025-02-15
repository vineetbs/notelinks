import { Button } from "../components/Button";
import Card from "../components/Card";
import { CreateContent } from "../components/CreateContent";
import { AddIcon } from "../icons/AddIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { Sidebar } from "../components/Sidebar";
import { useState } from "react";
import { Usecontent } from "../hooks/Usecontent";

export const Dashboard = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const contents = Usecontent();
  return (
    <div>
      <Sidebar />
      <div className="pr-4 relative ml-58 ">
        <CreateContent open={modalOpen} onClose={() => setModalOpen(false)} />

        <div className="flex justify-end  ">
          <Button
            variant="primary"
            title="Add "
            startIcon={<AddIcon />}
            onClick={() => setModalOpen(true)}
          />
          <Button variant="secondary" title="Share" startIcon={<ShareIcon />} />
        </div>

        <div className="grid grid-cols-3">
          {contents.map(({ type, title, link }) => (
            <Card title={title} type={type} link={link} />
          ))}
        </div>
      </div>
    </div>
  );
};
