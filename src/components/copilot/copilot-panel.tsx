"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  Bot,
  Send,
  X,
  ChevronUp,
  Image,
  Mic,
  Paperclip,
  BarChart2,
  FileText,
  Sparkles,
  RefreshCw,
  ThumbsUp,
  ThumbsDown,
  Copy,
  Download,
  MoreHorizontal,
  AlertCircle,
} from "lucide-react";
import { cn, formatDateTimeIST } from "@/lib/utils";
import {
  INITIAL_COPILOT_MESSAGES,
  COPILOT_SUGGESTED_QUESTIONS,
  COPILOT_RESPONSES,
} from "@/lib/demo-data";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  isLoading?: boolean;
  sources?: string[];
};

function parseMarkdown(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/`(.*?)`/g, "<code>$1</code>")
    .replace(/\n\n/g, "</p><p>")
    .replace(/\n/g, "<br/>")
    .replace(/^/, "<p>")
    .replace(/$/, "</p>")
    .replace(/^<p><\/p>$/, "")
    .replace(/\| (.*?) \| (.*?) \| (.*?) \| (.*?) \|/g, (match, ...cols) => {
      const cells = cols.slice(0, 4).map((c: string) => `<td>${c.trim()}</td>`).join("");
      return `<tr>${cells}</tr>`;
    });
}

function getCopilotResponse(query: string): { content: string } {
  const q = query.toLowerCase();

  if (q.includes("revenue") || q.includes("sales") || q.includes("money")) {
    return COPILOT_RESPONSES["revenue"];
  }
  if (q.includes("delay") || q.includes("wait") || q.includes("slow") || q.includes("bottleneck")) {
    return COPILOT_RESPONSES["delays"];
  }
  if (q.includes("doctor") || q.includes("utilization") || q.includes("staff") || q.includes("physician")) {
    return COPILOT_RESPONSES["doctors"];
  }
  if (q.includes("claim") || q.includes("denial") || q.includes("insurance") || q.includes("reject")) {
    return COPILOT_RESPONSES["claims"];
  }
  if (q.includes("bed") || q.includes("capacity") || q.includes("admission") || q.includes("forecast")) {
    return COPILOT_RESPONSES["beds"];
  }
  if (q.includes("report") || q.includes("summary") || q.includes("overview")) {
    return COPILOT_RESPONSES["report"];
  }
  if (q.includes("risk") || q.includes("alert") || q.includes("critical")) {
    return {
      content: `⚠️ **Top 5 Operational Risks — Oct 23, 2026**\n\n1. **ICU Capacity (Critical)**: Apollo Mumbai ICU at 95% — 2 beds remaining\n2. **Claim Denial Rate**: Fortis Pune at 8.2% — above 5% threshold\n3. **Doctor Utilization**: 4 Orthopedics doctors at <60% utilization\n4. **Lab TAT SLA**: 47 reports beyond 4-hour turnaround time\n5. **Stock Expiry Risk**: 18 medicine batches expiring within 30 days\n\n**Recommended Priority**: Address ICU capacity immediately, then initiate claim-denial reduction workflow.\n\n*Risk assessment based on real-time operational data as of 21:45 IST*`,
    };
  }
  if (q.includes("compare") || q.includes("branch") || q.includes("facility") || q.includes("performance")) {
    return {
      content: `🏥 **Facility Performance Comparison — Q3 2026**\n\n| Facility | Bed Occ. | Revenue | Satisfaction | Health Score |\n|----------|----------|---------|-------------|-------------|\n| Apollo Mumbai | 93.5% | ₹9.2 Cr | 4.6/5 | 92/100 |\n| Fortis Pune | 81.2% | ₹5.6 Cr | 4.3/5 | 78/100 |\n| Manipal Bengaluru | 74.8% | ₹2.4 Cr | 4.1/5 | 71/100 |\n| Ruby Hyderabad | 68.3% | ₹1.3 Cr | 3.9/5 | 64/100 |\n\n**Key Insight**: Ruby Hyderabad is underperforming on all key metrics. Recommend immediate operational review and potential staffing intervention.\n\n**Apollo Mumbai**: Running near capacity — needs capacity expansion planning.`,
    };
  }
  if (q.includes("appointment") || q.includes("no-show") || q.includes("miss")) {
    return {
      content: `📅 **No-Show Risk Analysis**\n\nAI model identified **34 appointments** with >70% no-show probability for tomorrow:\n\n- **Morning slots (9-11 AM)**: 18 high-risk appointments\n- **Afternoon slots (2-4 PM)**: 16 high-risk appointments\n\n**Risk Factors Identified**:\n• First-time consultation patients: 14\n• Distance > 15km: 11\n• No appointment reminder sent: 9\n\n**Recommended Actions**:\n1. Send WhatsApp reminders to high-risk patients now\n2. Double-book 8 slots as buffer\n3. Enable waitlist for 6 priority appointments\n\n**Estimated Revenue Saved**: ₹82,000\n*Model accuracy: 83% based on 6-month training data*`,
    };
  }
  if (q.includes("waiting time") || q.includes("wait time") || q.includes("reduce wait")) {
    return {
      content: `⏱️ **Actions to Reduce Waiting Times**\n\nCurrent average wait time: **28 minutes** (target: 20 minutes)\n\n**Top Recommendations**:\n\n1. **Smart Queue Management** — Enable digital token system for OPD\n   - Estimated impact: -8 minutes avg wait\n\n2. **Stagger Appointment Slots** — Move from fixed to rolling 15-min slots\n   - Estimated impact: -5 minutes avg wait\n\n3. **Fast-Track Lane** — Separate queue for follow-up vs. new consultations\n   - Estimated impact: -4 minutes for returning patients\n\n4. **Doctor Punctuality Alerts** — Alert doctors 5 mins before slot time\n   - Estimated impact: -3 minutes avg wait\n\n**Combined Estimated Impact**: Reduce average wait from 28 → 18 minutes\n**Patient Satisfaction Improvement**: +0.4 points (from 4.4 → 4.8/5)`,
    };
  }

  return {
    content: `🤔 I understand you're asking about: *"${query}"*\n\nI can help you analyze that. Based on current data for **Apollo Mumbai** (Oct 2026):\n\nPlease be more specific, or try one of these queries:\n• "What caused revenue to decrease?"\n• "Which doctors have low utilization?"\n• "How many beds will we need next week?"\n• "Compare branch performance"\n• "What are the top operational risks?"\n\n*Note: I only answer questions grounded in your authorized operational data. I cannot access patient-identifiable information without proper authorization.*`,
  };
}

