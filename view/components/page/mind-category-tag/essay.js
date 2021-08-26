export const essay = [
    { "id": "essay", "isroot": true, "topic": "申论如何拿高分" },

    { "id": "review_questions", "parentid": "essay", "topic": "审题", "direction": "right" },

    { "id": "question_type_and_format", "parentid": "review_questions", "topic": "掌握题型与格式", "direction": "right" },
    { "id": "reading_and_analysis_skills", "parentid": "review_questions", "topic": "提升阅读分析能力", "direction": "right" },

    { "id": "comprehensive_understanding_information", "parentid": "reading_and_analysis_skills", "topic": "全面、准确理解给定资料的含义", "direction": "right" },
    { "id": "accurately_organizational_intentions", "parentid": "reading_and_analysis_skills", "topic": "准确理解工作目标和组织意图", "direction": "right" },
    { "id": "analyze_problem_propose_effective_solutions", "parentid": "reading_and_analysis_skills", "topic": "准确分析问题，并提出有效的解决措施或办法", "direction": "right" },

    { "id": "expression", "parentid": "essay", "topic": "表达", "direction": "right" },
    { "id": "clearly_organized", "parentid": "expression", "topic": "条理清晰: 论点鲜明、突出，直奔主题", "direction": "right" },
    { "id": "points_up_standard", "parentid": "expression", "topic": "总论点分论点达到给分标准: 关键词突出", "direction": "right" },
    { "id": "clean_tidy", "parentid": "expression", "topic": "卷面干净整洁", "direction": "right" },

    { "id": "regular", "parentid": "clean_tidy", "topic": "规整: 宏观 微观", "direction": "right" },
    { "id": "clean_less_modification", "parentid": "clean_tidy", "topic": "净洁: 清晰,少修改", "direction": "right" },
]

const mind = {
    meta: { name: "jsMind", author: "hizzgdev@163.com", version: "0.4.6" },
    format: "node_array",
    data: essay
}

export default mind;
