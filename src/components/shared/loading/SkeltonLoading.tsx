"use client";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import MainContainer from "../container/MainContainer";

interface SkeletonLoadingProps {
  count?: number;
  height?: number;
}

export default function SkeletonLoading({
  count = 5,
  height = 20,
}: SkeletonLoadingProps) {
  return (
    <MainContainer>
      <Skeleton count={count} height={height} baseColor="#364153" highlightColor="#101828" />
    </MainContainer>
  );
}
