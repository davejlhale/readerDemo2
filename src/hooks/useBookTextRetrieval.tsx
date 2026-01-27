import { useSequentialImagePreload } from "./useSequentialImagePreload";
import { useBookJson } from "./useBookJson";

export type BookTextData = {
  id: string;
  seriesId: string;
  title: string;
  cover: string;
  pages: {
    pageNumber: string;
    imageBaseURL: string;
    lines: string[];
    metaData: string;
  }[];
};
export function useBookTextRetrieval(seriesId?: string, bookId?: string) {
  const { data, error } = useBookJson(seriesId, bookId);
  const { initialReady, backgroundLoading, loadedCount, totalPages } =
    useSequentialImagePreload(data?.pages, 2);

  return {
    data,
    initialReady,
    backgroundLoading,
    loadedCount,
    totalPages,
    error,
  };
}
