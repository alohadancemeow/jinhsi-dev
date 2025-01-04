export const YukinaConfig = {
  Title: "Jinhsi Main",
  SubTitle: "Jinhsi Main Demo Site", // doesn't work when UseHitokotoSubtitle is true
  BrandTitle: "Jinhsi 今汐",
  UseHitokotoSubtitle: true,
  Description: "Demo Site",
  IconfontURL: "//at.alicdn.com/t/c/font_4507154_ptdxadr7249.css",
  Avatar: "https://s2.loli.net/2025/01/04/qG1yX5gAw9nKmua.png",

  Username: "Jinhsi 今汐",
  Sign: "The magistrate of Jinzhou.",
  SocialLinks: [
    {
      icon: "ic-github",
      link: "https://github.com",
    },
    {
      icon: "ic-bilibili",
      link: "https://space.bilibili.com",
    },
    {
      icon: "ic-ncm",
      link: "https://music.163.com",
    },
  ],

  EnableBanner: true,

  // NOT IMPLEMENTED
  SlugGenerateMode: "HASH", // 'RAW' | 'HASH'

  HitokotoSettings: {
    // see: https://developer.hitokoto.cn/sentence/#%E8%AF%B7%E6%B1%82%E5%9C%B0%E5%9D%80
    url: "international.v1.hitokoto.cn",
    // see: https://developer.hitokoto.cn/sentence/#%E5%8F%A5%E5%AD%90%E7%B1%BB%E5%9E%8B-%E5%8F%82%E6%95%B0
    content_types: ["a", "b"],
  },
};
