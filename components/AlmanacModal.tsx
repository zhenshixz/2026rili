import React, { useEffect, useState } from 'react';
import { X, Sparkles, AlertCircle, CheckCircle } from 'lucide-react';
import { CalendarDay, AlmanacData } from '../types';
import { fetchAlmanacData } from '../services/geminiService';

interface AlmanacModalProps {
  day: CalendarDay | null;
  onClose: () => void;
}

const AlmanacModal: React.FC<AlmanacModalProps> = ({ day, onClose }) => {
  const [data, setData] = useState<AlmanacData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [apiKeyMissing, setApiKeyMissing] = useState(false);

  useEffect(() => {
    if (day) {
      loadAlmanac(day.date);
    } else {
      setData(null);
      setError(null);
    }
  }, [day]);

  const loadAlmanac = async (date: Date) => {
    setLoading(true);
    setError(null);
    setApiKeyMissing(false);
    try {
      const result = await fetchAlmanacData(date);
      setData(result);
    } catch (err: any) {
      if (err.message && err.message.includes("API Key")) {
        setApiKeyMissing(true);
      } else {
        setError("星象模糊，请稍后再试。");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleApiKeySelect = async () => {
    if (window.aistudio && window.aistudio.openSelectKey) {
        await window.aistudio.openSelectKey();
        if (day) loadAlmanac(day.date); // Retry
    } else {
        alert("在此环境中无法选择 API 密钥。");
    }
  }


  if (!day) return null;

  const dateStr = day.date.toLocaleDateString('zh-CN', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-[#fffbf0] w-full max-w-lg rounded-xl shadow-2xl overflow-hidden relative flex flex-col max-h-[90vh]"
        style={{ backgroundImage: 'radial-gradient(#e7e5e4 1px, transparent 1px)', backgroundSize: '20px 20px' }}
      >
        {/* Header */}
        <div className="bg-red-700 text-amber-50 p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10 font-serif-sc text-9xl select-none pointer-events-none">
            福
          </div>
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
          
          <h2 className="text-3xl font-serif-sc font-bold mb-1">{dateStr}</h2>
          <div className="flex items-center space-x-2 text-red-100 font-serif-sc">
            <span>农历 {day.lunarMonth}月{day.lunarDate.replace(day.lunarMonth+'月', '')}</span>
            {day.solarTerm && <span>• {day.solarTerm}</span>}
            {day.holiday && <span className="bg-amber-400 text-red-900 text-xs px-2 py-0.5 rounded font-bold">{day.holiday}</span>}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <div className="w-12 h-12 border-4 border-red-200 border-t-red-600 rounded-full animate-spin"></div>
              <p className="text-stone-500 font-serif-sc animate-pulse">正在推演今日宜忌...</p>
            </div>
          ) : apiKeyMissing ? (
             <div className="text-center py-8">
                <AlertCircle size={48} className="mx-auto text-amber-600 mb-4" />
                <h3 className="text-xl font-bold text-stone-800 mb-2">需要 API 密钥</h3>
                <p className="text-stone-600 mb-6">要生成 AI 黄历建议，请选择 Google Gemini API 密钥。</p>
                <button 
                    onClick={handleApiKeySelect}
                    className="bg-red-600 text-white px-6 py-2 rounded-full font-medium hover:bg-red-700 transition-colors shadow-lg font-serif-sc"
                >
                    选择 API 密钥
                </button>
             </div>
          ) : error ? (
            <div className="text-center py-12 text-stone-500">
              <p>{error}</p>
            </div>
          ) : data ? (
            <div className="space-y-6">
              
              {/* Quote & Desc */}
              <div className="text-center space-y-3 pb-6 border-b border-stone-200/60">
                <p className="font-serif-sc text-stone-600 italic text-lg leading-relaxed">"{data.dailyQuote}"</p>
                <p className="text-stone-500 text-sm font-serif-sc">{data.description}</p>
              </div>

              {/* Yi / Ji Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-emerald-50/50 border border-emerald-100 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-serif-sc font-bold text-lg">宜</div>
                    <span className="text-emerald-800 font-bold uppercase text-xs tracking-wider">诸事皆宜</span>
                  </div>
                  <ul className="space-y-2">
                    {data.auspicious.map((item, i) => (
                      <li key={i} className="flex items-start text-emerald-900 font-medium font-serif-sc">
                        <CheckCircle size={14} className="mt-1 mr-2 text-emerald-500/50" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-rose-50/50 border border-rose-100 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center font-serif-sc font-bold text-lg">忌</div>
                    <span className="text-rose-800 font-bold uppercase text-xs tracking-wider">诸事不宜</span>
                  </div>
                  <ul className="space-y-2">
                    {data.inauspicious.map((item, i) => (
                      <li key={i} className="flex items-start text-rose-900 font-medium font-serif-sc">
                        <X size={14} className="mt-1 mr-2 text-rose-500/50" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>
          ) : null}
        </div>
        
        {/* Footer */}
        <div className="p-4 bg-stone-100 border-t border-stone-200 text-center">
            <div className="flex items-center justify-center text-xs text-stone-400 gap-1 font-serif-sc">
                <Sparkles size={12} />
                <span>AI 生成 • 传统黄历风格</span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AlmanacModal;