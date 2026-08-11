import type { Language } from "@/types";
import { milestones } from "./milestones";
export const copy = {
  en: {
    tagline: "PRODUCTION • KAIZEN • TECHNOLOGY",
    subtitle: "From Production Floor\nto Digital Innovation.",
    start: "START THE JOURNEY",
    quick: "QUICK PROFILE",
    projects: "Projects",
    cv: "Download CV",
    sound: "Sound",
    quality: "Quality",
    journey: "Journey progress",
    auto: "Auto Journey",
    drive: "Drive Mode · Soon",
    scroll: "Scroll to drive",
    unlocked: "Skills unlocked",
    destination: "DESTINATION · SMART FACTORY",
    finalTitle: "Build systems that\nmove people forward.",
    promise:
      "I understand the factory floor. I improve the process.\nI build the system. I teach others to use it.",
    contact: "Contact me",
    github: "GitHub",
    close: "Close",
    profileTitle: "Production mind.\nDigital builder.",
  },
  vi: {
    tagline: "SẢN XUẤT • KAIZEN • CÔNG NGHỆ",
    subtitle: "Từ nhà máy sản xuất\nđến đổi mới số.",
    start: "BẮT ĐẦU HÀNH TRÌNH",
    quick: "HỒ SƠ NHANH",
    projects: "Dự án",
    cv: "Tải CV",
    sound: "Âm thanh",
    quality: "Chất lượng",
    journey: "Tiến độ hành trình",
    auto: "Hành trình tự động",
    drive: "Tự lái · Sắp có",
    scroll: "Cuộn để lái xe",
    unlocked: "Kỹ năng đã mở khóa",
    destination: "ĐÍCH ĐẾN · NHÀ MÁY THÔNG MINH",
    finalTitle: "Xây hệ thống\nđưa con người tiến lên.",
    promise:
      "Tôi hiểu nhà máy. Tôi cải tiến quy trình.\nTôi xây dựng hệ thống. Tôi hướng dẫn mọi người sử dụng.",
    contact: "Liên hệ",
    github: "GitHub",
    close: "Đóng",
    profileTitle: "Tư duy sản xuất.\nKiến tạo số.",
  },
  zh: {
    tagline: "生产 • 改善 • 科技",
    subtitle: "从生产车间\n走向数字创新。",
    start: "开始旅程",
    quick: "快速履历",
    projects: "项目",
    cv: "下载简历",
    sound: "声音",
    quality: "画质",
    journey: "旅程进度",
    auto: "自动旅程",
    drive: "驾驶模式 · 即将推出",
    scroll: "滚动以驾驶",
    unlocked: "已解锁技能",
    destination: "终点 · 智慧工厂",
    finalTitle: "构建系统，\n推动人们前进。",
    promise: "我了解生产现场。我改善流程。\n我构建系统。我教会他人使用。",
    contact: "联系我",
    github: "GitHub",
    close: "关闭",
    profileTitle: "生产思维。\n数字创造者。",
  },
} as const;
type L = [string, string, string[]];
const vi: L[] = [
  [
    "Quản lý & Điều phối Sản xuất – Chất lượng",
    "Phụ trách quản lý và điều phối sản xuất và chất lượng nhà xưởng (~40 máy Laser Cutting CNC và ~200 nhân sự).",
    [
      "Chuẩn hóa thao tác, Check Sheet, Pareto và Q-Point → kiểm soát lỗi nghiêm trọng dưới 1%",
      "Điều hành QCC/Kaizen, phân tích 5W1H–5 Why → giảm khoảng 30% lãng phí vận hành",
      "Triển khai TPM, 5S và Safety Dojo → giảm 50% sự cố thiết bị, rút ngắn 35% thời gian đào tạo hội nhập",
      "Điều độ sản xuất theo Plan/Kanban; cân đối nhân lực–vật tư và quản trị báo cáo hiệu suất",
    ],
  ],
  [
    "Phát triển Phần mềm · GPA 3.9/4.0",
    "Hành trình chuyển đổi nghề nghiệp có chủ đích từ vận hành nhà máy sang kỹ nghệ phần mềm—kết hợp đào tạo chính quy, nghiên cứu độc lập, sản phẩm thực tế, năng lực lãnh đạo và kỷ luật tự học liên tục.",
    [
      "Chuyển hướng từ sản xuất sang phát triển phần mềm",
      "Xây nền tảng có hệ thống với Java, cơ sở dữ liệu và công nghệ web",
      "Đưa tư duy Kaizen vào quy trình số và sản phẩm phần mềm",
      "Kết hợp học chính quy với dự án thực hành ngay từ năm đầu",
    ],
  ],
  [
    "Chuyên viên Tổ chức & Quản lý Sự kiện",
    "Mở rộng năng lực thương mại và điều hành thông qua việc thắng thầu, lập kế hoạch và triển khai trọn vẹn hội nghị–gala quy mô 2.000 khách, từ đàm phán nhà cung cấp đến vận hành hiện trường.",
    [
      "Ngân sách khoảng 800 triệu VNĐ",
      "98% khách tham dự hài lòng",
      "Giảm 20% chi phí tổ chức",
      "Điều phối đa bộ phận dưới áp lực cao",
    ],
  ],
  [
    "Lập trình viên Java Full-stack",
    "Thiết kế và phát triển nền tảng video Java Web theo kiến trúc phân lớp DAO–service–controller, bao phủ khám phá nội dung, tương tác người dùng, quản trị vận hành và giao tiếp thời gian thực.",
    [
      "Java 21 · Servlet 6 · JPA 3.1 · Hibernate 6.4 · SQL Server",
      "WebSocket chat · yêu thích · lịch sử xem · chia sẻ",
      "BCrypt, bộ lọc xác thực và email khôi phục mật khẩu",
      "Dashboard JSP/JSTL, biểu đồ và quản trị nội dung",
    ],
  ],
  [
    "Kiến trúc sư Giải pháp · Lập trình viên Full-stack & Bảo mật",
    "Khảo sát, thiết kế, triển khai và nghiệm thu hai giải pháp số hóa cho Ban Chỉ huy Quân sự phường Hồng Bàng: hệ thống quản lý công việc theo vai trò trên mạng LAN và USB Sentry bảo vệ thiết bị đầu cuối Windows. Cả hai sản phẩm được nghiệm thu chính thức với mức độ hài lòng 100%.",
    [
      "Vòng đời công việc: giao việc, xác nhận, báo cáo hoàn thành và theo dõi trực quan",
      "Phát hiện USB/thiết bị di động bằng drive polling và WMI/WPD",
      "Triển khai portable ưu tiên mạng LAN với SQLite và Windows JAR độc lập",
      "Chuẩn hóa yêu cầu nghiệp vụ quân sự, đào tạo người dùng và nghiệm thu đầy đủ hai sản phẩm",
    ],
  ],
  [
    "Lập trình viên Sản phẩm Full-stack",
    "Thiết kế hệ thống thương mại điện tử full-stack với luồng nghiệp vụ xuyên suốt từ catalog, tồn kho SKU và checkout đến vận hành đơn hàng, báo cáo quản trị và thanh toán COD/VNPAY.",
    [
      "Java 21 · Spring Boot 4.0.1 · SQL Server",
      "Vue 3.5 · Vite 7 · Axios · Chart.js",
      "JWT/Spring Security · luồng khách hàng và quản trị",
      "SKU/options, tồn kho, lịch sử giá, COD và VNPAY",
    ],
  ],
  [
    "Chủ nhiệm CLB IT · Mentor · Người xây dựng",
    "Chuyển hóa kiến thức cá nhân thành năng lực cộng đồng thông qua điều hành CLB, tổ chức workshop kỹ thuật, cố vấn dự án thực hành và xây dựng công cụ học tập tương tác như SQL Quiz.",
    [
      "Điều phối hoạt động CLB IT",
      "Xây dựng SQL Quiz bằng Vue 3",
      "Hướng dẫn dự án lập trình thực tế",
      "Chia sẻ lộ trình học tập có cấu trúc",
    ],
  ],
  [
    "Trưởng nhóm · Kiến trúc sư Giải pháp",
    "Khởi xướng định hướng sản phẩm và dẫn dắt nhóm 5 thành viên, đồng thời trực tiếp đảm nhiệm khoảng 60% khối lượng—từ kiến trúc giải pháp, kỹ thuật lõi đến trải nghiệm thương mại điện tử ứng dụng AI liên tục phát triển.",
    [
      "Tầm nhìn sản phẩm, lãnh đạo kỹ thuật và kiến trúc end-to-end",
      "Gemini tư vấn bám catalog, phản hồi streaming và AI phân tích kinh doanh",
      "Storefront/CMS quản trị động, hỗ trợ thời gian thực và trải nghiệm cấu hình được",
      "Checkout an toàn giao dịch, VNPAY, tự động hóa GHN, hoàn tiền và bảo hành",
    ],
  ],
  [
    "Giảng viên · Nhà giáo dục ứng dụng AI · Lập trình viên",
    "Kết hợp giảng dạy Robocon, lập trình và năng lực số với phát triển phần mềm/website cho khách hàng. AI tạo sinh được vận dụng như một copilot có kiểm soát trong nghiên cứu học liệu, thiết kế giáo án, tạo bài tập, phân hóa và phản hồi cá nhân hóa.",
    [
      "Robocon, lập trình và năng lực số",
      "Microsoft Office & Google Workspace",
      "Thiết kế bài giảng và cá nhân hóa bằng AI",
      "Phát triển phần mềm/website freelance",
    ],
  ],
  [
    "Sản xuất × Chất lượng × Phần mềm × AI",
    "Định hướng dài hạn là kết hợp hiểu biết hiện trường, Kaizen, dữ liệu chất lượng, tự động hóa phần mềm và AI có trách nhiệm thành các hệ thống nâng cao hiệu suất—đồng thời giúp con người tự tin làm chủ công nghệ.",
    [
      "Số hóa sản xuất và chất lượng",
      "Kaizen dựa trên dữ liệu & tự động hóa",
      "AI có trách nhiệm cho vận hành/đào tạo",
      "Ứng dụng công nghệ lấy con người làm trung tâm",
    ],
  ],
  [
    "Tốt nghiệp Phát triển Phần mềm · GPA 3.9/4.0",
    "Hoàn thành hành trình ba năm chuyển đổi từ vận hành sản xuất sang kỹ nghệ phần mềm, kết hợp thành tích học thuật, năng lực lãnh đạo, sản phẩm triển khai thực tế và phương pháp học tập có AI hỗ trợ một cách có kiểm soát.",
    [
      "GPA 3.9/4.0",
      "Ong vàng SP26 — Top 1 FPT Polytechnic Hải Phòng",
      "Sinh viên xuất sắc các kỳ",
      "Chủ nhiệm CLB IT · Gemini Certified Educator",
    ],
  ],
];
const zh: L[] = [
  [
    "生产与质量管理协调",
    "负责工厂生产与质量的管理及协调，覆盖约40台Laser Cutting CNC设备和约200名员工。",
    [
      "标准作业 · 检查表 · 帕累托 · Q-Point → 严重缺陷率低于1%",
      "QCC · 改善 · 5W1H/5Why → 运营浪费降低约30%",
      "TPM → 设备故障减少50% · Safety Dojo/5S → 入职培训提速35%",
      "使用生产计划/Kanban调度，并建立绩效看板、报告与数据归档体系",
    ],
  ],
  [
    "软件开发 · GPA 3.9/4.0",
    "从工厂运营走向数字产品开发的三年转型，将系统学习、校内项目、个人研发、真实部署、领导力与持续自学融为一体。",
    [
      "从制造业转向软件开发",
      "系统学习Java、数据库与Web工程基础",
      "将改善思维应用于数字化流程和软件产品",
      "从第一学年起结合课程学习与实践项目",
    ],
  ],
  [
    "活动组织与管理专员",
    "通过赢得并交付2,000人会议与晚宴，从供应商谈判到现场执行，拓展商业意识与领导能力。",
    ["预算约8亿越南盾", "满意度98%", "成本降低20%", "高压环境下跨团队协调"],
  ],
  [
    "Java全栈开发者",
    "使用Jakarta Servlet/JSP构建分层视频平台，涵盖内容发现、用户互动、后台管理与实时通信。",
    [
      "Java 21 · Servlet 6 · JPA 3.1 · Hibernate 6.4 · SQL Server",
      "WebSocket聊天 · 收藏 · 观看历史 · 分享",
      "BCrypt、认证过滤器与密码恢复邮件",
      "JSP/JSTL后台、图表与内容管理",
    ],
  ],
  [
    "解决方案架构师 · 全栈与安全开发者",
    "为红庞坊军事指挥部调研、设计、部署并验收两套数字化解决方案：基于角色的局域网任务管理系统，以及保护Windows终端的USB Sentry。两项产品均以100%满意度正式验收。",
    [
      "任务全流程：派发、确认、完成报告与实时可视化",
      "通过磁盘轮询与WMI/WPD检测USB及移动设备",
      "采用SQLite和独立Windows JAR进行便携式局域网部署",
      "完成军事业务需求梳理、用户培训与两项产品正式验收",
    ],
  ],
  [
    "全栈产品开发者",
    "开发覆盖商品目录、SKU库存、客户结账、订单运营、报表以及COD/VNPAY支付的全栈电子商务系统。",
    [
      "Java 21 · Spring Boot 4.0.1 · SQL Server",
      "Vue 3.5 · Vite 7 · Axios · Chart.js",
      "JWT/Spring Security · 客户端与管理端流程",
      "SKU/options、库存、价格历史、COD与VNPAY",
    ],
  ],
  [
    "IT俱乐部主席 · 导师 · 创作者",
    "通过俱乐部领导、技术工作坊、实践项目和SQL Quiz等互动工具，将个人学习转化为社区能力。",
    ["组织IT俱乐部活动", "使用Vue 3开发SQL Quiz", "指导实践编程项目", "分享结构化学习路径"],
  ],
  [
    "团队负责人 · 解决方案架构师",
    "提出产品方向并领导五人团队，同时亲自完成约60%的工作，涵盖解决方案架构、核心工程以及持续演进的AI电商体验。",
    [
      "产品愿景、技术领导与端到端架构",
      "基于商品目录的Gemini顾问、流式响应与AI商业分析",
      "动态商城与管理CMS、实时支持及可配置体验",
      "交易安全结账、VNPAY、GHN自动化、退款与保修流程",
    ],
  ],
  [
    "讲师 · AI赋能教育者 · 开发者",
    "教授Robocon、编程和办公技术，同时为客户开发软件与网站；将生成式AI作为受控协作工具用于课程研究、教案设计、练习生成、分层教学和个性化反馈。",
    [
      "Robocon、编程与数字素养",
      "Microsoft Office与Google Workspace",
      "AI辅助课程设计和个性化",
      "自由职业软件与网站交付",
    ],
  ],
  [
    "生产 × 质量 × 软件 × AI",
    "长期目标是把生产现场知识、改善、质量数据、软件自动化与负责任的AI融合为提升运营并赋能人员的系统。",
    ["生产与质量流程数字化", "数据驱动改善与自动化", "运营/培训中的负责任AI", "以人为本的技术应用"],
  ],
  [
    "软件开发毕业生 · GPA 3.9/4.0",
    "完成从制造运营到软件工程的三年转型，将优异学业、领导力、真实产品交付与审慎的AI辅助学习融为一体。",
    [
      "GPA 3.9/4.0",
      "SP26 Golden Bee — 海防FPT Polytechnic第一名",
      "多个学期获评优秀学生",
      "IT俱乐部主席 · Gemini认证教育者",
    ],
  ],
];
const upgrades = {
  vi: [
    "Standard Work · QCC · Pareto · Q-Point · TPM · Kanban · Safety Dojo",
    "Java · Spring Boot · SQL · Kỹ nghệ phần mềm",
    "Lãnh đạo · Đàm phán · Vận hành sự kiện",
    "Java Web · Hibernate · WebSocket · Bảo mật ứng dụng",
    "Khảo sát khách hàng · Kiến trúc giải pháp · Triển khai LAN · Bảo mật đầu cuối",
    "REST API · Spring Security · VNPAY · Cơ sở dữ liệu 3NF",
    "Lãnh đạo CLB IT · Mentoring · Vue 3",
    "Kiến trúc AI Commerce · Gemini · Toàn vẹn giao dịch · Analytics",
    "Giáo dục ứng dụng AI · Robocon · Phát triển freelance",
    "Smart Factory · Tự động hóa · Dữ liệu · AI có trách nhiệm",
    "Thành tích học thuật · Lãnh đạo · Học tập suốt đời",
  ],
  zh: [
    "标准作业 · QCC · 帕累托 · Q-Point · TPM · Kanban · Safety Dojo",
    "Java · Spring Boot · SQL · 软件工程",
    "领导力 · 谈判 · 活动运营",
    "Java Web · Hibernate · WebSocket · 应用安全",
    "客户调研 · 解决方案架构 · 局域网交付 · 终端安全",
    "REST API · Spring Security · VNPAY · 3NF数据库",
    "IT俱乐部领导力 · 指导 · Vue 3",
    "AI电商架构 · Gemini · 交易完整性 · 数据分析",
    "AI辅助教育 · Robocon · 自由职业交付",
    "智慧工厂 · 自动化 · 数据 · 负责任AI",
    "学术卓越 · 领导力 · 终身学习",
  ],
};
const localizationOrder = [
  "toyota",
  "fpt",
  "vhunter",
  "video",
  "solutions",
  "electronics",
  "workshop",
  "store",
  "teaching",
  "future",
  "graduation",
];
const localizedContent = {
  vi: Object.fromEntries(localizationOrder.map((id, index) => [id, vi[index]])),
  zh: Object.fromEntries(localizationOrder.map((id, index) => [id, zh[index]])),
} satisfies Record<Exclude<Language, "en">, Record<string, L>>;
const localizedUpgrades = {
  vi: Object.fromEntries(localizationOrder.map((id, index) => [id, upgrades.vi[index]])),
  zh: Object.fromEntries(localizationOrder.map((id, index) => [id, upgrades.zh[index]])),
} satisfies Record<Exclude<Language, "en">, Record<string, string>>;

