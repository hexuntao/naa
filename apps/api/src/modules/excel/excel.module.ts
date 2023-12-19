import { DynamicModule, Global, Module, Provider } from '@nestjs/common';

import { EXCEL_OPTIONS } from './excel.constants';
import { ExcelOptions } from './excel.interface';
import { ExcelService } from './excel.service';

/**
 * Excel 模块
 * @description 提供 Excel 文件导入导出功能
 */
@Global()
@Module({})
export class ExcelModule {
  static forRoot(options?: ExcelOptions): DynamicModule {
    return this.register(options || {});
  }

  private static register(options: ExcelOptions): DynamicModule {
    const OptionsProvider: Provider = {
      provide: EXCEL_OPTIONS,
      useValue: options,
    };

    return {
      module: ExcelModule,
      providers: [OptionsProvider, ExcelService],
      exports: [ExcelService],
    };
  }
}
