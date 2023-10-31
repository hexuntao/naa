import chalk from 'chalk';
import { isNil } from 'lodash';
import ora from 'ora';

import { Configure } from '@/modules/config/configure';
import { panic } from '@/modules/core/helpers';

import { runSeeder } from '../helpers';
import { DbOptions, SeederOptions } from '../types';

/**
 * 数据填充命令处理器
 * @param args
 * @param configure
 */
export const SeedHandler = async (configure: Configure, args: SeederOptions) => {
  const cname = args.connection ?? 'default';
  const { connections = [] }: DbOptions = await configure.get<DbOptions>('database');
  const dbConfig = connections.find(({ name }) => name === cname);
  if (isNil(dbConfig)) panic(`Database connection named ${cname} not exists!`);
  const runner = dbConfig.seedRunner;
  const spinner = ora('Start run seeder');
  try {
    spinner.start();
    await runSeeder(runner, args, spinner, configure, dbConfig);
    spinner.succeed(`\n 👍 ${chalk.greenBright.underline(`Finished Seeding`)}`);
  } catch (error) {
    panic({ spinner, message: `Run seeder failed`, error });
  }
};
