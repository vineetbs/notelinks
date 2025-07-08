import axios from "axios";
import { useEffect, useState } from "react";
import { BackendUrl } from "../config";

export const Usecontent = () => {
  const [content, setContent] = useState([]);
  const [loading, setloading] = useState(false);
  const [error, setError] = useState(false);
  const fetchBe = () => {
    try {
      axios
        .get(BackendUrl + "/api/v1/content", {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((response) => {
          setContent(response.data);
          setloading(false);
        });
    } catch (error) {
      setError(true);
    }
  };
  useEffect(() => {
    setloading(true);
    fetchBe();
  }, []);
  return { content, fetchBe, error, loading };
};
