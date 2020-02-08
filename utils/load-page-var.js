var LoadPageVar = function LoadPageVar(sVar) {
    return decodeURI(
        window.location.search.replace(
            new RegExp(
                "^(?:.*[&\\?]" + encodeURI(sVar).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"
            ), "$1"
        )
    );
};