import { AppError } from "../utility/errors/AppError";

export type BookTextData = {
  validator: ValidatorData;
  pages: PageData[];
};

export type ValidatorData = {
  id: string;
  seriesId: string | null;
  title: string;
  coverImage?: string | null;
  band: string;
  textual_content_only_band: string;
  numeric_score: number;
  dominant_phase: string;
  structural_band_lock: string;
  metrics: {
    TotalTokens: number;
    TypeTokenRatio: number;
    Phase5Density: string;
    PolysyllabicRate: string;
    ExceptionDensity: string;
    ComplexClusteringPerSentence: number;
  };
  structural_metrics: {
    RepetitionFrameRate: number;
    SlotFrameRate: number;
    PrefixFrameRate: number;
    CrossPageRecall: number;
    CausalConnectivesPer100Tokens: number;
    MultiPhaseArc: number;
  };
  phonicsProfiling: {
    Phase2Load: string;
    Phase3GraphemeDensity: string;
    Phase4ClusterDensity: string;
    Phase5Density: string;
    Phase6MorphologyLoad: string;
  };
  flags: string[];
};

export type PageData = {
  pageNumber: number;
  imageBaseURL: string | null;
  altText?: string;
  lines: string[];
  meta: {
    pageWordCount: number;
    seriesFlags: {
      graphemeSpikeDetected: boolean;
      structuralEscalationPage: number | null;
    };
  };
};
// useBookData.suspense.ts
let cache = new Map();

export function useBookData(seriesId?: string, bookId?: string) {
  if (!seriesId || !bookId) {
    throw new Error("Missing seriesId or bookId");
  }

  const key = `${seriesId}/${bookId}`;

  // If cached, return immediately
  if (cache.has(key)) {
    const entry = cache.get(key);
    if (entry.error) throw entry.error;
    if (entry.data) return entry.data;
    throw entry.promise;
  }

  // Create a load entry
  let entry: any = {};
  entry.promise = fetch(`/data/${seriesId}/${bookId}.json`)
    .then((res) => {
      if (!res.ok) {
        throw new AppError("NETWORK_ERROR");
      }

      const type = res.headers.get("content-type");
      if (!type || !type.includes("application/json")) {
        const msg = "random";
        throw new AppError("BOOK_NOT_FOUND", { seriesId, bookId, msg });
      }

      return res.json();
    })
    .then((json) => {
      entry.data = json;
    })
    .catch((err) => {
      entry.error =
        err instanceof AppError ? err : new AppError("NETWORK_ERROR");
    });

  cache.set(key, entry);

  throw entry.promise;
}
