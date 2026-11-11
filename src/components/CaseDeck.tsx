import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, X } from 'lucide-react';
import './case-deck.css';
import CaseVisual, { type CaseVisualType } from './case-visuals/CaseVisual';

const cases: { id: CaseVisualType; title: string; tags: string; detail: string; href: string }[] = [
  { id: 'expo', title: '台東博覽會', tags: '活動官網 · 消息編輯 · 導覽預約', detail: '以 Laravel、MySQL 與 FilamentPHP 建立的網站功能。介紹最新消息管理與展覽導覽預約的功能流程。', href: '/work/taitung-expo/' },
  { id: 'yahsin', title: '雅信翻譯社', tags: '線上申請 · Google Drive · 第三方付款', detail: '整合線上申請、文件上傳、第三方付款與後台訂單管理。', href: '/work/yahsin/' },
  { id: 'mysore', title: 'Mysore Taipei', tags: '形象官網 · 消息編輯 · Excel 上傳', detail: '瑜伽學校形象官網，提供最新消息文字編輯與 Moon Days Excel 上傳。', href: '/work/mysore-taipei/' },
  { id: 'gaia', title: '大地女力', tags: '活動投票 · LINE 登入 · 資料統計', detail: '串接 LINE 帳號授權與 Google Sheets，整理候選人投票資料。', href: '/work/gaia-2022/' },
  { id: 'sunbot', title: 'AI 孫主任', tags: 'AI 對話 · 序號兌換 · 活動網站', detail: '串接第三方 AI 對話 API，並提供書展現場序號兌換使用次數。', href: '/work/sunbot/' },
];

export default function CaseDeck({ radius = 28, blur = 8 }: { radius?: number; blur?: number }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const close = useRef<HTMLButtonElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const dialog = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const selected = cases.find(item => item.id === openId);
  useEffect(() => {
    if (!openId) return;
    const old = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    close.current?.focus();
    function key(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpenId(null);
      if (e.key === 'Tab' && dialog.current) {
        const links = Array.from(dialog.current.querySelectorAll<HTMLElement>('a[href],button:not([disabled])'));
        if (!links.length) return;
        if (e.shiftKey && document.activeElement === links[0]) { e.preventDefault(); links[links.length - 1].focus(); }
        else if (!e.shiftKey && document.activeElement === links[links.length - 1]) { e.preventDefault(); links[0].focus(); }
      }
    }
    document.addEventListener('keydown', key);
    return () => { document.body.style.overflow = old; document.removeEventListener('keydown', key); opener.current?.focus(); };
  }, [openId]);
  const transition = reduce ? { duration: 0 } : { type: 'spring' as const, stiffness: 320, damping: 32, mass: .9 };
  return <div className="deck">
    <div className="deck-cards">{cases.map(item => <motion.button key={item.id} className={`deck-card deck-card--${item.id}`} layoutId={`case-${item.id}`} transition={transition} onClick={event => { opener.current = event.currentTarget; setOpenId(item.id); }} aria-haspopup="dialog" aria-label={`查看${item.title}案例`} whileHover={reduce ? undefined : { y: -6 }} whileTap={reduce ? undefined : { scale: .98 }}>
      <CaseVisual type={item.id} /><span className="deck-overlay"/><span className="deck-label"><small>WEB DEVELOPMENT</small><strong>{item.title}</strong><span>{item.tags} ↗</span></span>
    </motion.button>)}</div>
    <p className="deck-hint">點選卡片，查看案例</p>
    <AnimatePresence>{selected && <div className="deck-modal">
      <motion.div className="deck-backdrop" style={{ backdropFilter: `blur(${blur}px)` }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpenId(null)}/>
      <motion.div ref={dialog} className="deck-panel" role="dialog" aria-modal="true" aria-labelledby="case-title" layoutId={`case-${selected.id}`} transition={transition} style={{ borderRadius: radius }}>
        <div className={`deck-visual deck-visual--${selected.id}`}>
          <CaseVisual type={selected.id} /><div className="deck-visual-title"><small>CASE / WEBSITE</small><h3 id="case-title">{selected.title}</h3></div>
          <button ref={close} className="deck-close" aria-label="關閉案例" onClick={() => setOpenId(null)}><X size={20}/></button>
        </div>
        <motion.div className="deck-content" initial={{ opacity: 0, y: reduce ? 0 : 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}><p>{selected.detail}</p><div className="deck-meta">{selected.tags}</div><a href={`${import.meta.env.BASE_URL.replace(/\/$/, '')}${selected.href}`}>查看案例介紹 <ArrowUpRight size={17}/></a></motion.div>
      </motion.div>
    </div>}</AnimatePresence>
  </div>;
}
