"use strict";
console.log(getSecondaryHost());
function getSecondaryHost() {
    const user = getConfig();
    return "a";
}
function getConfig() {
    return getServerConfig();
}
function getServerConfig() {
    const site = getSiteConfig();
    return buildConfig(site);
}
function getSiteConfig() {
    return { dummy: "" };
}
function buildConfig(site) {
    site.dummy = "@";
    return site;
}
//# sourceMappingURL=app.js.map