import { useState } from 'react';
import { Stage } from '../../vendor/stageshow/kit/stage';
import { Window } from '../../vendor/stageshow/kit/window';
import { Button } from '../../vendor/stageshow/kit/controls/button';
import { Card } from '../../vendor/stageshow/kit/parts/Card';
import type { Act } from '../../vendor/stageshow/kit/act';
import './frontend-demo.css';

type Scene = { category: number };
const initial: Scene = { category: 0 };
const poster: Scene = { category: 2 };
const stories = [
  { image: '01M0HW5JB9KEKBREVP7AV6TCYT.webp', date: '2026.08.21', title: '台東博覽會主展期圓滿落幕' },
  { image: '01M0HW2S7KG0YXC0D47NT07Q1J.webp', date: '2026.08.21', title: '臺灣國際熱氣球嘉年華' },
  { image: '01M0EYNBRH96PZPSCPQ2QRQ5CG.webp', date: '2026.08.20', title: '潮界帶・台東青年夏夜' },
];
async function script(a: Act<Scene>) {
  await a.wait(1000);
  a.mark('category');
  await a.click({ at: 'events', x: .5, y: .5 });
  a.put({ category: 2 });
  await a.wait(850);
  await a.move({ at: 'events', x: 1.2, y: 2.2 });
  a.mark('result');
  await a.wait(6000);
}

export default function FrontendDemo() {
  const [revision, setRevision] = useState(0);
  return <div className="frontend-showcase">
    <div className="frontend-caption"><span>FRONTEND / NEWS</span><button type="button" onClick={() => setRevision(n => n + 1)}>重新播放 ↻</button></div>
    <div aria-hidden="true"><Stage key={revision} width={800} height={480} compact={{ below: 600, width: 358, height: 330 }} initial={initial} poster={poster} script={script} play="once" cursor={{ at: { x: 670, y: 150 } }} tokens={{ '--ss-accent': '#063b94' }} className="expo-stage">
      {(scene) => <Window url="taitungexpo2026.com.tw / news" className="expo-window"><div className="expo-page">
        <div className="expo-header"><span>台東博覽會</span><span>2026 TAITUNG EXPO</span></div>
        <div className="expo-heading">最新消息</div>
        <div className="expo-filters">{['ALL','官方公告','活動消息','媒體報導'].map((name, i) => <Button key={name} variant={scene.category === i ? 'primary' : 'secondary'} size="large" data-target={i === 2 ? 'events' : undefined}>{name}</Button>)}</div>
        <div className="expo-stories" data-category={scene.category}>{stories.map((story) => <Card key={story.image} pad="small" gap={8} className="expo-story"><img src={`https://taitungexpo2026.com.tw/storage/article-thumbnails/${story.image}`} alt="" /><div className="expo-date">{story.date}</div><div className="expo-story-title">{story.title}</div><div className="expo-read">READ MORE ↗</div></Card>)}</div>
      </div></Window>}
    </Stage></div>
    <p className="frontend-note">前台分類與消息卡片的重建動畫。畫面為操作示意；縮圖與消息內容取自台東博覽會公開網站。</p>
    <noscript><p>動畫展示最新消息列表：可按分類瀏覽，並透過消息卡片閱讀完整文章。</p></noscript>
  </div>;
}
