import { SortOrder } from 'mongoose';
import { QueryDto } from 'src/shared/dtos/general.query.dto';

export function sortUtils(query: QueryDto): Record<string, SortOrder> {
  const sortBy = query.sortBy ?? 'createdAt';

  const sortOrder: SortOrder = query.sortOrder === 'asc' ? 1 : -1;

  return {
    [sortBy]: sortOrder,
  };
}
