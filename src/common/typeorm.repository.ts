import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { BaseEntity } from 'typeorm';
import { PaginationConstants } from 'src/common/constants/config.constant';

export class TypeORMRepository<T> extends BaseEntity {
  async paginate({ page, limit }: IPaginationOptions, query: any) {
    const options = {
      page: page || PaginationConstants.DEFAULT_PAGE,
      limit: limit || PaginationConstants.DEFAULT_LIMIT_ITEM,
    };
    if (query) {
      return await paginate<T>(query, options);
    }
  }
}
