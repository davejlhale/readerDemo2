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
  };
};

export function useBookTextRetrieval(seriesId?: string) {
  if (!seriesId) return <p>No seriesI</p>;

  return <></>;
}
