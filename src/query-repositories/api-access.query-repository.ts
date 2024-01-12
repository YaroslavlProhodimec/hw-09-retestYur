import { ApiAccessModel } from '../models';

// Data access layer (query)
// 1. Взаимодействие с данными в базе.
// 2. Таким слоем может быть сторонняя апишка (напр., VideoAPI).
// 3. Описывает модели и данные в том формате, в котором они нужны презентационному слою.
// 4. Работа с постраничным выводом, сортировками.
// 5. Возможен маппинг данных.
// 6. Для query-взаимодействия с внешними апишками можно создать отдельный бизнес-сервис под эту апишку
// (напр., VideoQueryService), который работает с несколькими DAL-слоями,
// либо создать запрос в самом QueryRepository.
// 7. Дублирование логики в обычном репозитории и query-репозитории - это нормально.
// Они отвечают за разные операции.
export class ApiAccessQueryRepository {
  async getApiAccessesCount({
    ip,
    url,
    timeLimit,
  }: {
    ip: string;
    url: string;
    timeLimit: number;
  }): Promise<number> {
    return ApiAccessModel.countDocuments({
      ip,
      url,
      date: { $gte: new Date(Date.now() - timeLimit * 1000) },
    });
  }
}
