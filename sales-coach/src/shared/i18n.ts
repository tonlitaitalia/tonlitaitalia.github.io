export type Locale = "en" | "zh";

export const t = {
  en: {
    login: "Login",
    email: "Email",
    password: "Password",
    leads: "Leads",
    newLead: "New lead",
    coach: "Generate coaching",
    quota: "AI usage today",
    admin: "Admin",
    knowledge: "Knowledge base",
    logout: "Logout",
    markSent: "Mark as sent",
    copy: "Copy reply",
    globalLock: "AI is temporarily locked because the free daily allocation has been reached. Existing conversations remain available."
  },
  zh: {
    login: "登录",
    email: "邮箱",
    password: "密码",
    leads: "客户线索",
    newLead: "新建线索",
    coach: "生成销售建议",
    quota: "今日 AI 使用量",
    admin: "管理员",
    knowledge: "知识库",
    logout: "退出",
    markSent: "标记为已发送",
    copy: "复制回复",
    globalLock: "AI 暂时锁定，因为免费每日额度已用完。现有对话仍可查看。"
  }
} as const;
