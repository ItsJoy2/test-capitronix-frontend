import React, { Suspense } from "react";
import SignUpComponents from "./SignUpComponents";

export default async function SignUpPage() {
  return (
    <Suspense fallback={null}>
      <SignUpComponents />
    </Suspense>
  );
}
