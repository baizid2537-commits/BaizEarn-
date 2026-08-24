import React, { useState } from 'react';
import { wpHTML, wpCSS, wpJS } from '../wordpress-code';
import { X, Copy, Check, Download, FileCode, Sparkles, BookOpen } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const WordPressExportModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'html' | 'css' | 'js' | 'guide'>('html');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentCode =
    activeTab === 'html' ? wpHTML : activeTab === 'css' ? wpCSS : wpJS;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const filename =
      activeTab === 'html'
        ? 'baizearn-home.html'
        : activeTab === 'css'
        ? 'baizearn-style.css'
        : 'baizearn-script.js';
    const blob = new Blob([currentCode], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#0b1b36] border border-white/15 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl text-white overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-[#071426] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#FFC107]/20 text-[#FFC107] flex items-center justify-center font-bold">
              WP
            </div>
            <div>
              <h3 className="font-['Poppins',sans-serif] text-lg font-bold text-white">
                WordPress Production Code Export
              </h3>
              <p className="text-xs text-slate-400">
                100% Vanilla HTML5, CSS3, & JS scoped with <code className="text-[#00C853]">.baizearn-*</code>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher & Actions */}
        <div className="px-6 py-3 bg-[#08172e] border-b border-white/10 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('html')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                activeTab === 'html'
                  ? 'bg-[#1769E0] text-white shadow-sm'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>1. HTML (Semantic)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('css')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                activeTab === 'css'
                  ? 'bg-[#1769E0] text-white shadow-sm'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>2. CSS (Scoped)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('js')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                activeTab === 'js'
                  ? 'bg-[#1769E0] text-white shadow-sm'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>3. JavaScript</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('guide')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                activeTab === 'guide'
                  ? 'bg-[#00C853] text-[#071A35] font-bold'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>WordPress Guide</span>
            </button>
          </div>

          {activeTab !== 'guide' && (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopy}
                className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Snippet</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleDownload}
                className="px-3 py-1.5 bg-[#00C853] hover:bg-[#00a846] text-[#071A35] font-bold rounded-lg text-xs flex items-center gap-1.5 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download File</span>
              </button>
            </div>
          )}
        </div>

        {/* Code Content / Guide */}
        <div className="p-6 overflow-y-auto flex-1 font-mono text-xs text-slate-300 leading-relaxed bg-[#050f1f]">
          {activeTab === 'guide' ? (
            <div className="font-sans text-sm text-slate-200 space-y-4 max-w-2xl mx-auto py-2">
              <h4 className="text-lg font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#FFC107]" />
                How to integrate into WordPress in 3 Simple Steps:
              </h4>

              <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-2">
                <strong className="text-[#00C853] block text-base">Method A: Gutenberg Block (Easiest)</strong>
                <ol className="list-decimal list-inside space-y-1.5 text-slate-300 text-xs sm:text-sm">
                  <li>Create a new Page in WordPress titled <strong>Home</strong>.</li>
                  <li>Set the page template to <em>Full Width / Canvas / No Sidebar</em>.</li>
                  <li>Add a <strong>Custom HTML Block</strong>, and paste the code from the <strong>HTML</strong> tab.</li>
                  <li>Add the <strong>CSS</strong> into <em>Appearance → Customize → Additional CSS</em> (or in Elementor Custom CSS).</li>
                  <li>Add the <strong>JavaScript</strong> into your theme footer or using a plugin like <em>Simple Custom CSS and JS</em> / <em>WPCode</em>.</li>
                </ol>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-2">
                <strong className="text-[#60a5fa] block text-base">Method B: Elementor Widget</strong>
                <p className="text-xs sm:text-sm text-slate-300">
                  Drag an <strong>HTML Widget</strong> onto a full-width section and paste the HTML snippet. In the page settings, add the CSS into the Custom CSS area.
                </p>
              </div>

              <div className="p-3 bg-[#1769E0]/15 border border-[#1769E0]/30 rounded-xl text-xs text-blue-200">
                💡 <strong>Zero Conflict Guarantee:</strong> All class names are isolated with <code className="text-white">.baizearn-*</code> so your WordPress theme styles will not conflict!
              </div>
            </div>
          ) : (
            <pre className="whitespace-pre-wrap select-all font-mono text-[11px] leading-relaxed text-slate-300">
              {currentCode}
            </pre>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-[#071426] border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
          <span>BaizEarn WordPress Home Page Package</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
