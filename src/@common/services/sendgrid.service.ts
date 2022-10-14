import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as SendGrid from '@sendgrid/mail';

export const Templates = {
  UPDATE_PRODUCT: {
    id: 'd-9e600dfe89054ba28f532c234038e625',
    subject: { es: 'Producto actualizado', en: 'Update product' },
  },
};
@Injectable()
export class SengridCustom {
  constructor(private readonly configService: ConfigService) {
    SendGrid.setApiKey(this.configService.get<string>('SENDGRID_API_KEY'));
  }

  sendEmail(to: any, template: any, substitutions: any) {
    console.log('Correo enviado a: ', to);
    return new Promise((resolve, reject) => {
      const msg = {
        to,
        from: 'Zébrans<edesalla17@gmail.com>',
        templateId: template.id,
        dynamic_template_data: {
          ...substitutions,
          language: { [substitutions.lng]: true },
          subject: template.subject[substitutions.lng],
        },
      };

      SendGrid.send(msg)
        .then(async (data) => {
          if (data[0] && data[0].statusCode)
            resolve({ success: 'OK', ...data });
          else resolve({ success: 'ERROR', ...data });
        })
        .catch((err) => {
          console.log('err==>', err.response.body);
          resolve({ error: 'ERROR', ...err });
        });
    });
  }
}
