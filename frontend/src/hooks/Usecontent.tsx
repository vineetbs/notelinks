import axios from "axios";
import { useEffect, useState } from "react";
import { BackendUrl } from "../config";

export const Usecontent = () => {
  const [content, setContent] = useState([]);

  useEffect(() => {
    axios
      .get(BackendUrl + "/api/v1/content", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => setContent(response.data));
  }, []);
  return content;
};
