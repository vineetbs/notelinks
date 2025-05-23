import { useRef, useState } from "react";
import { CloseIcon } from "../icons/CloseIcon";
import { Button } from "./Button";
import { InputBox } from "./InputBox";
import axios from "axios";
import { BackendUrl } from "../config";

interface contentProp {
  open: boolean;
  onClose: () => void;
  onContentAdd: () => void;
}

enum contentType {
  YouTube = "youtube",
  Twitter = "twitter",
  Instagram = "instagram",
}

export const CreateContent = ({ open, onClose, onContentAdd }: contentProp) => {
  const [type, setType] = useState(contentType.YouTube);
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);

  const addContent = async () => {
    const title = titleRef.current?.value;
    const link = linkRef.current?.value;
    // console.log(localStorage.getItem("token"));

    await axios.post(
      BackendUrl + "/api/v1/content",
      {
        link,
        title,
        type,
      },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    onContentAdd();
    onClose();
  };
  return (
    <div>
      {open && (
        <div>
          <div className="w-screen h-screen top-0 right-0 bg-slate-700/80 fixed flex flex-row min-h-screen justify-center items-center">
            <div className="[background-color:var(--color-secbg)]  w-84 h-96 rounded-xl">
              <div className="flex justify-between">
                <div className="text-xl font-semibold p-4 ml-18">
                  Add Content
                </div>
                <div
                  className="pt-4 pr-2 cursor-pointer hover:bg-gray-300 rounded-xl "
                  onClick={onClose}
                >
                  <CloseIcon />
                </div>
              </div>
              <div className="pt-4">
                <InputBox placeholder="Title" reference={titleRef} />
                <InputBox placeholder="Link" reference={linkRef} />
              </div>

              <div className="font-semibold pt-6 flex items-center justify-center">
                Type
              </div>
              <div className="flex items-center justify-items-center  pb-6 pl-6 ">
                <Button
                  title="Youtube"
                  variant={
                    type === contentType.YouTube ? "primary" : "secondary"
                  }
                  onClick={() => setType(contentType.YouTube)}
                />
                <Button
                  title="Instagram"
                  variant={
                    type === contentType.Instagram ? "primary" : "secondary"
                  }
                  onClick={() => setType(contentType.Instagram)}
                />
                <Button
                  title="Twitter"
                  variant={
                    type === contentType.Twitter ? "primary" : "secondary"
                  }
                  onClick={() => setType(contentType.Twitter)}
                />
              </div>
              <div className="flex items-center justify-center pt-1 pb-2 ">
                <Button
                  variant="primary"
                  title="Add Content"
                  onClick={addContent}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
