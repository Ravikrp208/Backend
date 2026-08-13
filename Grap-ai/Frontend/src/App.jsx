import React, { useState, useEffect, useRef } from 'react';
import { executeBattle, getModelsInfo, getBattleHistory, DEFAULT_MODELS } from './apiService';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import SolutionCard from './components/SolutionCard';
import JudgeCard from './components/JudgeCard';
import EmptyState from './components/EmptyState';
import ThinkingStage from './components/ThinkingStage';
import StatsModal from './components/StatsModal';
import { Send, Sparkles, Swords, AlertCircle, RefreshCw, Layers } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function App() {
  const [models, setModels] = useState(DEFAULT_MODELS);
  const [history, setHistory] = useState([]);
  const [activeBattle, setActiveBattle] = useState(null);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isStatsOpen, setIsStatsOpen] = useState(false);
  const [votedMap, setVotedMap] = useState({});

  const battleEndRef = useRef(null);
  const textareaRef = useRef(null);

  // Initialize data on mount
  useEffect(() => {
    async function initData() {
      // 1. Fetch models
      const modelsData = await getModelsInfo();
      if (modelsData) setModels(modelsData);

      // 2. Fetch history from backend or localStorage
      const backendHistory = await getBattleHistory();
      const localHistoryStr = localStorage.getItem('grap_ai_arena_history');
      let localHistory = [];
      if (localHistoryStr) {
        try { localHistory = JSON.parse(localHistoryStr); } catch (e) {}
      }

      const combined = backendHistory.length > 0 ? backendHistory : localHistory;
      setHistory(combined);
      if (combined.length > 0) {
        setActiveBattle(combined[0]);
      }
    }
    initData();
  }, []);

  // Save history to localStorage whenever updated
  useEffect(() => {
    if (history.length > 0) {
      localStorage.setItem('grap_ai_arena_history', JSON.stringify(history));
    }
  }, [history]);

  // Compute live stats
  const stats = {
    total: history.length,
    mistralWins: history.filter(b => b.judge?.winner === 'solution_1').length,
    cohereWins: history.filter(b => b.judge?.winner === 'solution_2').length,
    ties: history.filter(b => b.judge?.winner === 'tie').length,
  };

  const scrollToBottom = () => {
    battleEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isThinking || activeBattle) {
      scrollToBottom();
    }
  }, [isThinking, activeBattle]);

  // Handle battle dispatch
  const handleStartBattle = async (promptText) => {
    const query = (promptText || input).trim();
    if (!query || isThinking) return;

    setInput('');
    setErrorMessage('');
    setIsThinking(true);

    // Placeholder active battle while thinking
    const tempBattle = {
      id: `temp_${Date.now()}`,
      problem: query,
      timestamp: new Date().toISOString(),
      solution_1: '',
      solution_2: '',
      judge: null,
    };
    setActiveBattle(tempBattle);

    try {
      const response = await executeBattle(query);
      if (response && response.battle) {
        const fullBattle = response.battle;
        setActiveBattle(fullBattle);
        setHistory(prev => [fullBattle, ...prev.filter(b => b.id !== fullBattle.id)]);
        
        if (response.models) {
          setModels(response.models);
        }

        // Celebrate winner with confetti
        if (fullBattle.judge?.winner) {
          confetti({
            particleCount: 60,
            spread: 70,
            origin: { y: 0.6 },
          });
        }
      } else {
        throw new Error(response.error || "Failed to receive battle results.");
      }
    } catch (err) {
      console.error("Battle execution failed:", err);
      setErrorMessage(err.message || "An unexpected error occurred during execution.");
    } finally {
      setIsThinking(false);
    }
  };

  const handleSelectBattle = (battle) => {
    setActiveBattle(battle);
    setErrorMessage('');
  };

  const handleNewBattle = () => {
    setActiveBattle(null);
    setInput('');
    setErrorMessage('');
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const handleClearHistory = () => {
    if (window.confirm("Are you sure you want to clear all battle history?")) {
      setHistory([]);
      setActiveBattle(null);
      localStorage.removeItem('grap_ai_arena_history');
    }
  };

  const handleExport = () => {
    if (!activeBattle) {
      alert("No active battle to export!");
      return;
    }

    const report = {
      title: "Graph-AI Arena Battle Report",
      exportedAt: new Date().toISOString(),
      battle: activeBattle,
      models: models,
    };

    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `arena-duel-${activeBattle.id || 'report'}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleVote = (modelId) => {
    if (!activeBattle) return;
    setVotedMap(prev => ({
      ...prev,
      [activeBattle.id]: modelId,
    }));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleStartBattle();
    }
  };

  return (
    <div className="flex flex-col h-screen w-full bg-[#060a14] text-[#e2e8f8] overflow-hidden">
      {/* Top Header */}
      <Header
        onOpenStats={() => setIsStatsOpen(true)}
        onExport={handleExport}
        onClear={handleNewBattle}
        battleCount={history.length}
        models={models}
        isLive={!isThinking}
      />

      {/* Main Workspace Layout */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar */}
        <Sidebar
          history={history}
          activeBattleId={activeBattle?.id}
          onSelectBattle={handleSelectBattle}
          onNewBattle={handleNewBattle}
          onClearHistory={handleClearHistory}
          stats={stats}
          models={models}
        />

        {/* Center Main Arena Stage */}
        <main className="flex-1 flex flex-col h-full bg-[#080d1c] relative overflow-hidden bg-grid-pattern">
          {/* Subtle Ambient Radial Glows */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#0284c7]/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-[#818cf8]/10 rounded-full blur-3xl pointer-events-none"></div>

          {/* Scrollable Arena Feed */}
          <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-6">
            <div className="max-w-6xl mx-auto space-y-8">
              {/* Error Banner if any */}
              {errorMessage && (
                <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-between text-rose-300 text-xs shadow-lg animate-in fade-in">
                  <div className="flex items-center gap-2.5">
                    <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                  <button
                    onClick={() => handleStartBattle(activeBattle?.problem)}
                    className="flex items-center gap-1 px-3 py-1 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 font-semibold cursor-pointer transition-all"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Retry Duel</span>
                  </button>
                </div>
              )}

              {/* View 1: Empty state / Prompt explorer */}
              {!activeBattle && !isThinking ? (
                <EmptyState 
                  onSelectPrompt={(prompt) => {
                    setInput(prompt);
                    handleStartBattle(prompt);
                  }}
                  models={models}
                />
              ) : (
                /* View 2: Active Battle Stage */
                <div className="space-y-8 animate-in fade-in duration-300">
                  {/* User Problem Card */}
                  <div className="p-5 rounded-2xl bg-[#0e162b]/90 border border-white/10 backdrop-blur-xl shadow-[0_4px_25px_rgba(0,0,0,0.4)] relative">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2 text-xs font-bold text-[#38bdf8] uppercase tracking-wider">
                        <Swords className="w-4 h-4 text-[#38bdf8]" />
                        <span>Active Arena Challenge</span>
                      </div>
                      {activeBattle?.total_time_ms > 0 && (
                        <span className="text-[11px] text-gray-400 font-mono bg-white/5 px-2.5 py-0.5 rounded-full border border-white/5">
                          Total Duel Time: {(activeBattle.total_time_ms / 1000).toFixed(2)}s
                        </span>
                      )}
                    </div>
                    <h2 className="text-base sm:text-lg font-heading font-semibold text-white leading-relaxed">
                      {activeBattle?.problem}
                    </h2>
                  </div>

                  {/* Thinking Stage if in progress */}
                  {isThinking && (
                    <ThinkingStage problem={activeBattle?.problem} />
                  )}

                  {/* Solutions Side-by-Side if available */}
                  {!isThinking && activeBattle?.solution_1 && (
                    <>
                      {/* Model Duel Comparison Grid */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Model 1: Mistral */}
                        <SolutionCard
                          model={models.model_1}
                          content={activeBattle.solution_1}
                          timeMs={activeBattle.solution_1_time_ms}
                          score={activeBattle.judge?.solution_1_score}
                          isWinner={activeBattle.judge?.winner === 'solution_1'}
                          isTie={activeBattle.judge?.winner === 'tie'}
                          onVote={handleVote}
                          voted={votedMap[activeBattle.id] === models.model_1?.id}
                        />

                        {/* Model 2: Cohere */}
                        <SolutionCard
                          model={models.model_2}
                          content={activeBattle.solution_2}
                          timeMs={activeBattle.solution_2_time_ms}
                          score={activeBattle.judge?.solution_2_score}
                          isWinner={activeBattle.judge?.winner === 'solution_2'}
                          isTie={activeBattle.judge?.winner === 'tie'}
                          onVote={handleVote}
                          voted={votedMap[activeBattle.id] === models.model_2?.id}
                        />
                      </div>

                      {/* Impartial Gemini Flash Judge Evaluation Card */}
                      {activeBattle.judge && (
                        <JudgeCard
                          judge={activeBattle.judge}
                          model1={models.model_1}
                          model2={models.model_2}
                          timeMs={activeBattle.judge_time_ms}
                        />
                      )}
                    </>
                  )}
                </div>
              )}

              <div ref={battleEndRef} />
            </div>
          </div>

          {/* Floating Composer Bar */}
          <div className="px-4 sm:px-8 py-4 bg-[#070c18]/90 backdrop-blur-2xl border-t border-white/8 shrink-0 z-20">
            <div className="max-w-4xl mx-auto">
              <div className="relative rounded-2xl bg-[#0e162b] border border-white/10 focus-within:border-[#38bdf8] focus-within:shadow-[0_0_30px_rgba(56,189,248,0.25)] transition-all flex items-end p-2 gap-2 shadow-2xl">
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Enter a coding challenge, architecture question, or algorithm duel (Press Enter to start)..."
                  rows={1}
                  disabled={isThinking}
                  className="flex-1 bg-transparent border-none text-white placeholder-gray-500 px-3 py-2 text-sm focus:outline-none resize-none max-h-32 min-h-[44px]"
                  style={{ height: 'auto', minHeight: '44px' }}
                />

                <button
                  onClick={() => handleStartBattle()}
                  disabled={!input.trim() || isThinking}
                  title="Run Arena Duel"
                  className="bg-gradient-to-tr from-[#0284c7] via-[#38bdf8] to-[#6366f1] hover:from-[#0369a1] hover:via-[#0284c7] hover:to-[#4f46e5] text-white p-2.5 rounded-xl font-bold transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer shadow-[0_2px_15px_rgba(56,189,248,0.4)] hover:scale-105 active:scale-95 shrink-0 flex items-center justify-center"
                >
                  {isThinking ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                </button>
              </div>

              {/* Input Footer Note */}
              <div className="flex items-center justify-between px-2 pt-2 text-[11px] text-gray-500">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-[#38bdf8]" />
                  <span>Parallel invocation across Mistral & Cohere &middot; Evaluated by Gemini Flash</span>
                </span>
                <span className="hidden sm:inline font-mono">
                  Enter to Send &middot; Shift+Enter for Newline
                </span>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Arena Stats Modal */}
      <StatsModal
        isOpen={isStatsOpen}
        onClose={() => setIsStatsOpen(false)}
        stats={stats}
        history={history}
      />
    </div>
  );
}
