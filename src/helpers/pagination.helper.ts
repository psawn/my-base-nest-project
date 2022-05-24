import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { PaginationConstants } from 'src/common/constants/config.constant';

export const paginateData = async (
  { page, limit }: IPaginationOptions,
  query: any,
) => {
  const options = {
    page: page || PaginationConstants.DEFAULT_PAGE,
    limit: limit || PaginationConstants.DEFAULT_LIMIT_ITEM,
  };

  if (query) {
    return await paginate(query, options);
  }

  return null;
};
