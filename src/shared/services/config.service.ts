import * as dotenv from 'dotenv';
import * as Joi from 'joi';

export interface DBConfig {
  host: string;
  port: number;
  user: string;
  pass: string;
  name: string;
  log: boolean;
}

export class ConfigService {
  private readonly envConfig: dotenv.DotenvParseOutput;
  private readonly validationScheme = {
    PORT: Joi.number().default(3000),

    DB_TYPE: Joi.string().required(),
    DB_PORT: Joi.number().required().default(3000),
    DB_DATABASE: Joi.string().required(),
    DB_HOST: Joi.string().required(),
    DB_USER: Joi.string().required(),
    DB_PASS: Joi.string().required(),
    DB_SYNCHRONIZE: Joi.boolean().default(true),

    ACCESS_JWT_EXPIRES_IN: Joi.string().required(),
    ACCESS_JWT_SECRET: Joi.string().required(),
    REFRESH_JWT_EXPIRES_IN: Joi.string().required(),
    REFRESH_JWT_SECRET: Joi.string().required(),

    BCRYPT_SALT: Joi.number().required().default(10),
  };

  constructor() {
    const configs: dotenv.DotenvParseOutput[] = [];

    const defaultEnvConfigPath = '.env';
    const defaultEnvConfig = dotenv.config({ path: defaultEnvConfigPath });

    if (defaultEnvConfig.error) {
      console.log(`No config file at path: ${defaultEnvConfigPath}`);
    } else {
      configs.push(defaultEnvConfig.parsed);
      console.log(`Loaded config file at path: ${defaultEnvConfigPath}`);
    }

    configs.push(process.env as dotenv.DotenvParseOutput);
    // console.log('Process ENV: ', process.env);
    this.envConfig = this.validateInput(...configs);
  }

  get port(): number {
    return Number(this.envConfig.PORT);
  }

  private validateInput(
    ...envConfig: dotenv.DotenvParseOutput[]
  ): dotenv.DotenvParseOutput {
    const mergedConfig: dotenv.DotenvParseOutput = {};

    envConfig.forEach((config) => {
      Object.assign(mergedConfig, config);
    });

    const envVarsSchema: Joi.ObjectSchema = Joi.object(this.validationScheme);

    const result = envVarsSchema.validate(mergedConfig, { allowUnknown: true });
    if (result.error) {
      throw new Error(`Config validation error: ${result.error.message}`);
    }
    return result.value;
  }
}
