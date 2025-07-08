import { CloseIcon } from "../icons/CloseIcon";
import { Button } from "./Button";
import axios from "axios";
import { FrontendUrl, BackendUrl } from "../config";
import { useState, useEffect } from "react";

interface ContentProp {
  open: boolean;
  onClose: () => void;
}

export const ShareContent = ({ open, onClose }: ContentProp) => {
  const [shareLink, setShareLink] = useState("getting sharable link...");

  const getLink = async () => {
    try {
      await axios.post(
        `${BackendUrl}/api/v1/note/share`,
        { share: false },
        { headers: { Authorization: localStorage.getItem("token")! } }
      );

      const response = await axios.post(
        BackendUrl + "/api/v1/note/share",
        { share: true },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      setShareLink(response.data.hash);
    } catch (error) {
      console.log(error);
    }
  };

  // const deleteLink = async () => {
  //   if (window.confirm("Are you sure you want to delete this link?")) {
  //     try {
  //       await axios.post(
  //         BackendUrl + "/api/v1/note/share",
  //         { share: false },
  //         {
  //           headers: {
  //             Authorization: localStorage.getItem("token"),
  //           },
  //         }
  //       );
  //       setShareLink("");
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   } else {
  //     window.alert("Link not deleted");
  //   }
  // };

  const copyLink = () => {
    navigator.clipboard.writeText(`${FrontendUrl}/note/?id=${shareLink}`);
    window.alert("Link copied successfully to clipboard");
  };
  useEffect(() => {
    if (open) {
      console.log("get link called");
      getLink();
    }
  }, [open]);

  return (
    <div>
      {open && (
        <div className="w-screen h-screen top-0 right-0 bg-slate-700/80 fixed flex flex-row min-h-screen justify-center items-center">
          <div className="[background-color:var(--color-secbg)] w-94 h-68 rounded-xl">
            <div className="flex justify-between  pt-4">
              <div className="text-xl font-semibold mx-auto my-auto">
                Share Your Links
              </div>
              <div
                className="pt-4 pr-2 cursor-pointer hover:bg-gray-300 rounded-xl"
                onClick={onClose}
              >
                <CloseIcon />
              </div>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
              <div className="font-thin  flex items-center justify-center">
                <div className="w-92 h-12 flex items-center justify-center border-2 border-gray-500 rounded-xl my-8 bg-white ">
                  {`${FrontendUrl}/note/?id=${shareLink}`}
                </div>
              </div>
              <div className="flex items-center justify-center ">
                <Button
                  variant="primary"
                  title="Copy link"
                  onClick={() => {
                    copyLink();
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
