import React, { useState, useEffect, Suspense } from "react";
import { Loader } from "../components"; // ✅ Adjust path based on location

const SuspenseWrapper = (Component) => {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false); // Hide loader after 2 seconds
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return showLoader ? (
    <Loader />
  ) : (
    <Suspense fallback={<Loader />}>
      <Component />
    </Suspense>
  );
};

export default SuspenseWrapper;
