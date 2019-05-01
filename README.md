# Lifeforfun
記錄著你周遭美好事
後續會新增用戶之間積分排行系統

## QUICK START  
npm i && npm start  

## Preview
Deploy on heroku  
You can check out [live preview](https://lifeforfun.herokuapp.com/)  
Heroku免費流量 部分檔案會讀不到Q  
介面都還在開發中 包括LOGO、導覽影音圖片等。  

# 整體架構
## 導覽頁  
Bootstrap4 template 版型  
Jquery/Css3 互動  
Nodejs/Server、Express/Router (index.js)  
Firebase Login Logout  
FB/Google/Github/Youtube API  
Heroku/GoogleCloud  
GoogleAnalytics 目前平均日流量3 Q  

## 會員頁
React => [基本架構](https://github.com/LinX9581/React-Webpack4-babel7)  
React-Router-Dom Fontend Router  
Nodejs/Express Backend Router  
MongoDB  
FB/Google/Github/Youtube API  
GoogleCloud  
...  
...  
## Android/IOS
Expo 跨平台Android/IOS  
Nativebase => [基本架構](https://github.com/LinX9581/NativeBaseInit)  
React-native-router-flux Router  
...  
...  
# 主功能頁  
## index.html  
App 介紹、下載、使用流程
...  
...  

## chat.html  
即時聊天室 分成所有頻聊天、私人聊天，記錄存放Mongodb。  
較詳細介紹可前往 [node-realtime-chatroom](https://github.com/LinX9581/node-realtime-chatroom)  

目前還沒和登入頁面做連動、只能暫時性建立使用者名稱進行聊天  
且動態新增聊天介面很吃流量，佈署上去常常造成Css跑走Q，往後會用Webpack打包，或者移至GCD。  

## login.html
可以做簡易註冊、登入、第三方登入，較詳細介紹可前往 [firebase-login-validate](https://github.com/LinX9581/firebase-login-validate)  
只是信箱驗證、登入後續處理還沒實作Q  

## about.html
...  
...
