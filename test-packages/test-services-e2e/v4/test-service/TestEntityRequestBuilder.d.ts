import {
  RequestBuilder,
  GetAllRequestBuilderV4,
  GetByKeyRequestBuilderV4,
  CreateRequestBuilderV4,
  UpdateRequestBuilderV4,
  DeleteRequestBuilderV4
} from '@sap-cloud-sdk/core';
import { TestEntity } from './TestEntity';
/**
 * Request builder class for operations supported on the [[TestEntity]] entity.
 */
export declare class TestEntityRequestBuilder extends RequestBuilder<TestEntity> {
  /**
   * Returns a request builder for retrieving one `TestEntity` entity based on its keys.
   * @param keyTestEntity Key property. See [[TestEntity.keyTestEntity]].
   * @returns A request builder for creating requests to retrieve one `TestEntity` entity based on its keys.
   */
  getByKey(keyTestEntity: number): GetByKeyRequestBuilderV4<TestEntity>;
  /**
   * Returns a request builder for querying all `TestEntity` entities.
   * @returns A request builder for creating requests to retrieve all `TestEntity` entities.
   */
  getAll(): GetAllRequestBuilderV4<TestEntity>;
  /**
   * Returns a request builder for creating a `TestEntity` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `TestEntity`.
   */
  create(entity: TestEntity): CreateRequestBuilderV4<TestEntity>;
  /**
   * Returns a request builder for updating an entity of type `TestEntity`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `TestEntity`.
   */
  update(entity: TestEntity): UpdateRequestBuilderV4<TestEntity>;
  /**
   * Returns a request builder for deleting an entity of type `TestEntity`.
   * @param keyTestEntity Key property. See [[TestEntity.keyTestEntity]].
   * @returns A request builder for creating requests that delete an entity of type `TestEntity`.
   */
  delete(keyTestEntity: number): DeleteRequestBuilderV4<TestEntity>;
  /**
   * Returns a request builder for deleting an entity of type `TestEntity`.
   * @param entity Pass the entity to be deleted.
   * @returns A request builder for creating requests that delete an entity of type `TestEntity` by taking the entity as a parameter.
   */
  delete(entity: TestEntity): DeleteRequestBuilderV4<TestEntity>;
}
//# sourceMappingURL=TestEntityRequestBuilder.d.ts.map
