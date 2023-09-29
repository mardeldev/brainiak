"use client";

import { Crisp } from "crisp-sdk-web";
import { useEffect } from "react";

export const CrsipChat = () => {
  useEffect(() => {
    Crisp.configure("c801e55c-36b4-4c46-b4e6-8a487b4faa40");
  }, []);

  return null;
};
