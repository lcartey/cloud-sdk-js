import { unixEOL, unique } from '@sap-cloud-sdk/util';
import {
  NamespaceDeclarationStructure,
  StructureKind,
  VariableDeclarationKind,
  VariableStatementStructure,
  OptionalKind,
  VariableDeclarationStructure
} from 'ts-morph';
import {
  linkClass,
  getGenericParameters,
  createPropertyFieldInitializer
} from '../generator-utils';
import { prependPrefix } from '../internal-prefix';
import {
  getStaticNavPropertyDescription,
  getStaticPropertyDescription,
  addLeadingNewline
} from '../typedoc';
import {
  VdmEntity,
  VdmNavigationProperty,
  VdmProperty,
  VdmServiceMetadata
} from '../vdm-types';

export function entityNamespace(
  entity: VdmEntity,
  service: VdmServiceMetadata
): NamespaceDeclarationStructure {
  return {
    kind: StructureKind.Namespace,
    name: entity.className,
    isExported: true,
    statements: [
      ...properties(entity),
      ...navigationProperties(entity, service),
      allFields(entity, service),
      allFieldSelector(entity),
      keyFields(entity),
      keys(entity)
    ]
  };
}

function properties(entity: VdmEntity): VariableStatementStructure[] {
  return entity.properties.map(prop => property(prop, entity));
}

function getFieldInitializer(
  prop: VdmProperty,
  entityClassName: string
): OptionalKind<VariableDeclarationStructure> {
  const genericParameters = getGenericParameters(entityClassName, prop);
  return {
    name: prop.staticPropertyName,
    type: `${prop.fieldType}<${genericParameters}>`,
    initializer: createPropertyFieldInitializer(prop, entityClassName)
  };
}

function property(
  prop: VdmProperty,
  entity: VdmEntity
): VariableStatementStructure {
  return {
    kind: StructureKind.VariableStatement,
    declarationKind: VariableDeclarationKind.Const,
    declarations: [getFieldInitializer(prop, entity.className)],
    docs: [getStaticPropertyDescription(prop)],
    isExported: true
  };
}

function navigationProperties(
  entity: VdmEntity,
  service: VdmServiceMetadata
): VariableStatementStructure[] {
  return entity.navigationProperties.map(navProp =>
    navigationProperty(navProp, entity, service)
  );
}

function navigationProperty(
  navProp: VdmNavigationProperty,
  entity: VdmEntity,
  service: VdmServiceMetadata
): VariableStatementStructure {
  const matchedEntity = service.entities.find(
    e => e.entitySetName === navProp.to
  );
  if (!matchedEntity) {
    throw Error(
      `Failed to find the entity from the service: ${JSON.stringify(
        service
      )} for nav property ${navProp}`
    );
  }

  const toEntity = matchedEntity.className;

  return {
    kind: StructureKind.VariableStatement,
    declarationKind: VariableDeclarationKind.Const,
    declarations: [
      {
        name: navProp.staticPropertyName,
        type: `${linkClass(navProp, service.oDataVersion)}<${
          entity.className
        },${toEntity}>`,
        initializer: `new ${linkClass(navProp, service.oDataVersion)}('${
          navProp.originalName
        }', ${entity.className}, ${toEntity})`
      }
    ],
    docs: [getStaticNavPropertyDescription(navProp)],
    isExported: true
  };
}

function allFields(
  entity: VdmEntity,
  service: VdmServiceMetadata
): VariableStatementStructure {
  const fieldTypes = unique([
    ...entity.properties.map(
      p => `${p.fieldType}<${getGenericParameters(entity.className, p)}>`
    ),
    ...entity.navigationProperties.map(
      p =>
        `${linkClass(p, service.oDataVersion)}<${entity.className},${
          p.toEntityClassName
        }>`
    )
  ]);
  return {
    kind: StructureKind.VariableStatement,
    declarationKind: VariableDeclarationKind.Const,
    declarations: [
      {
        name: prependPrefix('allFields'),
        type: `Array<${fieldTypes.join(' | ')}>`,
        initializer: `[
          ${entity.properties
            .map(prop => prop.staticPropertyName)
            .concat(
              entity.navigationProperties.map(
                navProp => navProp.staticPropertyName
              )
            )
            .map(name => `${entity.className}.${name}`)
            .join(`, ${unixEOL}`)}
          ]`
      }
    ],
    docs: [addLeadingNewline(`All fields of the ${entity.className} entity.`)],
    isExported: true
  };
}

function allFieldSelector(entity: VdmEntity): VariableStatementStructure {
  return {
    kind: StructureKind.VariableStatement,
    declarationKind: VariableDeclarationKind.Const,
    declarations: [
      {
        name: 'ALL_FIELDS',
        type: `AllFields<${entity.className}>`,
        initializer: `new AllFields('*', ${entity.className})`
      }
    ],
    docs: [addLeadingNewline('All fields selector.')],
    isExported: true
  };
}

function keyFields(entity: VdmEntity): VariableStatementStructure {
  return {
    kind: StructureKind.VariableStatement,
    declarationKind: VariableDeclarationKind.Const,
    declarations: [
      {
        name: prependPrefix('keyFields'),
        type: `Array<Field<${entity.className}>>`,
        initializer:
          '[' +
          entity.keys
            .map(key => `${entity.className}.${key.staticPropertyName}`)
            .join(', ') +
          ']'
      }
    ],
    docs: [
      addLeadingNewline(`All key fields of the ${entity.className} entity.`)
    ],
    isExported: true
  };
}

function keys(entity: VdmEntity): VariableStatementStructure {
  return {
    kind: StructureKind.VariableStatement,
    declarationKind: VariableDeclarationKind.Const,
    declarations: [
      {
        name: prependPrefix('keys'),
        type: `{[keys: string]: Field<${entity.className}>}`,
        initializer: `${entity.className}.${prependPrefix(
          'keyFields'
        )}.reduce((acc: {[keys: string]: Field<${
          entity.className
        }>}, field: Field<${entity.className}>) => {
          acc[field._fieldName] = field;
          return acc;
        }, {})`
      }
    ],
    docs: [
      addLeadingNewline(
        `Mapping of all key field names to the respective static field property ${entity.className}.`
      )
    ],
    isExported: true
  };
}
