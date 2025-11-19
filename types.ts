/**
 * This file now contains JavaScript constants and JSDoc for reference.
 * The TypeScript interfaces have been removed for the JS version.
 */

export const ViewState = {
  HOME: 'HOME',
  HISTORY: 'HISTORY',
  ANALYTICS: 'ANALYTICS'
};

/**
 * @typedef {Object} MoodAnalysis
 * @property {number} sentimentScore
 * @property {string[]} emotionalTone
 * @property {string} empatheticResponse
 * @property {string[]} actionableAdvice
 * @property {string} colorHex
 * @property {string} shortSummary
 */

/**
 * @typedef {Object} JournalEntry
 * @property {string} id
 * @property {number} timestamp
 * @property {string} text
 * @property {MoodAnalysis} analysis
 */
