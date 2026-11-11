# 個人接案網站

Astro 靜態網站，React 僅用於 stageshow 動態展示。繁體中文、響應式版面。

```sh
npm install
npm run dev
npm run build
npm run preview
```

- `/`：介紹、服務、精選展示、合作流程、聯絡資訊。
- `/work/demo/`：表單驗證示意，並非客戶案例。
- `src/data/site.ts`：個人資料、服務、Email 與 LINE。空聯絡資料不產生連結。
- `src/pages/work/demo.astro`：案例內容範本。新增案例可新增對應頁面，並在首頁加入入口。
- `src/components/Demo.tsx`：改編 stageshow 的 form-error 範例；kit 保留於 `src/vendor/stageshow/kit`。

建置輸出為 `dist/`，可部署到靜態主機。正式上線前補齊姓名、自介、真實案例與公開授權、聯絡方式及網域。無表單收件、資料庫、追蹤服務或客戶資料傳輸。

展示資料為虛構，實際作品尚待提供。減少動態效果時由 stageshow 呈現完成畫面；停用 JavaScript 時保留文字流程。

動畫檢查：開啟 dev server 後執行

```sh
node scripts/stageshow/film.mjs http://127.0.0.1:4321/work/demo/ --gate --out artifacts/demo.png --every 1000 --count 14
```
