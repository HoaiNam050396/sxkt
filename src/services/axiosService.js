import axios from 'axios';
import axiosRetry from 'axios-retry';
// import { prepareDataBeforeUpdate } from '../utils/common';
import { BASE_API_URL, AXIOS_RETRY_CODES } from '../configs/constant';

class _AxiosService {
  instance = null;

  isRefreshingToken = false;

  subscribers = [];

  constructor() {
    this.instance = axios.create({
      baseURL: BASE_API_URL,
      headers: this._getHeaders()
    });
    this.instance.interceptors.request.use(
      this._interceptBeforeRequest.bind(this),
      this._interceptRequestError.bind(this)
    );
    this.instance.interceptors.response.use(
      this._interceptResponseData.bind(this),
      this._interceptResponseError.bind(this)
    );

    axiosRetry(this.instance, {
      retries: 3,
      retryCondition: error => {
        if (typeof error.response === 'undefined') {
          // CORS error will not return anything
          return true;
        }

        return AXIOS_RETRY_CODES.includes(error.response.status);
      },
      retryDelay: () => 3000
    });
  }

  // eslint-disable-next-line class-methods-use-this
  _getHeaders() {
    return {
      'Content-Type': 'application/json'
    };
  }

  _subscribe = callbackFn => {
    this.subscribers.push(callbackFn);
  };

  _publish = cognitoToken => {
    this.subscribers.map(callbackFn => callbackFn(cognitoToken));
  };

  // eslint-disable-next-line class-methods-use-this
  _interceptRequestError(error) {
    // Do something with request error
    return Promise.reject(error);
  }

  // eslint-disable-next-line class-methods-use-this
  _interceptResponseData(response) {
    // Do something with response data
    return response;
  }

  // eslint-disable-next-line class-methods-use-this
  _interceptResponseError(error) {
    // Do something with response error
    return Promise.reject(error);
  }

  get(url = '/', params = {}, config = {}) {
    return this.instance.get(url, {
      params,
      ...config
    });
  }

  post(url = '/', data, config = {}) {
    return this.instance.post(url, data, config);
  }

  put(url = '/', data, config) {
    // Clean data before update
    // const cleanData = prepareDataBeforeUpdate(data, true);

    return this.instance.put(url, config);
  }

  patch(url = '/', data, config = {}) {
    return this.instance.patch(url, data, config);
  }

  delete(url = '/', params = {}, config = {}) {
    return this.instance.delete(
      url,
      {
        params
      },
      config
    );
  }
}

export const AxiosService = new _AxiosService();
