export const heroContent = {
  /** 主张，Hero 里字号最大的一句中文。展示文案不带句末句号 */
  motto: '拥抱技术，热爱生活',
  /** 补充：前半句说性格，后半句说领域，用逗号串成一句，避免行中出现句号 */
  lede: '想法很多，喜欢做些有趣的事情，关注 AI 应用和产品',
  /**
   * 英文格言放在页脚而不是 motto 下面：两者是同一句话的中英版本，
   * 紧挨着会读成一对翻译，正是要避开的镜像文案。
   */
  signoff: 'Powered by Tech, Inspired by Life.',
} as const;
