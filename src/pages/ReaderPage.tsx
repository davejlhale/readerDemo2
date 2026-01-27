/**
 * NOTE ON FUTURE ARCHITECTURE
 * --------------------------------------------------
 * ReaderPage is intended to become the single, unified
 * reading engine for the entire app. In the long term,
 * this page will replace BookReadyPage entirely.
 *
 * Today, ReaderPage assumes that BookReadyPage has:
 *   • loaded the book JSON
 *   • preloaded the first 1–2 pages
 *   • ensured the reader can render immediately
 *
 * But once ReaderPage supports:
 *   • starting at any page (1 or last-read)
 *   • loading the starting page immediately
 *   • priority-based preloading:
 *        - startPage first
 *        - then forward (start+1 → end)
 *        - then backward (start-1 → 1)
 *   • showing placeholders until images arrive
 *   • tracking reading behaviour (time on page, etc.)
 *   • updating last-read progress in the database
 *
 * …then BookReadyPage becomes unnecessary.
 *
 * In that future design:
 *   - "Read" opens ReaderPage at page 1
 *   - "Continue Reading" opens ReaderPage at the user's last-read page
 *   - ReaderPage handles all loading, caching, and UX staging internally
 *   - No separate staging screen is required
 *
 * Keeping BookReadyPage for now is intentional:
 *   • It isolates preload logic while we refine it
 *   • It keeps ReaderPage simpler during early development
 *   • It allows us to debug loading behaviour without affecting the reader UI
 *
 * When the reader engine is mature, ReaderPage will absorb
 * all staging responsibilities and BookReadyPage can be removed.
 */
