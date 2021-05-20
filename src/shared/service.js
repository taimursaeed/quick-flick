export const callAPI = async (url, type, postData, token) => {
  const _headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  };
  if (type === "POST") {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: _headers,
        body: JSON.stringify(postData),
      });
      const json = await response.json();
      return json;
    } catch (err) {
      return { type: "other error" };
    }
  } else if (type === "PATCH") {
    try {
      const response = await fetch(url, {
        method: "PATCH",
        headers: _headers,
        body: JSON.stringify(postData),
      });
      const json = await response.json();
      return json;
    } catch (err) {
      return { type: "other error" };
    }
  } else {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: _headers,
      });
      const json = await response.json();
      return json;
    } catch (err) {
      return { type: "other error" };
    }
  }
};
