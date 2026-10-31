"use client";

import { useState } from "react";
import { Arrow } from "./icons";

export function CopyEmail({ email }: { email: string }) {
  const [message, setMessage] = useState("");
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setMessage("Email copied.");
    } catch { setMessage("Select the email above to copy it."); }
  };
  return <div className="copy-control"><button onClick={copy}>Copy email <Arrow /></button><span role="status" aria-live="polite">{message}</span></div>;
}
