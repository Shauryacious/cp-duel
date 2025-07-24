// src/utils/url.js

/**
 * Extracts and formats the problem name from a LeetCode or GeeksforGeeks URL.
 * @param {string} url - The problem URL.
 * @returns {string} - The formatted problem name.
 */
export function extractProblemName(url) {
    // LeetCode
    const lcMatch = url.match(/leetcode\.com\/problems\/([a-z0-9-]+)/i);
    if (lcMatch) {
        return lcMatch[1]
            .split("-")
            .map(w => w.charAt(0).toUpperCase() + w.slice(1))
            .join(" ");
    }
    // GeeksforGeeks
    const gfgMatch = url.match(/geeksforgeeks\.org\/problems\/([a-z0-9-]+)/i);
    if (gfgMatch) {
        let kebab = gfgMatch[1].replace(/-\d+$/, "");
        return kebab
            .split("-")
            .map(w => w.charAt(0).toUpperCase() + w.slice(1))
            .join(" ");
    }
    return url;
}

/**
 * Returns a short key for the platform type, e.g., "lc", "gfg", or "other".
 * @param {string} url - The problem URL.
 * @returns {string}
 */
export function getPlatform(url) {
    if (/leetcode\.com\/problems\//i.test(url)) return "lc";
    if (/geeksforgeeks\.org\/problems\//i.test(url)) return "gfg";
    return "other";
}
