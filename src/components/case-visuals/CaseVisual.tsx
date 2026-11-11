import { Stage } from '../../vendor/stageshow/kit/stage';
import { Window, Bar } from '../../vendor/stageshow/kit/window';
import { Field } from '../../vendor/stageshow/kit/controls/field';
import { Button } from '../../vendor/stageshow/kit/controls/button';
import './case-visual.css';

export type CaseVisualType = 'expo' | 'yahsin' | 'mysore' | 'gaia' | 'sunbot';

/** A decorative product study based on each project's public homepage. */
export default function CaseVisual({ type }: { type: CaseVisualType }) {
  return <div className={`case-art case-art--${type}`} aria-hidden="true">
    <Stage width={400} height={300} compact={{ below: 400, width: 358, height: 300 }} className="case-art-stage">
      {() => <Window title={type === 'expo' ? '2026 台東博覽會' : type === 'yahsin' ? '雅信翻譯社' : type === 'mysore' ? 'Mysore Taipei' : type === 'sunbot' ? 'AI 孫主任' : '大地女力'} className="case-art-window">
        {type === 'expo' ? <div className="case-art-expo">
          <div className="case-art-expo-kicker">2026 TAITUNG EXPO</div>
          <div className="case-art-expo-title">台東博覽會</div>
          <div className="case-art-expo-line">— Slow for life</div>
          <div className="case-art-expo-date">07/03 — 08/20</div>
          <div className="case-art-expo-tags"># 台東藍　# 慢經濟</div>
        </div> : type === 'gaia' ? <div className="case-art-gaia"><img src={`${import.meta.env.BASE_URL.replace(/\/$/, '')}/images/gaia/campaign-home.png`} alt="" /></div> : type === 'sunbot' ? <div className="case-art-sunbot"><img src={`${import.meta.env.BASE_URL.replace(/\/$/, '')}/images/sunbot/campaign-home.png`} alt="" /></div> : type === 'mysore' ? <div className="case-art-mysore"><div className="case-art-mysore-kicker">THE YOGA SHALA</div><div className="case-art-mysore-title">Mysore Taipei</div><div className="case-art-mysore-subtitle">Ashtanga Yoga</div><div className="case-art-mysore-nav">NEWS　 /　 MOON DAYS</div></div> : <div className="case-art-yahsin">
          <div className="case-art-yahsin-title">海牙認證線上服務</div>
          <div className="case-art-yahsin-subtitle">開始您的線上申請</div>
          <div className="case-art-fields"><Field label="姓名" value="" placeholder="輸入姓名" /><Field label="Email" value="" placeholder="輸入 Email" /></div>
          <div className="case-art-upload"><span>文件</span><Button size="small">選擇檔案</Button></div>
          <Bar w="100%" h={22} r={4} tone={3}/>
        </div>}
      </Window>}
    </Stage>
  </div>;
}
