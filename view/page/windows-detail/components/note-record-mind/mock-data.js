const data = [
    { "id": "root", "isroot": true, "topic": "jsMind" },

    { "id": "easy", "parentid": "root", "topic": "Easy", "direction": "left" },
    { "id": "easy1", "parentid": "easy", "topic": "Easy to show" },
    { "id": "easy2", "parentid": "easy", "topic": "Easy to edit" },
    { "id": "easy3", "parentid": "easy", "topic": "Easy to store" },
    { "id": "easy4", "parentid": "easy", "topic": "Easy to embed" },
    // { "id": "easy5", "parentid": "easy", "topic": "Easy to embed" },
    // { "id": "easy6", "parentid": "easy", "topic": "Easy to embed" },
    // { "id": "easy7", "parentid": "easy", "topic": "Easy to embed" },
    // { "id": "easy8", "parentid": "easy", "topic": "Easy to embed" },
    // { "id": "easy9", "parentid": "easy", "topic": "Easy to embed" },
    // { "id": "easy00", "parentid": "easy", "topic": "Easy to embed" },
    // { "id": "eas11", "parentid": "easy", "topic": "Easy to embed" },
    // { "id": "easy12", "parentid": "easy", "topic": "Easy to embed" },
    // { "id": "easy13", "parentid": "easy", "topic": "Easy to embed" },
    // { "id": "easy14", "parentid": "easy", "topic": "Easy to embed" },
    // { "id": "easy15", "parentid": "easy", "topic": "Easy to embed" },
    // { "id": "easy16", "parentid": "easy", "topic": "Easy to embed" },
    // { "id": "easy17", "parentid": "easy", "topic": "Easy to embed" },
    // { "id": "easy18", "parentid": "easy", "topic": "Easy to embed" },
    // { "id": "easy110", "parentid": "easy", "topic": "Easy to embed" },
    // { "id": "easy20", "parentid": "easy", "topic": "Easy to embed" },
    // { "id": "easy21", "parentid": "easy", "topic": "Easy to embed" },
    // { "id": "easy22", "parentid": "easy", "topic": "Easy to embed" },

    { "id": "open", "parentid": "root", "topic": "Open Source", "expanded": false, "direction": "right" },
    { "id": "open1", "parentid": "open", "topic": "on GitHub" },
    { "id": "open2", "parentid": "open", "topic": "BSD License" },

    { "id": "powerful", "parentid": "root", "topic": "Powerful", "direction": "right" },
    { "id": "powerful1", "parentid": "powerful", "topic": "Base on Javascript" },
    { "id": "powerful2", "parentid": "powerful", "topic": "Base on HTML5" },
    { "id": "powerful3", "parentid": "powerful", "topic": "Depends on you" },
]

export default data;
