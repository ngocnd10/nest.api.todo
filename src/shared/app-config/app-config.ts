import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { get } from 'lodash';

export class AppConfig {
  name: string;
  version: string;

  public constructor(init: any) {
    Object.assign(this, init);
  }

  get(key: string): string {
    return get(this, key);
  }

  static load(path = 'config/config.yml'): AppConfig {
    if (process.env.NODE_ENVIRONMENT) {
      path = `config/config.${process.env.NODE_ENVIRONMENT}.yml`;
    }

    const config = yaml.load(readFileSync(path, 'utf8')) as Record<string, any>;
    const pkg = JSON.parse(readFileSync('./package.json', 'utf8')) as any;

    return new AppConfig({
      version: pkg.version,
      name: pkg.name,
      ...config,
    });
  }
}