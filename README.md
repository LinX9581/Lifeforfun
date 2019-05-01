# Lifeforfun
記錄著你周遭美好事
後續會新增用戶之間積分排行系統

## QUICK START  
npm i && npm start  

## Preview
Deploy on heroku  
You can check out [live preview](https://lifeforfun.herokuapp.com/)  

## 主功能頁  
### index.html  
App 介紹、下載、使用流程等等  

### chat.html  
即時聊天室 分成所有頻聊天、私人聊天，記錄存放Mongodb。  
較詳細介紹可前往 [node-realtime-chatroom](https://github.com/LinX9581/node-realtime-chatroom)  

目前還沒和登入頁面做連動、只能暫時性建立使用者名稱進行聊天  
且動態新增聊天介面很吃流量，佈署上去常常造成Css跑走Q，往後會用Webpack打包，或者移至GCD。  

### login.html
可以做簡易註冊、登入、第三方登入，較詳細介紹可前往 [firebase-login-validate](https://github.com/LinX9581/firebase-login-validate)  
只是信箱驗證、登入後續處理還沒實作Q  

### 會員瀏覽介面 (還未實做
預計使用React開發

## 行動端
採用 React-Native開發  
會先把和網頁對應功能實做出來Q  
