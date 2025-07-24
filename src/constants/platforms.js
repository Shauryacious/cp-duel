// src/constants/platforms.js

import lcLogo from "@/assets/lc.svg";
import gfgLogo from "@/assets/gfg.svg";

/**
 * Maps coding platform short names to their corresponding logo imports.
 * Extend this mapping by adding more platforms as needed.
 *
 * @type {Record<string, string>}
 */
const platformLogos = {
    lc: lcLogo,    // LeetCode Logo
    gfg: gfgLogo,  // GeeksforGeeks Logo
    // Add more platforms below as necessary, following the example:
    // codeforces: codeforcesLogo,
    // atcoder: atcoderLogo,
};

export default platformLogos;
