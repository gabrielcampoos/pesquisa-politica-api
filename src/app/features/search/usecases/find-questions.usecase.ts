// import { Result, ResultDTO } from "../../../shared/utils";
// import { SearchRepository } from "../repository";

// export class FindQuestionsUsecase {
//   async execute(district: string, idSearch?: string): Promise<ResultDTO> {
//     const searchRepository = new SearchRepository();

//     const searchByDistrict = await searchRepository.searchListByDistrict(
//       district
//     );

//     if (searchByDistrict) {
//       const compareIdSearch = await searchRepository.compareIdSearch(idSearch);

//       if (!compareIdSearch) return Result.error(400, "Id não encontrado.");

//       const compareId = await searchRepository.compareId(idSearch);

//       if (!compareId) return Result.error(400, "Id não encontrado.");

//       if (compareIdSearch && compareId && searchByDistrict) {
//         const newSearch = [
//           {
//             district: searchByDistrict,
//             search: compareId,
//             questions: compareIdSearch,
//           },
//         ];

//         return Result.success(200, "opa", newSearch);
//       }
//     }

//     return Result.error(400, "moio");
//   }
// }
