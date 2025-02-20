import type { Schema, Struct } from '@strapi/strapi';

export interface ClientesDireccionDeEnvio extends Struct.ComponentSchema {
  collectionName: 'components_clientes_direccion_de_envios';
  info: {
    description: '';
    displayName: 'direccion_de_envio';
  };
  attributes: {
    address: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'address'>;
    job_title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'job_title'>;
    locker_number: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'locker_number'>;
    phone_number: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'phone_number'>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'clientes.direccion-de-envio': ClientesDireccionDeEnvio;
    }
  }
}
