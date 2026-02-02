import { useEffect, useState } from "react";

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
  imageBaseURL: null;
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

export function useBookData(seriesId?: string, bookId?: string) {
  const [data, setData] = useState<BookTextData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!seriesId || !bookId) {
      setError("Missing seriesId or bookId");
      return;
    }

    let cancelled = false;

    async function load() {
      try {
        const url = `/data/${seriesId}/${bookId}.json`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const json = await res.json();
        if (!cancelled) setData(json);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Unknown error");
        }
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [seriesId, bookId]);

  return { data, error };
}