const localizedTitles: Record<Exclude<Language, "en">, Record<string, string>> = {
  vi: {
    vhunter: "Kinh nghiệm thực tế · VHunter Event Company",
    video: "Dự án website Marcus Video",
    solutions: "Sản phẩm thực tế · Giải pháp vận hành & bảo mật",
    electronics: "Dự án website Marcus Electronics",
    store: "Đồ án tốt nghiệp · Marcus Store",
    graduation: "Tốt nghiệp FPT Polytechnic",
    teaching: "Giảng dạy Công nghệ & Phát triển phần mềm tự do",
    future: "Mục tiêu nghề nghiệp · Smart Factory",
  },
  zh: {
    vhunter: "实践经历 · VHunter活动公司",
    video: "Marcus Video网站项目",
    solutions: "军区指挥部 · 运营与安全产品",
    electronics: "Marcus Electronics电商网站项目",
    store: "毕业项目 · Marcus Store",
    graduation: "FPT Polytechnic毕业",
    teaching: "科技教育与自由软件开发",
    future: "职业目标 · 智慧工厂",
  },
};

export function getMilestones(language: Language) {
  if (language === "en") return milestones;
  return milestones.map((m) => {
    const content = localizedContent[language][m.id];
    return {
      ...m,
      title: localizedTitles[language][m.id] ?? m.title,
      role: content[0],
      summary: content[1],
      highlights: content[2],
      upgrade: localizedUpgrades[language][m.id],
    };
  });
}
