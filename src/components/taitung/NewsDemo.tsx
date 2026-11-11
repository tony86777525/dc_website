import { useState } from 'react';
import { Stage } from '../../vendor/stageshow/kit/stage';
import { Window, Text } from '../../vendor/stageshow/kit/window';
import { Field } from '../../vendor/stageshow/kit/controls/field';
import { Button } from '../../vendor/stageshow/kit/controls/button';
import { States } from '../../vendor/stageshow/kit/motion/States';
import type { Act } from '../../vendor/stageshow/kit/act';
import './news.css';
type Scene={link:string; saved:boolean; content:boolean};
export default function NewsDemo(){
const [external,setExternal]=useState(false);const [revision,replay]=useState(0);
const initial:Scene={link:'',saved:false,content:false};
const poster:Scene={link:external?'https://www.taitung.gov.tw/…':'',saved:true,content:!external};
async function script(a:Act<Scene>){await a.wait(1000);a.mark('edit');if(external){await a.click({at:'link'});await a.type('link','https://www.taitung.gov.tw/…',{interval:55});}else{await a.click({at:'content'});a.put({content:true});}await a.wait(2000);a.mark('save');await a.click({at:'save'});a.put({saved:true});await a.wait(1400);await a.move({at:'save',x:.5,y:1.8});a.mark('result');await a.wait(4500);}
return <div className="news-demo"><div className="news-controls" aria-label="選擇展示流程"><button aria-pressed={!external} onClick={()=>{setExternal(false);replay(revision+1)}}>站內詳細頁</button><button aria-pressed={external} onClick={()=>{setExternal(true);replay(revision+1)}}>外部文章連結</button><button onClick={()=>replay(revision+1)}>重新播放 ↻</button></div><div aria-hidden="true"><Stage key={`${external}-${revision}`} width={720} height={370} compact={{below:560,width:358,height:330}} initial={initial} poster={poster} script={script} play="once" cursor={{at:{x:280,y:100}}} tokens={{'--ss-accent':'#d97706'}} className="tt-news">{s=><Window title="最新消息 / 編輯" className="tt-window"><div className="tt-form"><div className="tt-heading">台東博覽會 · 最新消息</div><Field label="最新消息卡片導向連結" value={s.link} focused={external&&!s.saved} data-target="link"/><div className="tt-content"><Text className="tt-label">消息內容</Text><div className="tt-body"><States value={s.content?'filled':'empty'} states={{empty:<Button data-target="content">加至 消息內容</Button>,filled:<Text>展覽資訊、活動內容與參觀說明。</Text>}}/></div></div><div className="tt-save"><Button variant="primary" data-target="save">{s.saved?'已儲存（示意）':'儲存'}</Button></div><div className="tt-result"><States value={s.saved?'done':'wait'} states={{wait:<Text>完成編輯後，儲存消息設定。</Text>,done:<Text>{external?'前台卡片 → 指定的外部文章網站':'前台卡片 → 本站消息詳細頁'}</Text>}}/></div></div></Window>}</Stage></div><p className="note" role="status">{external?'外部連結模式：填寫指定網址，訪客由消息卡片前往外部文章。':'站內內容模式：填寫消息內容，訪客由消息卡片閱讀本站詳細頁。'} 動畫為依錄影簡化重建的操作示意，不連接正式後台。</p></div>
}
