import { initializers } from '@dropins/tools/initializer.js';
import { initialize, setFetchGraphQlHeaders } from '@dropins/storefront-checkout/api.js';
import { initializeDropin } from './index.js';
import { fetchPlaceholders } from '../aem.js';
import { getHeaders } from '../configs.js';

await initializeDropin(async () => {
  setFetchGraphQlHeaders(await getHeaders('checkout'));

  const labels = await fetchPlaceholders();
  const langDefinitions = {
    default: {
      ...labels,
    },
  };

  return initializers.mountImmediately(initialize, {
    langDefinitions,
    models: {
      CartModel: {
        transformer: (data) => ({
          availablePaymentMethods: data?.available_payment_methods,
          selectedPaymentMethod: data?.selected_payment_method,
        }),
      },
    },
  });
})();
