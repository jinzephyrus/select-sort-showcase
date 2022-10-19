import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { SelectSortShowcase } from "./components/SelectSortShowcase";

if (document.documentElement.clientWidth < 530) {
  document
    .querySelector("meta[name=viewport]")
    .setAttribute("content", "width=device-width, initial-scale=0.6");
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* 字体 */}
    <link
      rel='stylesheet'
      href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'
    />
    {/* 图标 */}
    <link
      rel='stylesheet'
      href='https://fonts.googleapis.com/icon?family=Material+Icons'
    />
    {/* 主页面 */}
    <section className='container'>
      <SelectSortShowcase />
    </section>
  </React.StrictMode>
);
