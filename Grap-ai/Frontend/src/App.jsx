import { useState, useRef, useEffect } from 'react'
import { getAiResponses } from './mockService'

function App() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'user',
      content: 'Welcome to AI Benchmarker. How can I assist you today?'
    },
    {
      id: 2,
      type: 'comparison',
      solutions: [
        { id: 'A', name: 'Neural Alpha', content: 'Ready for deep analysis. Type your query below.' },
        { id: 'B', name: 'Logic Beta', content: 'System online. I will provide a distinct perspective.' }
      ],
      judge: { 
        title: 'Judge Initialization', 
        verdict: 'Both models are calibrated. I will analyze their outputs for you.' 
      }
    }
  ])
  const [input, setInput] = useState('')
  const [isThinking, setIsThinking] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isThinking])

  const handleSend = async () => {
    if (!input.trim() || isThinking) return

    const userMsg = { id: Date.now(), type: 'user', content: input }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setIsThinking(true)

    try {
      const { solutions, judgeVerdict } = await getAiResponses(input)
      const aiTurn = {
        id: Date.now() + 1,
        type: 'comparison',
        solutions: solutions,
        judge: judgeVerdict
      }
      setMessages(prev => [...prev, aiTurn])
    } catch (error) {
      console.error("AI Error:", error)
    } finally {
      setIsThinking(false)
    }
  }

  return (
    <div className="flex h-screen bg-[#0c1324] text-[#dce1fb] font-inter">
      {/* Sidebar */}
      <aside className="w-[260px] bg-[#191f31]/40 backdrop-blur-2xl border-r border-white/5 flex flex-col p-6">
        <button className="bg-gradient-to-br from-[#7bd0ff] to-[#008abb] text-[#00354a] py-3 rounded-full font-semibold mb-6 hover:scale-[1.02] hover:shadow-[0_4px_20px_rgba(123,208,255,0.3)] transition-all cursor-pointer">
          + New Discussion
        </button>
        <div className="flex-1 overflow-y-auto">
          <div className="p-2.5 mb-2 rounded-lg cursor-pointer hover:bg-white/5 text-[#b9c8de] hover:text-[#dce1fb] text-sm transition-all">
            Design System Strategy
          </div>
          <div className="p-2.5 mb-2 rounded-lg cursor-pointer hover:bg-white/5 text-[#b9c8de] hover:text-[#dce1fb] text-sm transition-all">
            AI Architecture Review
          </div>
          <div className="p-2.5 mb-2 rounded-lg cursor-pointer hover:bg-white/5 text-[#b9c8de] hover:text-[#dce1fb] text-sm transition-all">
            Frontend Performance
          </div>
        </div>
        <div className="mt-auto text-[12px] text-[#45464d]">
          Neural Obsidian v1.0
        </div>
      </aside>

      {/* Main Chat */}
      <main className="flex-1 flex flex-col p-10 relative overflow-y-auto">
        <div className="max-w-[900px] mx-auto w-full flex-1">
          {messages.map((msg) => (
            <div key={msg.id} className="mb-12 animate-in fade-in duration-500 slide-in-from-bottom-2">
              {msg.type === 'user' ? (
                <div className="text-right mb-8">
                  <div className="inline-block bg-[#23293c] px-6 py-4 rounded-3xl rounded-br-sm max-w-[80%] text-left">
                    {msg.content}
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex gap-5 mb-5">
                    {msg.solutions.map((sol) => (
                      <div key={sol.id} className="flex-1 bg-[#191f31]/60 backdrop-blur-lg rounded-2xl p-6 border border-white/5 hover:-translate-y-0.5 hover:border-[#7bd0ff]/20 transition-all">
                        <div className="text-[12px] uppercase tracking-wider text-[#7bd0ff] mb-4 font-bold">
                          {sol.name}
                        </div>
                        <div className="text-[15px] leading-relaxed text-[#dce1fb]">
                          {sol.content}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="bg-[#251400]/30 backdrop-blur-lg border border-[#ffb95f]/10 rounded-2xl p-6 relative overflow-hidden before:absolute before:top-0 before:left-0 before:w-1 before:h-full before:bg-[#ffb95f]">
                    <div className="text-[#ffb95f] flex items-center gap-2">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z"></path>
                      </svg>
                      <strong className="font-bold">{msg.judge.title}</strong>
                    </div>
                    <div className="text-[15px] leading-relaxed text-[#dce1fb] mt-3">
                      {msg.judge.verdict.split('\n').map((line, i) => (
                        <p key={i} className="m-0">{line}</p>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}

          {isThinking && (
            <div className="mb-12">
              <div className="flex gap-5">
                <div className="flex-1 bg-[#191f31]/30 backdrop-blur-lg rounded-2xl p-6 border border-white/5 animate-pulse">
                  <div className="text-[12px] uppercase tracking-wider text-[#7bd0ff]/50 mb-4 font-bold">Thinking...</div>
                  <div className="h-4 bg-[#7bd0ff]/5 rounded w-3/4"></div>
                </div>
                <div className="flex-1 bg-[#191f31]/30 backdrop-blur-lg rounded-2xl p-6 border border-white/5 animate-pulse">
                  <div className="text-[12px] uppercase tracking-wider text-[#7bd0ff]/50 mb-4 font-bold">Thinking...</div>
                  <div className="h-4 bg-[#7bd0ff]/5 rounded w-1/2"></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="max-w-[900px] mx-auto w-full pb-5">
          <div className="bg-[#070d1f] rounded-3xl px-4 py-2 flex items-center border border-white/10 focus-within:border-[#7bd0ff] focus-within:shadow-[0_0_20px_rgba(123,208,255,0.1)] transition-all">
            <input 
              className="flex-1 bg-transparent border-none text-[#dce1fb] p-3 outline-none text-base resize-none"
              placeholder="Send a message to compare models..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button className="bg-transparent text-[#7bd0ff] p-2 rounded-full hover:bg-[#7bd0ff]/10 transition-all disabled:opacity-50 cursor-pointer" onClick={handleSend} disabled={isThinking}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
