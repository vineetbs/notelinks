import { useRef, useState } from "react";
import { CloseIcon } from "../icons/CloseIcon";
import { Button } from "./Button";
import { InputBox } from "./InputBox";
import axios from "axios";
import { BackendUrl } from "../config";

interface contentProp {
  open: boolean;
  onClose: () => void;
}

enum contentType {
  YouTube = "youtube",
  Twitter = "twitter",
}

export const CreateContent = ({ open, onClose }: contentProp) => {
  const [type, setType] = useState(contentType.YouTube);
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);

  const addContent = async () => {
    const title = titleRef.current?.value;
    const link = linkRef.current?.value;
    console.log(localStorage.getItem("token"));

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
    onClose();
  };
  return (
    <div>
      {open && (
        <div>
          <div className="w-screen h-screen top-0 right-0 bg-slate-700/80 fixed flex flex-row min-h-screen justify-center items-center">
            <div className="bg-white  w-64 rounded">
              <div className="flex justify-between">
                <div className="text-xl font-semibold p-4">Add content</div>
                <div className="pt-4 pr-2 cursor-pointer" onClick={onClose}>
                  <CloseIcon />
                </div>
              </div>
              <InputBox placeholder="Title" reference={titleRef} />
              <InputBox placeholder="Link" reference={linkRef} />
              <div className="font-semibold pt-1 flex items-center justify-center">
                Type
              </div>
              <div className="flex items-center justify-items-center m-2 p-2 pl-8 ">
                <Button
                  title="Youtube"
                  variant={
                    type === contentType.YouTube ? "primary" : "secondary"
                  }
                  onClick={() => setType(contentType.YouTube)}
                />
                <Button
                  title="Twitter"
                  variant={
                    type === contentType.Twitter ? "primary" : "secondary"
                  }
                  onClick={() => setType(contentType.Twitter)}
                />
              </div>

              <div className="flex items-center justify-center">
                <Button variant="primary" title="Add" onClick={addContent} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
