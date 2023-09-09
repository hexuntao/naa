import { Injectable } from '@nestjs/common';

@Injectable()
export class ThirdService {
  useClass() {
    return '';
  }

  useFactory() {
    return '构造器提供者2';
  }
}
