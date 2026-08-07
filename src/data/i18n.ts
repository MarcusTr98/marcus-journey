import type { Language } from "@/types";
import { milestones } from "./milestones";

export const copy = {
  en: { tagline:"PRODUCTION • KAIZEN • TECHNOLOGY", subtitle:"From Production Floor\nto Digital Innovation.", start:"START THE JOURNEY", quick:"QUICK PROFILE", projects:"Projects", cv:"Download CV", sound:"Sound", quality:"Quality", journey:"Journey progress", auto:"Auto Journey", drive:"Drive Mode · Soon", scroll:"Scroll to drive", unlocked:"Upgrade unlocked", destination:"DESTINATION · SMART FACTORY", finalTitle:"Build systems that\nmove people forward.", promise:"I understand the factory floor. I improve the process.\nI build the system. I teach others to use it.", contact:"Contact me", github:"GitHub", close:"Close", profileTitle:"Production mind.\nDigital builder." },
  vi: { tagline:"SẢN XUẤT • KAIZEN • CÔNG NGHỆ", subtitle:"Từ nhà máy sản xuất\nđến đổi mới số.", start:"BẮT ĐẦU HÀNH TRÌNH", quick:"HỒ SƠ NHANH", projects:"Dự án", cv:"Tải CV", sound:"Âm thanh", quality:"Chất lượng", journey:"Tiến độ hành trình", auto:"Hành trình tự động", drive:"Tự lái · Sắp có", scroll:"Cuộn để lái xe", unlocked:"Nâng cấp đã mở", destination:"ĐÍCH ĐẾN · NHÀ MÁY THÔNG MINH", finalTitle:"Xây hệ thống\nđưa con người tiến lên.", promise:"Tôi hiểu nhà máy. Tôi cải tiến quy trình.\nTôi xây dựng hệ thống. Tôi hướng dẫn mọi người sử dụng.", contact:"Liên hệ", github:"GitHub", close:"Đóng", profileTitle:"Tư duy sản xuất.\nKiến tạo số." },
  zh: { tagline:"生产 • 改善 • 科技", subtitle:"从生产车间\n走向数字创新。", start:"开始旅程", quick:"快速履历", projects:"项目", cv:"下载简历", sound:"声音", quality:"画质", journey:"旅程进度", auto:"自动旅程", drive:"驾驶模式 · 即将推出", scroll:"滚动以驾驶", unlocked:"已解锁升级", destination:"终点 · 智慧工厂", finalTitle:"构建系统，\n推动人们前进。", promise:"我了解生产现场。我改善流程。\n我构建系统。我教会他人使用。", contact:"联系我", github:"GitHub", close:"关闭", profileTitle:"生产思维。\n数字创造者。" }
} as const;

const localized = {
  vi: [
    ["Quản lý Sản xuất & Chất lượng","Gần bảy năm tại nhà máy đã hình thành tư duy thực tiễn về chất lượng, con người và cải tiến liên tục.",["Rút ngắn 35% thời gian đào tạo hội nhập","Giảm khoảng 30% lãng phí vận hành","Duy trì lỗi nghiêm trọng dưới 1%","Giảm 50% sự cố thiết bị"]],
    ["Cải tiến Quy trình","Biến vấn đề vận hành thành hệ thống có thể lặp lại bằng tư duy nguyên nhân gốc, 5S và tiêu chuẩn hóa.",["Phân tích nguyên nhân gốc","Tiêu chuẩn hóa quy trình","Cải tiến dựa trên dữ liệu","Đào tạo nhân sự"]],
    ["Phát triển Phần mềm · GPA 3.9/4.0","Kết nối kinh nghiệm sản xuất với kỹ nghệ phần mềm, dữ liệu và AI.",["Golden Bee — Top 1","Sinh viên xuất sắc mọi học kỳ","Quán quân English QuizBee 2024","Gemini Certified Educator"]],
    ["Lập trình viên","Xây dựng phần mềm quản lý công việc và bảo mật máy tính cho môi trường vận hành thực tế.",["Quy trình công việc Spring Boot","Cảnh báo tiến độ thời gian thực","Phát hiện USB trái phép","Triển khai portable trong mạng LAN"]],
    ["Trưởng nhóm Kỹ thuật","Nền tảng thương mại điện tử thiết bị điện tử với quy trình đặt hàng và thanh toán VNPAY tự động.",["Java 21 · Spring Boot 3.2","JWT và phân quyền RBAC","VNPAY với giao dịch ACID","Vue.js · SQL Server · JUnit 5"]],
    ["Giảng viên · Lập trình viên","Giảng dạy công nghệ và xây dựng sản phẩm số hữu ích cho học viên, đội nhóm và khách hàng.",["Robocon và lập trình","Microsoft 365 và Google Workspace","AI tạo sinh trong giáo dục","Phần mềm và website cho khách hàng"]],
    ["Sản xuất × Phần mềm × AI","Tôi hiểu nhà máy. Tôi cải tiến quy trình. Tôi xây dựng hệ thống. Tôi hướng dẫn mọi người sử dụng.",["Sản xuất","Chất lượng & Kaizen","Phần mềm & Dữ liệu","AI & Đào tạo"]]
  ],
  zh: [
    ["生产与质量管理","近七年的工厂经验塑造了对质量、人员和持续改善的务实思维。",["入职培训时间缩短35%","运营浪费减少约30%","关键缺陷率保持在1%以下","设备事故减少50%"]],
    ["流程改善","通过根因分析、5S和标准化，把运营问题转化为可复制的系统。",["根因思维","流程标准化","数据驱动改善","员工培训"]],
    ["软件开发 · GPA 3.9/4.0","将制造业知识与软件工程、数据和人工智能相结合。",["Golden Bee — 校区第一名","每学期优秀学生","2024英语QuizBee冠军","Gemini认证教育者"]],
    ["开发工程师","为真实运营环境交付任务管理和电脑安全软件。",["Spring Boot任务流程","实时进度提醒","检测未授权USB","局域网便携部署"]],
    ["技术组长","打造具有自动下单和VNPAY支付流程的全栈电子商务平台。",["Java 21 · Spring Boot 3.2","JWT与精细RBAC","VNPAY与ACID事务","Vue.js · SQL Server · JUnit 5"]],
    ["讲师 · 开发者","教授技术，并为学生、团队和客户构建实用的数字产品。",["Robocon与编程","Microsoft 365与Google Workspace","生成式AI教育","客户软件与网站"]],
    ["生产 × 软件 × AI","我了解生产现场。我改善流程。我构建系统。我教会他人使用。",["生产","质量与改善","软件与数据","人工智能与培训"]]
  ]
} as const;

export function getMilestones(language:Language){if(language==="en")return milestones;return milestones.map((m,i)=>({...m,role:localized[language][i][0],summary:localized[language][i][1],highlights:[...localized[language][i][2]]}));}
