import React from "react";

/**
 * CommunitySection encourages users to engage with the coding community.
 *
 * @returns {JSX.Element}
 */
function CommunitySection() {
  return (
    <section className="mt-20 text-center" aria-label="Community Section">
      <h2 className="text-2xl font-semibold mb-2">
        Practice with the Community
      </h2>
      <p className="text-gray-400 mb-4">
        Share progress, discuss problems, and grow together with fellow coders.
      </p>
    </section>
  );
}

export default CommunitySection;
