console.log(getSecondaryHost())

function  getSecondaryHost(): string {
    const  user = getConfig()
    return  "a";
}

function  getConfig(): Config {
    return  getServerConfig();
}

function  getServerConfig(): Config {
    const  site = getSiteConfig();
    return  buildConfig(site);
}

function  getSiteConfig(): Config {
    return { dummy: ""};
}

function  buildConfig(site: Config): Config {
    site.dummy = "@";
    return  site;
}

interface  Config {
    dummy: string;
}