export function CopilotPanel({ onClose }: { onClose?: () => void }) {
  const [messages, setMessages] = useState<Message[]>(INITIAL_COPILOT_MESSAGES);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const sendMessage = useCallback(async (query: string) => {
    if (!query.trim() || isTyping) return;

    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      role: "user",
      content: query,
      timestamp: new Date().toISOString(),
    };

    const loadingMessage: Message = {
      id: `loading-${Date.now()}`,
      role: "assistant",
      content: "",
      timestamp: new Date().toISOString(),
      isLoading: true,
    };

    setMessages((prev) => [...prev, userMessage, loadingMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI thinking delay (500ms - 2s)
    const delay = 800 + Math.random() * 1200;
    await new Promise((r) => setTimeout(r, delay));

    const response = getCopilotResponse(query);
    const assistantMessage: Message = {
      id: `msg-${Date.now()}`,
      role: "assistant",
      content: response.content,
      timestamp: new Date().toISOString(),
      sources: ["Operational Database", "KPI Engine", "Analytics Service"],
    };

    setMessages((prev) => prev.filter((m) => !m.isLoading).concat(assistantMessage));
    setIsTyping(false);
  }, [isTyping]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendMessage(inputValue);
      }
    },
    [inputValue, sendMessage]
  );

  return (
    <div className="copilot-gradient flex flex-col h-full border-l border-white/10">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="text-white text-sm font-semibold">AI Copilot</div>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
              <span className="text-xs text-slate-400">Online · Data-grounded</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button className="p-1.5 text-slate-500 hover:text-slate-300 rounded-lg hover:bg-white/10 transition-colors" title="Clear conversation">
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
          {onClose && (
            <button onClick={onClose} className="p-1.5 text-slate-500 hover:text-slate-300 rounded-lg hover:bg-white/10 transition-colors">
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="px-3 py-2 bg-amber-900/20 border-b border-amber-700/20 flex-shrink-0">
        <div className="flex items-start gap-1.5">
          <AlertCircle className="w-3 h-3 text-amber-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-amber-300/80">
            Demo mode — AI uses synthetic data. Authorized read-only analysis only. Verify before acting.
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3 sidebar-scroll">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={cn(
              "flex gap-2 animate-fade-in-up",
              msg.role === "user" ? "flex-row-reverse" : "flex-row"
            )}
          >
            {/* Avatar */}
            {msg.role === "assistant" && (
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Bot className="w-3.5 h-3.5 text-white" />
              </div>
            )}

            <div className={cn("flex-1 max-w-[90%]", msg.role === "user" && "flex flex-col items-end")}>
              {msg.isLoading ? (
                <div className="bg-slate-700/50 rounded-xl px-3 py-2.5 inline-flex items-center gap-1">
                  <div className="typing-dot" />
                  <div className="typing-dot" />
                  <div className="typing-dot" />
                </div>
              ) : (
                <div
                  className={cn(
                    "rounded-xl px-3 py-2.5 text-xs leading-relaxed",
                    msg.role === "user"
                      ? "bg-blue-600 text-white rounded-tr-sm"
                      : "bg-slate-700/50 text-slate-200 rounded-tl-sm"
                  )}
                >
                  {msg.role === "assistant" ? (
                    <div
                      className="copilot-message"
                      dangerouslySetInnerHTML={{ __html: parseMarkdown(msg.content) }}
                    />
                  ) : (
                    msg.content
                  )}
                </div>
              )}

              {/* Message meta */}
              {!msg.isLoading && (
                <div className="flex items-center gap-2 mt-1 px-1">
                  <span className="text-xs text-slate-600">
                    {new Date(msg.timestamp).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true })}
                  </span>
                  {msg.role === "assistant" && msg.sources && (
                    <>
                      <span className="text-slate-700">·</span>
                      <div className="flex items-center gap-1">
                        {msg.sources.map((s, i) => (
                          <span key={i} className="text-xs text-slate-600 bg-slate-800 px-1 py-0.5 rounded">
                            {s}
                          </span>
                        ))}
                      </div>
                    </>
                  )}
                  {msg.role === "assistant" && !msg.isLoading && (
                    <div className="flex items-center gap-0.5 ml-auto">
                      <button className="p-0.5 text-slate-600 hover:text-slate-400 transition-colors" title="Copy">
                        <Copy className="w-2.5 h-2.5" />
                      </button>
                      <button className="p-0.5 text-slate-600 hover:text-green-400 transition-colors" title="Helpful">
                        <ThumbsUp className="w-2.5 h-2.5" />
                      </button>
                      <button className="p-0.5 text-slate-600 hover:text-red-400 transition-colors" title="Not helpful">
                        <ThumbsDown className="w-2.5 h-2.5" />
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Questions */}
      {messages.length <= 2 && (
        <div className="px-3 py-2 border-t border-white/5 flex-shrink-0">
          <div className="text-xs text-slate-500 mb-2 font-medium">Suggested questions</div>
          <div className="space-y-1.5">
            {COPILOT_SUGGESTED_QUESTIONS.slice(0, 4).map((q) => (
              <button
                key={q}
                onClick={() => sendMessage(q)}
                className="w-full text-left text-xs text-slate-400 hover:text-blue-300 hover:bg-blue-900/20 px-2.5 py-1.5 rounded-lg transition-colors border border-white/5 hover:border-blue-500/20 truncate"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="px-3 py-3 border-t border-white/10 flex-shrink-0">
        <div className="flex items-end gap-2 bg-slate-700/30 rounded-xl px-3 py-2 border border-white/10 focus-within:border-blue-500/50 transition-colors">
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about operations, KPIs, forecasts..."
            rows={1}
            className="flex-1 bg-transparent text-sm text-white placeholder-slate-500 outline-none resize-none min-h-[20px] max-h-24 overflow-y-auto"
            style={{ lineHeight: "1.5" }}
          />
          <button
            onClick={() => sendMessage(inputValue)}
            disabled={!inputValue.trim() || isTyping}
            className={cn(
              "p-1.5 rounded-lg transition-all flex-shrink-0",
              inputValue.trim() && !isTyping
                ? "bg-blue-600 text-white hover:bg-blue-500"
                : "text-slate-600 cursor-not-allowed"
            )}
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="flex items-center justify-between mt-1.5 px-1">
          <div className="flex items-center gap-1">
            {[{ icon: Paperclip, label: "Attach" }, { icon: Image, label: "Image" }, { icon: Mic, label: "Voice" }].map((tool) => (
              <button key={tool.label} title={tool.label} className="p-1 text-slate-600 hover:text-slate-400 transition-colors">
                <tool.icon className="w-3 h-3" />
              </button>
            ))}
          </div>
          <span className="text-xs text-slate-600">Enter to send · Shift+Enter for new line</span>
        </div>
      </div>
    </div>
  );
}
