// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

// Site title and description
export const SITE_TAB = " zzoce";
export const SITE_TITLE = "zzoce 🧊";
export const SITE_DESCRIPTION = "A blog template";
export const DATE_FORMAT = "ddd MMM DD YYYY";

// User profile information
export const USER_NAME = "zzoce";
export const USER_SITE = "https://www.zzoce.com/"
export const USER_AVATAR = "/image/zzoce.jpg";

// Server and transition settings
export const SERVER_URL = "https:// zzoce.com";

// Menu items for navigation
export const menuItems = [
  { id: "home", text: "首页", href: "/", svg: "home", target: "_self" }, // Home page
  { id: "about", text: "关于", href: "/about", svg: "about", target: "_self" }, // About page
  {
    id: "blog",
    text: "博客",
    href: "/blog",
    svg: "blog",
    target: "_self",
    subItems: [
      {
        id: "all",
        text: "全部",
        href: "/blog",
        svg: "post",
        target: "_self",
      }, // All blog
      {
        id: "笔记",
        text: "笔记",
        href: "/blog/categories/笔记",
        svg: "cube",
        target: "_self",
      }, // Technology category
      {
        id: "日常",
        text: "日常",
        href: "/blog/categories/日常",
        svg: "heart",
        target: "_self",
      }, // Life category
      {
        id: "杂谈",
        text: "杂谈",
        href: "/blog/categories/杂谈",
        svg: "cube",
        target: "_self",
      }, // Technology category
    ],
  }, // Blog page with sub-items
  {
    id: "project",
    text: "项目",
    href: "/project",
    svg: "project",
    target: "_self",
  }, // Projects page
  {
    id: "friend",
    text: "友情链接",
    href: "/friend",
    svg: "friend",
    target: "_self",
  }, // Friends page
  {
    id: "contact",
    text: "邮箱",
    href: "mailto:zzoce9597@gmail.com", // Contact email
    target: "_blank", // Open in a new tab
    svg: "contact",
  },
];

// Social media and contact icons
export const socialIcons = [
  {
    href: "https://afdian.net/a/saroprock",
    ariaLabel: "Support my work",
    title: "Support my work",
    svg: "support",
  },
  {
    href: "https://github.com/EveSunMaple",
    ariaLabel: "Github",
    title: "Github",
    svg: "github",
  },
  {
    href: "https://space.bilibili.com/438392347",
    ariaLabel: "BiliBili",
    title: "BiliBili",
    svg: "bilibili",
  },
  {
    href: "/rss.xml",
    ariaLabel: "RSS Feed",
    title: "RSS Feed",
    svg: "rss",
  },
];
