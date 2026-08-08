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
    "Quản lý Sản xuất & Chất lượng",
    "Gần bảy năm trực tiếp tại hiện trường đã tạo nền tảng kỷ luật về sản xuất, chất lượng, phát triển con người và cải tiến liên tục trong môi trường doanh nghiệp Nhật Bản.",
    [
      "Rút ngắn 35% thời gian onboarding",
      "Giảm khoảng 30% lãng phí vận hành",
      "Duy trì lỗi nghiêm trọng dưới 1%",
      "Giảm 50% sự cố thiết bị",
    ],
  ],
  [
    "Phát triển Phần mềm · GPA 3.9/4.0",
    "Ba năm chuyển mình từ vận hành nhà máy sang phát triển sản phẩm số—kết hợp học chính quy, dự án trường, R&D cá nhân, triển khai thực tế, hoạt động lãnh đạo và tự học liên tục.",
    [
      "Chuyển hướng từ sản xuất sang phát triển phần mềm",
      "Xây nền tảng có hệ thống với Java, cơ sở dữ liệu và công nghệ web",
      "Đưa tư duy Kaizen vào quy trình số và sản phẩm phần mềm",
      "Kết hợp học chính quy với dự án thực hành ngay từ năm đầu",
    ],
  ],
  [
    "Chuyên viên Tổ chức & Quản lý Sự kiện",
    "Mở rộng năng lực thương mại và lãnh đạo ngoài giảng đường qua việc thắng thầu, triển khai hội nghị và gala 2.000 khách từ đàm phán nhà cung cấp tới vận hành trực tiếp.",
    [
      "Ngân sách khoảng 800 triệu VNĐ",
      "98% khách tham dự hài lòng",
      "Giảm 20% chi phí tổ chức",
      "Điều phối đa bộ phận dưới áp lực cao",
    ],
  ],
  [
    "Lập trình viên Java Full-stack",
    "Xây dựng nền tảng video bằng Jakarta Servlet/JSP theo kiến trúc phân lớp DAO–service–controller, bao phủ khám phá nội dung, tương tác người dùng, quản trị và giao tiếp thời gian thực mà không dùng framework full-stack.",
    [
      "Java 21 · Servlet 6 · JPA 3.1 · Hibernate 6.4 · SQL Server",
      "WebSocket chat · yêu thích · lịch sử xem · chia sẻ",
      "BCrypt, bộ lọc xác thực và email khôi phục mật khẩu",
      "Dashboard JSP/JSTL, biểu đồ và quản trị nội dung",
    ],
  ],
  [
    "Thiết kế Giải pháp & Lập trình viên Full-stack",
    "Thiết kế quy trình LAN theo vai trò cho BCHQS phường Hồng Bàng, kết nối việc chỉ huy giao nhiệm vụ với chiến sĩ xác nhận, báo cáo hoàn thành và theo dõi trạng thái.",
    [
      "Java 21 · Spring Boot 4.0.2 · Thymeleaf · SQLite",
      "Giao việc, deadline, chỉnh sửa và hủy nhiệm vụ",
      "Luồng chiến sĩ xác nhận → báo cáo hoàn thành",
      "Cảnh báo AJAX polling · dữ liệu local · vận hành LAN",
    ],
  ],
  [
    "Lập trình viên Bảo mật Desktop",
    "Xây dựng công cụ bảo vệ Windows dạng portable, phát hiện ổ lưu trữ và thiết bị di động mới kết nối rồi thực thi phản ứng phòng vệ nhằm giảm nguy cơ thất thoát dữ liệu nội bộ.",
    [
      "Java 21 · Swing dashboard · shaded portable JAR",
      "Quét ổ đĩa 1,5 giây/lần · phát hiện di động WMI/WPD",
      "Cô lập outbound bằng netsh · shutdown sau 15 giây",
      "Quản trị viên có thể hủy shutdown và khôi phục mạng",
    ],
  ],
  [
    "Lập trình viên Sản phẩm Full-stack",
    "Phát triển hệ thống thương mại điện tử full-stack bao phủ catalog, tồn kho SKU, checkout khách hàng, vận hành đơn hàng, báo cáo và thanh toán COD/VNPAY.",
    [
      "Java 21 · Spring Boot 4.0.1 · SQL Server",
      "Vue 3.5 · Vite 7 · Axios · Chart.js",
      "JWT/Spring Security · luồng khách hàng và quản trị",
      "SKU/options, tồn kho, lịch sử giá, COD và VNPAY",
    ],
  ],
  [
    "Chủ nhiệm CLB IT · Mentor · Người xây dựng",
    "Biến kiến thức thành năng lực cộng đồng thông qua điều hành CLB, workshop kỹ thuật, dự án xưởng và các công cụ tương tác như SQL Quiz để thành viên cùng thực hành.",
    [
      "Điều phối hoạt động CLB IT",
      "Xây dựng SQL Quiz bằng Vue 3",
      "Hướng dẫn dự án lập trình thực tế",
      "Chia sẻ lộ trình học tập có cấu trúc",
    ],
  ],
  [
    "Trưởng nhóm · Kiến trúc sư Giải pháp",
    "Dẫn dắt codebase đồ án tốt nghiệp đang phát triển cho cửa hàng điện tử dạng module; định hình kiến trúc backend/frontend và điều phối các miền client, quản trị, commerce, khuyến mại và CMS.",
    [
      "Java 21 · Spring Boot 3.2.5 · SQL Server · 67 file Java",
      "Vue 3.5 · Vite 8 · Pinia 3 · 41 component/view Vue",
      "JWT với mô hình role/permission",
      "SKU, cart, wishlist, order, promotion, CMS và auditing",
    ],
  ],
  [
    "Giảng viên · Nhà giáo dục ứng dụng AI · Lập trình viên",
    "Giảng dạy Robocon, lập trình và công nghệ văn phòng song song với phát triển phần mềm/website cho khách hàng. AI tạo sinh được sử dụng như copilot có kiểm soát cho nghiên cứu bài giảng, thiết kế giáo án, sinh bài tập, phân hóa và phản hồi cá nhân hóa.",
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
    "生产与质量管理",
    "近七年的生产现场经验，奠定了在日资制造环境中对生产、质量、人才培养与持续改善的严谨基础。",
    ["入职培训提速35%", "运营浪费降低约30%", "重大缺陷率保持低于1%", "设备事故减少50%"],
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
    "解决方案设计师 · 全栈开发者",
    "为红庞坊军事指挥单位设计基于角色的局域网任务流程，连接指挥员派发、战士确认、完成报告与状态跟踪。",
    [
      "Java 21 · Spring Boot 4.0.2 · Thymeleaf · SQLite",
      "任务派发、截止时间、编辑与取消",
      "战士确认 → 完成报告状态流",
      "AJAX轮询提醒 · 本地数据库 · 局域网运行",
    ],
  ],
  [
    "桌面安全开发者",
    "构建便携式Windows防护工具，检测新接入的存储与移动设备，并自动执行防御响应以降低数据外泄风险。",
    [
      "Java 21 · Swing仪表盘 · 可携带shaded JAR",
      "每1.5秒扫描磁盘 · WMI/WPD移动设备检测",
      "netsh出站隔离 · 15秒后关机",
      "管理员可取消关机并恢复网络",
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
    "领导模块化电子商城毕业项目的持续开发，规划前后端架构并协调客户端、管理、交易、促销与CMS领域。",
    [
      "Java 21 · Spring Boot 3.2.5 · SQL Server · 67个Java文件",
      "Vue 3.5 · Vite 8 · Pinia 3 · 41个Vue组件/页面",
      "JWT与角色/权限领域模型",
      "SKU、购物车、收藏、订单、促销、CMS与审计",
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
    "Quản lý sản xuất · Chất lượng · Kaizen · 5S",
    "Java · Spring Boot · SQL · Kỹ nghệ phần mềm",
    "Lãnh đạo · Đàm phán · Vận hành sự kiện",
    "Java Web · Hibernate · WebSocket · Bảo mật ứng dụng",
    "Thiết kế giải pháp · AJAX · Triển khai LAN",
    "Giám sát Windows · Tự động hóa Firewall · Ứng phó sự cố",
    "REST API · Spring Security · VNPAY · Cơ sở dữ liệu 3NF",
    "Lãnh đạo CLB IT · Mentoring · Vue 3",
    "Lãnh đạo kỹ thuật · Git Workflow · Code Review",
    "Giáo dục ứng dụng AI · Robocon · Phát triển freelance",
    "Smart Factory · Tự động hóa · Dữ liệu · AI có trách nhiệm",
    "Thành tích học thuật · Lãnh đạo · Học tập suốt đời",
  ],
  zh: [
    "生产管理 · 质量 · 改善 · 5S",
    "Java · Spring Boot · SQL · 软件工程",
    "领导力 · 谈判 · 活动运营",
    "Java Web · Hibernate · WebSocket · 应用安全",
    "解决方案设计 · AJAX · 局域网部署",
    "Windows监控 · 防火墙自动化 · 事件响应",
    "REST API · Spring Security · VNPAY · 3NF数据库",
    "IT俱乐部领导力 · 指导 · Vue 3",
    "技术领导力 · Git工作流 · 代码审查",
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
  "task",
  "security",
  "electronics",
  "workshop",
  "store",
  "teaching",
  "future",
  "graduation",
];
export function getMilestones(language: Language) {
  if (language === "en") return milestones;
  const v = language === "vi" ? vi : zh;
  return milestones.map((m) => {
    const i = localizationOrder.indexOf(m.id);
    return {
      ...m,
      role: v[i][0],
      summary: v[i][1],
      highlights: v[i][2],
      upgrade: upgrades[language][i],
    };
  });
}
