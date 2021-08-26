export const administrativeAptitude = [
    { "id": "administrative_aptitude", "isroot": true, "topic": "行测如何拿高分" },

    { "id": "background_comprehensive_knowledge", "parentid": "administrative_aptitude", "topic": "综合知识: 背景知识的掌握", "direction": "right" },
    { "id": "language_understanding_expression", "parentid": "administrative_aptitude", "topic": "正确审题: 语言理解与表达", "direction": "right" },
    { "id": "analysis_reasoning_calculation", "parentid": "administrative_aptitude", "topic": "正确的分析推理和运算", "direction": "right" },
    { "id": "proficiency_time_complete", "parentid": "administrative_aptitude", "topic": "熟练度: 是否有时间完成", "direction": "right" },

    { "id": "marxism", "parentid": "background_comprehensive_knowledge", "topic": "马克思主义", "direction": "right" },
    { "id": "contemporary_china_development", "parentid": "background_comprehensive_knowledge", "topic": "当代中国发展", "direction": "right" },
    { "id": "the_law", "parentid": "background_comprehensive_knowledge", "topic": "法律", "direction": "right" },
    { "id": "socialist_market_economy", "parentid": "background_comprehensive_knowledge", "topic": "社会主义市场经济", "direction": "right" },
    { "id": "administrative_knowledge", "parentid": "background_comprehensive_knowledge", "topic": "行政管理知识", "direction": "right" },
    { "id": "official_document_writing_knowledge", "parentid": "background_comprehensive_knowledge", "topic": "公文写作知识", "direction": "right" },
    { "id": "current_affairs_policies", "parentid": "background_comprehensive_knowledge", "topic": "时事与政策", "direction": "right" },

    { "id": "correct_vocabulary", "parentid": "language_understanding_expression", "topic": "正确的词汇", "direction": "right" },
    { "id": "administrative_aptitude_correct_expression", "parentid": "language_understanding_expression", "topic": "语句的表达", "direction": "right" },
    { "id": "reading_comprehension", "parentid": "language_understanding_expression", "topic": "阅读的理解", "direction": "right" },

    { "id": "quantitative_relationship", "parentid": "analysis_reasoning_calculation", "topic": "数量关系", "direction": "right" },
    { "id": "digital_reasoning", "parentid": "quantitative_relationship", "topic": "数字推理", "direction": "right" },
    { "id": "mathematical_operations", "parentid": "quantitative_relationship", "topic": "数学运算", "direction": "right" },

    { "id": "judgment_reasoning", "parentid": "analysis_reasoning_calculation", "topic": "判断推理", "direction": "right" },
    { "id": "event_sequencing", "parentid": "judgment_reasoning", "topic": "事件排序", "direction": "right" },
    { "id": "graphical_reasoning", "parentid": "judgment_reasoning", "topic": "图形推理", "direction": "right" },
    { "id": "fact_judgment", "parentid": "judgment_reasoning", "topic": "事实判断", "direction": "right" },

    { "id": "administrative_aptitude_data_analysis", "parentid": "analysis_reasoning_calculation", "topic": "资料分析", "direction": "right" },
    { "id": "statistics_table", "parentid": "administrative_aptitude_data_analysis", "topic": "统计表", "direction": "right" },
    { "id": "statistical_graph", "parentid": "administrative_aptitude_data_analysis", "topic": "统计图", "direction": "right" },
    { "id": "statistical_text", "parentid": "administrative_aptitude_data_analysis", "topic": "统计文字", "direction": "right" },

    { "id": "problem_solving_skills", "parentid": "proficiency_time_complete", "topic": "做题技巧", "direction": "right" },
    { "id": "administrative_aptitude_summary_experience", "parentid": "proficiency_time_complete", "topic": "经验总结", "direction": "right" },
]

const mind = {
    meta: { name: "jsMind", author: "hizzgdev@163.com", version: "0.4.6" },
    format: "node_array",
    data: administrativeAptitude
}

export default mind;
