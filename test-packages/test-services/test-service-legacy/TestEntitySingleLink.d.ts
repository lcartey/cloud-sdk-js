import { TestEntitySingleLinkRequestBuilder } from './TestEntitySingleLinkRequestBuilder';
import {
  AllFields,
  BooleanField,
  CustomField,
  Entity,
  EntityBuilderType,
  Link,
  NumberField,
  OneToOneLink,
  Selectable,
  StringField
} from '@sap-cloud-sdk/core';
/**
 * This class represents the entity "A_TestEntitySingleLink" of service "API_TEST_SRV".
 */
export declare class TestEntitySingleLink
  extends Entity
  implements TestEntitySingleLinkType
{
  /**
   * Technical entity name for TestEntitySingleLink.
   */
  static _entityName: string;
  /**
   * @deprecated Since v1.0.1 Use [[_defaultServicePath]] instead.
   * Technical service name for TestEntitySingleLink.
   */
  static _serviceName: string;
  /**
   * Default url path for the according service.
   */
  static _defaultServicePath: string;
  /**
   * Key Property.
   * Maximum length: 10.
   */
  keyProperty: string;
  /**
   * String Property.
   * Maximum length: 10.
   * @nullable
   */
  stringProperty?: string;
  /**
   * Boolean Property.
   * @nullable
   */
  booleanProperty?: boolean;
  /**
   * Guid Property.
   * @nullable
   */
  guidProperty?: string;
  /**
   * Int 16 Property.
   * @nullable
   */
  int16Property?: number;
  /**
   * One-to-many navigation property to the [[TestEntityLvl2MultiLink]] entity.
   */
  toMultiLink: TestEntityLvl2MultiLink[];
  /**
   * One-to-one navigation property to the [[TestEntityLvl2SingleLink]] entity.
   */
  toSingleLink: TestEntityLvl2SingleLink;
  /**
   * Returns an entity builder to construct instances `TestEntitySingleLink`.
   * @returns A builder that constructs instances of entity type `TestEntitySingleLink`.
   */
  static builder(): EntityBuilderType<
    TestEntitySingleLink,
    TestEntitySingleLinkTypeForceMandatory
  >;
  /**
   * Returns a request builder to construct requests for operations on the `TestEntitySingleLink` entity type.
   * @returns A `TestEntitySingleLink` request builder.
   */
  static requestBuilder(): TestEntitySingleLinkRequestBuilder;
  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `TestEntitySingleLink`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `TestEntitySingleLink`.
   */
  static customField(fieldName: string): CustomField<TestEntitySingleLink>;
  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  toJSON(): {
    [key: string]: any;
  };
}
import {
  TestEntityLvl2MultiLink,
  TestEntityLvl2MultiLinkType
} from './TestEntityLvl2MultiLink';
import {
  TestEntityLvl2SingleLink,
  TestEntityLvl2SingleLinkType
} from './TestEntityLvl2SingleLink';
export interface TestEntitySingleLinkType {
  keyProperty: string;
  stringProperty?: string;
  booleanProperty?: boolean;
  guidProperty?: string;
  int16Property?: number;
  toMultiLink: TestEntityLvl2MultiLinkType[];
  toSingleLink: TestEntityLvl2SingleLinkType;
}
export interface TestEntitySingleLinkTypeForceMandatory {
  keyProperty: string;
  stringProperty: string;
  booleanProperty: boolean;
  guidProperty: string;
  int16Property: number;
  toMultiLink: TestEntityLvl2MultiLinkType[];
  toSingleLink: TestEntityLvl2SingleLinkType;
}
export declare namespace TestEntitySingleLink {
  /**
   * Static representation of the [[keyProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  const KEY_PROPERTY: StringField<TestEntitySingleLink>;
  /**
   * Static representation of the [[stringProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  const STRING_PROPERTY: StringField<TestEntitySingleLink>;
  /**
   * Static representation of the [[booleanProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  const BOOLEAN_PROPERTY: BooleanField<TestEntitySingleLink>;
  /**
   * Static representation of the [[guidProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  const GUID_PROPERTY: StringField<TestEntitySingleLink>;
  /**
   * Static representation of the [[int16Property]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  const INT_16_PROPERTY: NumberField<TestEntitySingleLink>;
  /**
   * Static representation of the one-to-many navigation property [[toMultiLink]] for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  const TO_MULTI_LINK: Link<TestEntitySingleLink, TestEntityLvl2MultiLink>;
  /**
   * Static representation of the one-to-one navigation property [[toSingleLink]] for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  const TO_SINGLE_LINK: OneToOneLink<
    TestEntitySingleLink,
    TestEntityLvl2SingleLink
  >;
  /**
   * All fields of the TestEntitySingleLink entity.
   */
  const _allFields: Array<
    | StringField<TestEntitySingleLink>
    | BooleanField<TestEntitySingleLink>
    | NumberField<TestEntitySingleLink>
    | Link<TestEntitySingleLink, TestEntityLvl2MultiLink>
    | OneToOneLink<TestEntitySingleLink, TestEntityLvl2SingleLink>
  >;
  /**
   * All fields selector.
   */
  const ALL_FIELDS: AllFields<TestEntitySingleLink>;
  /**
   * All key fields of the TestEntitySingleLink entity.
   */
  const _keyFields: Array<Selectable<TestEntitySingleLink>>;
  /**
   * Mapping of all key field names to the respective static field property TestEntitySingleLink.
   */
  const _keys: {
    [keys: string]: Selectable<TestEntitySingleLink>;
  };
}
//# sourceMappingURL=TestEntitySingleLink.d.ts.map
