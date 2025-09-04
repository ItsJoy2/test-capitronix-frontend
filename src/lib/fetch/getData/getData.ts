import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axiosInstance from "../axiosConfig/axiosConfig";

const fetchData = async <T>(dataUrl: string): Promise<T> => {
  const response = await axiosInstance.get<T>(dataUrl);
  return response.data;
};

export const useGetData = <T,>(queryKey: string | unknown[], dataUrl: string): UseQueryResult<T> => {
  return useQuery<T>({
    queryKey: Array.isArray(queryKey) ? queryKey : [queryKey],
    queryFn: () => fetchData<T>(dataUrl),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  });
};
