import {environment} from '../../../../environments/environment';

export const NgxsConfiguration = { developmentMode: !environment.production };

export const NgxsLoggerPluginConfiguration = {
  disabled: environment.production,
  collapsed: false
};
