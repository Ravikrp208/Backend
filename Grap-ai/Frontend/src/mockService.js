export const getAiResponses = async (userMessage) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  const solutions = [
    {
      id: 'A',
      name: 'Neural Model Alpha',
      content: `I recommend approaching "${userMessage}" by focusing on efficiency and scalability. We should implement a modular architecture using the latest industry standards. This ensures that as the requirements evolve, the core logic remains stable while allowing for rapid iterative improvements.`
    },
    {
      id: 'B',
      name: 'Quantum Logic Beta',
      content: `For "${userMessage}", the primary concern should be user experience and accessibility. I suggest a design-first approach that prioritizes intuitive interactions. By leveraging advanced heuristics, we can create a seamless flow that minimizes friction and maximizes engagement across all user segments.`
    }
  ];

  const judgeVerdict = {
    title: 'Judge Recommendation',
    verdict: `After analyzing both perspectives, **Neural Model Alpha (Solution A)** provides a more robust foundation for long-term growth. While Quantum Logic Beta offers excellent UI considerations, the architectural stability proposed by Alpha is critical for the initial phase of "${userMessage}". I recommend merging Alpha's structural approach with Beta's attention to user friction for the optimal outcome.`
  };

  return { solutions, judgeVerdict };
};
