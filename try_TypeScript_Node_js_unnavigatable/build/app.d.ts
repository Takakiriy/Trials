declare function getSecondaryHost(): string;
declare function getConfig(): Config;
declare function getServerConfig(): Config;
declare function getSiteConfig(): Config;
declare function buildConfig(site: Config): Config;
interface Config {
    dummy: string;
}
