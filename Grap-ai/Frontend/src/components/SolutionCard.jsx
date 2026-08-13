import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Copy, Check, Clock, Award, ThumbsUp, Sparkles, ExternalLink } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function SolutionCard({ 
  model, 
  content, 
  timeMs, 
  score, 
  isWinner,
  isTie,
  onVote,
  voted
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!content) return;
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleVoteClick = () => {
    if (onVote) {
      onVote(model.id);
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.8 },
      });
    }
  };

  const getScoreColor = (sc) => {
    if (sc >= 8.5) return 'text-emerald-400 border-emerald-500/40 bg-emerald-500/10';
    if (sc >= 7.0) return 'text-amber-400 border-amber-500/40 bg-amber-500/10';
    return 'text-rose-400 border-rose-500/40 bg-rose-500/10';
  };

  return (
    <div 
      className={`relative flex flex-col rounded-2xl border transition-all duration-300 backdrop-blur-xl overflow-hidden ${
        isWinner 
          ? 'bg-[#101b33]/90 border-[#38bdf8]/60 shadow-[0_0_30px_rgba(56,189,248,0.2)] ring-1 ring-[#38bdf8]/30' 
          : 'bg-[#0d1527]/70 border-white/8 hover:border-white/20'
      }`}
    >
      {/* Top Banner if Winner */}
      {isWinner && (
        <div className="bg-gradient-to-r from-amber-500 via-[#38bdf8] to-amber-500 bg-[length:200%_auto] text-[#050b18] text-xs font-black px-4 py-1.5 flex items-center justify-between shadow-sm animate-gradient">
          <div className="flex items-center gap-1.5">
            <Award className="w-4 h-4 fill-current" />
            <span>🏆 OFFICIAL MATCH WINNER</span>
          </div>
          <span className="text-[10px] font-bold bg-[#050b18]/30 px-2 py-0.5 rounded text-white backdrop-blur-sm">
            Ref Verdict: Highest Quality
          </span>
        </div>
      )}

      {/* Header bar */}
      <div className="p-5 pb-3 border-b border-white/5 flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="text-2xl p-2 rounded-xl bg-white/5 border border-white/10 shadow-inner flex items-center justify-center shrink-0">
            {model?.avatar || '🤖'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-heading font-bold text-base text-white tracking-wide">
                {model?.name || 'AI Model'}
              </h3>
              <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-white/10 text-gray-300 border border-white/10">
                {model?.provider || 'LLM Engine'}
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-0.5">
              {model?.tagline || 'High-throughput reasoning model'}
            </p>
          </div>
        </div>

        {/* Score & Time Badges */}
        <div className="flex items-center gap-2 shrink-0">
          {timeMs > 0 && (
            <div className="flex items-center gap-1 text-[11px] text-gray-400 bg-black/40 px-2.5 py-1 rounded-lg border border-white/5">
              <Clock className="w-3 h-3 text-[#38bdf8]" />
              <span>{(timeMs / 1000).toFixed(2)}s</span>
            </div>
          )}

          {typeof score === 'number' && score > 0 && (
            <div className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-lg border ${getScoreColor(score)}`}>
              <Sparkles className="w-3 h-3" />
              <span>{score.toFixed(1)}/10</span>
            </div>
          )}
        </div>
      </div>

      {/* Markdown Solution Body */}
      <div className="p-5 flex-1 overflow-y-auto max-h-[550px] markdown-body selection:bg-[#38bdf8]/30">
        {content ? (
          <ReactMarkdown
            components={{
              code({ node, inline, className, children, ...props }) {
                return !inline ? (
                  <div className="relative group my-3">
                    <pre className="p-4 rounded-xl bg-[#070b14] border border-white/10 overflow-x-auto text-xs font-mono text-gray-200">
                      <code className={className} {...props}>
                        {children}
                      </code>
                    </pre>
                  </div>
                ) : (
                  <code className="px-1.5 py-0.5 rounded bg-white/10 text-[#7bd0ff] font-mono text-xs" {...props}>
                    {children}
                  </code>
                );
              }
            }}
          >
            {content}
          </ReactMarkdown>
        ) : (
          <div className="py-8 text-center text-gray-500 italic text-sm">
            No output produced.
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="px-5 py-3 bg-[#080d1a]/80 border-t border-white/5 flex items-center justify-between text-xs text-gray-400">
        <button
          onClick={handleVoteClick}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
            voted
              ? 'bg-[#38bdf8]/20 border-[#38bdf8] text-[#38bdf8] font-semibold'
              : 'hover:bg-white/5 border-white/10 text-gray-300'
          }`}
        >
          <ThumbsUp className={`w-3.5 h-3.5 ${voted ? 'fill-current' : ''}`} />
          <span>{voted ? 'Voted Best' : 'Vote for Model'}</span>
        </button>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-white/5 border border-white/10 text-gray-300 transition-all cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400 font-medium">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-gray-400" />
              <span>Copy Markdown</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
