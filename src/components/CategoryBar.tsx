import { useEffect, useState, type CSSProperties } from 'react';
import { Home, Wrench, Layers, UserRound, ListChecks, MessageCircle } from 'lucide-react';
import './category-bar.css';

const items = [
  { id: 'home', label: '首頁', icon: Home },
  { id: 'services', label: '服務', icon: Wrench },
  { id: 'work', label: '案例', icon: Layers },
  { id: 'about', label: '關於', icon: UserRound },
  { id: 'process', label: '流程', icon: ListChecks },
  { id: 'contact', label: '聯絡', icon: MessageCircle },
];

export default function CategoryBar({ color = '#0071e3' }: { color?: string }) {
  const [active, setActive] = useState('home');
  useEffect(() => {
    if (!document.getElementById('home')) return;
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const center = window.innerHeight / 2;
        const current = items.map(item => ({ id: item.id, rect: document.getElementById(item.id)?.getBoundingClientRect() }))
          .find(({ rect }) => rect && rect.top <= center && rect.bottom > center);
        if (current) setActive(current.id);
      });
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => { window.removeEventListener('scroll', update); window.removeEventListener('resize', update); cancelAnimationFrame(frame); };
  }, []);
  return <nav className="category-bar" aria-label="主要導覽" style={{ '--category-accent': color } as CSSProperties}>
    {items.map(({ id, label, icon: Icon }) => <a key={id} href={`${import.meta.env.BASE_URL.replace(/\/$/, '')}/#${id}`} className="category-link" aria-current={active === id ? 'location' : undefined}>
      <Icon size={20} strokeWidth={2} aria-hidden="true" /><span>{label}</span>
    </a>)}
  </nav>;
}
