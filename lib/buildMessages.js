/**
 * Builds the messages array sent to OpenAI.
 * - Turn 1: system + few-shots + user message
 * - Turn 2+: system only + recent chat (few-shots dropped to save tokens)
 * - Sliding window keeps last N user/assistant pairs
 */
export function buildMessages(
  personaConfig,
  chatHistory,
  { maxRecentPairs = 6, dropFewShotsAfterTurn1 = true } = {}
) {
  const all = personaConfig.messages ?? [];
  const system = all.filter((m) => m.role === 'system');
  const fewShots = all.filter((m) => m.role !== 'system');

  const userTurnCount = chatHistory.filter((m) => m.role === 'user').length;
  const isFirstTurn = userTurnCount <= 1;

  const base =
    isFirstTurn || !dropFewShotsAfterTurn1
      ? [...system, ...fewShots]
      : [...system];

  const recent = chatHistory.slice(-maxRecentPairs * 2);
  return [...base, ...recent];
}
