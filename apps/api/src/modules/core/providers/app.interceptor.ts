import { ClassSerializerInterceptor, PlainLiteralObject, StreamableFile } from '@nestjs/common';
import { ClassTransformOptions } from 'class-transformer';
import { isArray, isNil, isObject } from 'lodash';

export class AppIntercepter extends ClassSerializerInterceptor {
  serialize(
    response: PlainLiteralObject | Array<PlainLiteralObject>,
    options: ClassTransformOptions,
  ): PlainLiteralObject | PlainLiteralObject[] {
    if ((!isObject(response) && !isArray(response)) || response instanceof StreamableFile) {
      return { code: 200, data: response, message: 'success' };
    }

    // 如果是响应数据是数组,则遍历对每一项进行序列化
    if (isArray(response)) {
      return {
        code: 200,
        data: (response as PlainLiteralObject[]).map((item) =>
          !isObject(item) ? item : this.transformToPlain(item, options),
        ),
        message: 'success',
      };
    }
    // 如果是分页数据,则对items中的每一项进行序列化
    if ('meta' in response && 'items' in response) {
      const items = !isNil(response.items) && isArray(response.items) ? response.items : [];
      return {
        code: 200,
        data: {
          ...response,
          items: (items as PlainLiteralObject[]).map((item) => {
            return !isObject(item) ? item : this.transformToPlain(item, options);
          }),
        },
        message: 'success',
      };
    }
    // 如果响应是个对象则直接序列化
    return {
      code: 200,
      data: this.transformToPlain(response, options),
      message: 'success',
    };
  }
}
