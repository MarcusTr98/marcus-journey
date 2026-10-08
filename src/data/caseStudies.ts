import type { Language } from "@/types";

export type ProcessStep = { title: string; detail: string };

export type CaseStudyContent = {
  title: string;
  summary: string;
  context: string;
  problem: string;
  baseline: string;
  rootCause: { tools: string[]; conclusion: string };
  solution: string;
  results: {
    id: string;
    label: string;
    before: string;
    after: string;
    changePercent: number;
  }[];
  sustain: string;
  myRole: string;
  tools: string[];
  beforeProcess: ProcessStep[];
  afterProcess: ProcessStep[];
  images: { src: string; alt: string }[];
};

export type CaseStudy = {
  slug: string;
  period: string;
  duration: string;
  locales: Record<Language, CaseStudyContent>;
};

// Figures and project details come from Marcus's supplied Train-to-Role brief.
export const caseStudies: CaseStudy[] = [
  {
    slug: "train-to-role",
    period: "2019–2020",
    duration: "2019–2020",
    locales: {
      vi: {
        title: "Train-to-Role: đào tạo theo đúng vị trí làm việc",
        summary:
          "Chuẩn hóa chương trình đào tạo công nhân mới theo vị trí thực tế để rút ngắn thời gian học và giúp nhân sự bắt nhịp tại chuyền nhanh hơn.",
        context:
          "Dự án cải tiến tại bộ phận Cutting, công đoạn kiểm tra sau máy cắt laser, trong giai đoạn làm việc tại Toyota. Thông tin nhận diện doanh nghiệp và mã hàng được lược bỏ.",
        problem:
          "Công nhân mới phải học nội dung của mọi vị trí trong bộ phận, dù sau đào tạo chỉ đảm nhiệm một vị trí. Chương trình dành 15 ngày trong phòng đào tạo và thêm 15 ngày học việc dưới chuyền; một số thao tác khó tại vị trí thực tế chưa được hướng dẫn đủ sâu.",
        baseline:
          "Thời gian đào tạo ban đầu là 15 ngày tại phòng đào tạo, tiếp theo là 15 ngày thực hành dưới chuyền. Nội dung và bài kiểm tra chưa được phân theo vị trí công việc.",
        rootCause: {
          tools: ["Pareto", "Fishbone", "5 Why"],
          conclusion:
            "Chương trình áp dụng chung cho mọi người, chưa định hướng theo vị trí. Vì vậy người học tiếp nhận nhiều nội dung không sử dụng, trong khi các thao tác khó của công việc thực tế chưa được đào tạo tập trung.",
        },
        solution:
          "Chuẩn hóa nội dung theo nhóm vị trí, tổ chức khu vực học theo định hướng công việc, đưa thao tác khó vào hướng dẫn chuẩn và bổ sung giai đoạn trải nghiệm thực tế dưới chuyền.",
        results: [
          {
            id: "classroom",
            label: "Đào tạo tại phòng",
            before: "15 ngày",
            after: "7 ngày",
            changePercent: 53,
          },
          {
            id: "line",
            label: "Bắt nhịp dưới chuyền",
            before: "15 ngày",
            after: "3 ngày",
            changePercent: 80,
          },
          {
            id: "independent",
            label: "Đến khi làm việc độc lập",
            before: "30 ngày",
            after: "10 ngày",
            changePercent: 67,
          },
        ],
        sustain:
          "Duy trì bằng tiêu chuẩn thao tác theo vị trí, bài kiểm tra định kỳ và đánh giá sau đào tạo; cập nhật nội dung khi có thay đổi tại công đoạn. Trưởng bộ phận phê duyệt và áp dụng.",
        myRole:
          "Đề xuất hướng cải tiến, thiết kế biểu mẫu, phân tích vấn đề bằng công cụ QC, thống kê kết quả, báo cáo và điều phối chu trình PDCA đến giai đoạn duy trì.",
        tools: [
          "PDCA",
          "Pareto",
          "Fishbone",
          "5 Why",
          "Chuẩn hóa thao tác",
          "Đào tạo tại hiện trường",
        ],
        beforeProcess: [
          { title: "Đào tạo chung", detail: "Học nội dung của toàn bộ vị trí trong 15 ngày." },
          {
            title: "Kiểm tra tổng hợp",
            detail: "Đánh giá dàn trải, chưa gắn chặt với vị trí được phân công.",
          },
          {
            title: "Học dưới chuyền",
            detail: "Thực hành thêm 15 ngày; thao tác khó có thể chưa được chuẩn bị trước.",
          },
          { title: "Làm việc độc lập", detail: "Sau tổng cộng 30 ngày đào tạo và học việc." },
        ],
        afterProcess: [
          { title: "Định hướng vị trí", detail: "Xác định nhóm công việc ngay từ đầu." },
          {
            title: "Đào tạo theo vị trí",
            detail: "Học thao tác chuẩn và thao tác khó trong 7 ngày.",
          },
          {
            title: "Đánh giá theo vị trí",
            detail: "Kiểm tra đúng yêu cầu công việc; bổ sung đào tạo khi cần.",
          },
          {
            title: "Trải nghiệm dưới chuyền",
            detail: "Thực hành có hướng dẫn trong 3 ngày trước khi làm độc lập.",
          },
          {
            title: "Duy trì và cập nhật",
            detail: "Đánh giá định kỳ và cải tiến nội dung theo PDCA.",
          },
        ],
        images: [],
      },
      en: {
        title: "Train-to-Role: training for the assigned job",
        summary:
          "Standardized new-operator training around the actual work assignment, shortening training time and helping people become productive on the line sooner.",
        context:
          "A continuous-improvement project for the Cutting department, at the inspection step after laser cutting, during Marcus's Toyota tenure. Company identifiers and part numbers are omitted.",
        problem:
          "New operators had to learn every position in the department even though each person would be assigned to one position. The program used 15 classroom days followed by 15 days of on-line training, while some difficult tasks at the actual station were not covered in enough depth.",
        baseline:
          "Initial training took 15 days in the training room plus 15 days of on-line practice. Training content and assessments were not organized by job assignment.",
        rootCause: {
          tools: ["Pareto", "Fishbone", "5 Whys"],
          conclusion:
            "The one-size-fits-all curriculum was not linked to the assigned position. Learners spent time on content they would not use, while difficult tasks at their actual station lacked focused preparation.",
        },
        solution:
          "Standardized learning content by job group, arranged training areas around job assignments, added difficult tasks to standard instruction and introduced guided practice on the production line.",
        results: [
          {
            id: "classroom",
            label: "Classroom training",
            before: "15 days",
            after: "7 days",
            changePercent: 53,
          },
          {
            id: "line",
            label: "On-line ramp-up",
            before: "15 days",
            after: "3 days",
            changePercent: 80,
          },
          {
            id: "independent",
            label: "Time to independent work",
            before: "30 days",
            after: "10 days",
            changePercent: 67,
          },
        ],
        sustain:
          "Sustained through job-specific work standards, periodic checks and post-training reviews, with content updated when the process changes. The department head approved and adopted the approach.",
        myRole:
          "Proposed the improvement, designed forms, analyzed issues with QC tools, tracked and reported the results, and coordinated the PDCA cycle through sustainment.",
        tools: ["PDCA", "Pareto", "Fishbone", "5 Whys", "Standardized work", "On-the-job training"],
        beforeProcess: [
          { title: "General training", detail: "Learn content for every position over 15 days." },
          {
            title: "Combined assessment",
            detail: "Test broad content with limited connection to the assigned job.",
          },
          {
            title: "On-line training",
            detail: "Practice for another 15 days; difficult tasks may be new to the learner.",
          },
          { title: "Independent work", detail: "Reached after 30 days of training and practice." },
        ],
        afterProcess: [
          {
            title: "Assign the job group",
            detail: "Identify the work area at the start of training.",
          },
          {
            title: "Train for the position",
            detail: "Cover standard and difficult tasks in 7 days.",
          },
          {
            title: "Assess job readiness",
            detail: "Check position-specific requirements and coach where needed.",
          },
          {
            title: "Practice on the line",
            detail: "Complete 3 days of guided experience before independent work.",
          },
          {
            title: "Sustain and update",
            detail: "Review performance periodically and improve training through PDCA.",
          },
        ],
        images: [],
      },
      zh: {
        title: "Train-to-Role：按实际岗位开展培训",
        summary: "围绕新员工的实际岗位标准化培训内容，缩短培训周期，并帮助员工更快适应生产线工作。",
        context:
          "Marcus在Toyota任职期间，于Cutting部门激光切割后检查工序开展的持续改善项目。已省略企业识别信息和零件编号。",
        problem:
          "新员工需要学习部门内所有岗位的内容，但培训后实际只负责一个岗位。原培训包括15天教室培训和15天生产线跟岗，部分岗位的困难操作未能得到充分讲解。",
        baseline:
          "初始培训为15天教室培训，随后进行15天生产线实践。课程内容和考核尚未按实际岗位划分。",
        rootCause: {
          tools: ["柏拉图", "鱼骨图", "5 Why"],
          conclusion:
            "统一课程没有与具体岗位对应，导致学员学习了实际工作中用不到的内容，而岗位困难操作缺少有针对性的准备。",
        },
        solution:
          "按岗位组标准化课程，依据岗位规划培训区域，将困难操作纳入标准培训，并增加生产线现场实践环节。",
        results: [
          { id: "classroom", label: "教室培训", before: "15天", after: "7天", changePercent: 53 },
          { id: "line", label: "生产线适应时间", before: "15天", after: "3天", changePercent: 80 },
          {
            id: "independent",
            label: "独立上岗总周期",
            before: "30天",
            after: "10天",
            changePercent: 67,
          },
        ],
        sustain:
          "通过岗位作业标准、定期测试和培训后评估维持改善效果，并在工序变化时更新内容。方案经部门负责人批准并实施。",
        myRole:
          "提出改善方向，设计表单，运用QC工具分析问题，统计并汇报结果，协调PDCA循环直至建立维持机制。",
        tools: ["PDCA", "柏拉图", "鱼骨图", "5 Why", "标准作业", "现场培训"],
        beforeProcess: [
          { title: "通用培训", detail: "用15天学习部门内所有岗位内容。" },
          { title: "综合考核", detail: "考核范围较广，与具体岗位关联有限。" },
          { title: "生产线跟岗", detail: "再实践15天，部分困难操作可能未提前学习。" },
          { title: "独立作业", detail: "完成共30天培训与跟岗后独立上岗。" },
        ],
        afterProcess: [
          { title: "确定岗位组", detail: "在培训开始时明确工作方向。" },
          { title: "岗位专项培训", detail: "在7天内学习标准及困难操作。" },
          { title: "岗位考核", detail: "按岗位要求评估，必要时补充培训。" },
          { title: "生产线实践", detail: "在独立上岗前进行3天有指导的实践。" },
          { title: "维持与更新", detail: "定期评估，并通过PDCA持续更新培训内容。" },
        ],
        images: [],
      },
    },
  },
];

export function getCaseStudy(slug: string, locale: Language) {
  const caseStudy = caseStudies.find((item) => item.slug === slug);
  return caseStudy ? { ...caseStudy, content: caseStudy.locales[locale] } : undefined;
}
